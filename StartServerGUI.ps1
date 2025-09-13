# StartServerGUI.ps1
# Simple GUI to start/stop the Document Composer server silently.
# Save next to run_server.py and .venv.

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

$form = New-Object System.Windows.Forms.Form
$form.Text = "Document Composer - Control"
$form.ClientSize = [System.Drawing.Size]::new(420,180)
$form.StartPosition = "CenterScreen"
$form.TopMost = $false

$lbl = New-Object System.Windows.Forms.Label
$lbl.Text = "Status: Stopped"
$lbl.AutoSize = $true
$lbl.Location = [System.Drawing.Point]::new(12,12)
$form.Controls.Add($lbl)

$btnStart = New-Object System.Windows.Forms.Button
$btnStart.Text = "Start"
$btnStart.Size = [System.Drawing.Size]::new(100,36)
$btnStart.Location = [System.Drawing.Point]::new(12,48)
$form.Controls.Add($btnStart)

$btnStop = New-Object System.Windows.Forms.Button
$btnStop.Text = "Stop"
$btnStop.Size = [System.Drawing.Size]::new(100,36)
$btnStop.Location = [System.Drawing.Point]::new(124,48)
$btnStop.Enabled = $false
$form.Controls.Add($btnStop)

$btnLogs = New-Object System.Windows.Forms.Button
$btnLogs.Text = "Open logs"
$btnLogs.Size = [System.Drawing.Size]::new(100,36)
$btnLogs.Location = [System.Drawing.Point]::new(236,48)
$form.Controls.Add($btnLogs)

$btnExit = New-Object System.Windows.Forms.Button
$btnExit.Text = "Exit"
$btnExit.Size = [System.Drawing.Size]::new(100,36)
$btnExit.Location = [System.Drawing.Point]::new(348,48)
$form.Controls.Add($btnExit)

$lblNote = New-Object System.Windows.Forms.Label
$lblNote.Text = "Logs: server.log (in project folder)."
$lblNote.AutoSize = $true
$lblNote.Location = [System.Drawing.Point]::new(12,100)
$form.Controls.Add($lblNote)

# helper to check for python on PATH or py launcher
function Get-PythonLauncher {
    $py = (Get-Command py -ErrorAction SilentlyContinue)
    if ($py) { return "py" }
    $py2 = (Get-Command python -ErrorAction SilentlyContinue)
    if ($py2) { return "python" }
    return $null
}

function Ensure-Venv {
    param($PythonExe)
    if (-not (Test-Path ".\.venv\Scripts\pythonw.exe")) {
        Write-Host "Creating virtualenv..."
        & $PythonExe -m venv .venv
        Start-Sleep -Seconds 1
    }
    # install requirements (quiet)
    & ".\.venv\Scripts\python.exe" -m pip install --upgrade pip | Out-Null
    & ".\.venv\Scripts\python.exe" -m pip install -r requirements.txt | Out-Null
}

function Start-Server {
    $pyExe = Get-PythonLauncher
    if (-not $pyExe) {
        [System.Windows.Forms.MessageBox]::Show("Python not found on PATH. Install Python or use the StartServer.bat", "Python missing", "OK", "Error") | Out-Null
        return
    }

    Try {
        Ensure-Venv -PythonExe $pyExe
    } Catch {
        [System.Windows.Forms.MessageBox]::Show("Failed to prepare environment: `n$($_.Exception.Message)", "Error") | Out-Null
        return
    }

    # rotate logs
    if (Test-Path server.log) {
        if (Test-Path server.log.1) {
            if (Test-Path server.log.2) { Remove-Item server.log.2 -ErrorAction SilentlyContinue }
            Rename-Item server.log.1 server.log.2 -ErrorAction SilentlyContinue
        }
        Rename-Item server.log server.log.1 -ErrorAction SilentlyContinue
    }

    $pythonw = Join-Path -Path (Resolve-Path .\.venv\Scripts\pythonw.exe) -ChildPath ""
    if (-not (Test-Path $pythonw)) {
        [System.Windows.Forms.MessageBox]::Show("pythonw.exe not found in .venv\Scripts. Cannot run silently.", "Error") | Out-Null
        return
    }

    # Start pythonw detached and redirect output to server.log
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = "$pythonw"
    $startInfo.Arguments = "`"$scriptDir\run_server.py`""
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.CreateNoWindow = $true

    # create log handle
    $logPath = Join-Path $scriptDir "server.log"
    $fs = [System.IO.File]::Open($logPath, [System.IO.FileMode]::OpenOrCreate, [System.IO.FileAccess]::Write, [System.IO.FileShare]::ReadWrite)
    $sw = New-Object System.IO.StreamWriter($fs)
    $sw.AutoFlush = $true

    $proc = New-Object System.Diagnostics.Process
    $proc.StartInfo = $startInfo
    $proc.Start() | Out-Null

    # asynchronously copy streams to log
    $stdOut = $proc.StandardOutput
    $stdErr = $proc.StandardError
    Start-Job -ScriptBlock {
        param($outStream, $writer)
        while (-not $outStream.EndOfStream) {
            $line = $outStream.ReadLine()
            $writer.WriteLine($line)
        }
    } -ArgumentList $stdOut, $sw | Out-Null
    Start-Job -ScriptBlock {
        param($errStream, $writer)
        while (-not $errStream.EndOfStream) {
            $line = $errStream.ReadLine()
            $writer.WriteLine($line)
        }
    } -ArgumentList $stdErr, $sw | Out-Null

    # store process object globally for Stop
    Set-Variable -Scope Global -Name DC_ServerProcess -Value $proc

    $lbl.Text = "Status: Running (PID $($proc.Id))"
    $btnStart.Enabled = $false
    $btnStop.Enabled = $true

    # try to open browser: read the log briefly to find detected URL
    Start-Sleep -Milliseconds 900
    $url = $null
    for ($i=0; $i -lt 20; $i++) {
        if (Test-Path $logPath) {
            $content = Get-Content $logPath -Raw -ErrorAction SilentlyContinue
            if ($content -match "http://127\.0\.0\.1:\d{2,5}/") {
                $matches = [regex]::Matches($content, "http://127\.0\.0\.1:\d{2,5}/")
                if ($matches.Count -gt 0) { $url = $matches[0].Value; break }
            }
        }
        Start-Sleep -Milliseconds 300
    }
    if (-not $url) { $url = "http://127.0.0.1:5001/" }
    Start-Process $url
}

function Stop-Server {
    $proc = Get-Variable -Name DC_ServerProcess -ErrorAction SilentlyContinue
    if ($proc -and $proc.Value -and -not $proc.Value.HasExited) {
        try {
            $proc.Value.Kill()
            $proc.Value.WaitForExit(3000)
            $lbl.Text = "Status: Stopped"
            $btnStart.Enabled = $true
            $btnStop.Enabled = $false
            [System.Windows.Forms.MessageBox]::Show("Server stopped.", "Stopped") | Out-Null
        } catch {
            [System.Windows.Forms.MessageBox]::Show("Failed to stop process: $($_.Exception.Message)", "Error") | Out-Null
        }
    } else {
        # try to find by command-line containing run_server.py (safe)
        $found = Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -match 'run_server.py' }
        if ($found) {
            foreach ($p in $found) {
                try { Stop-Process -Id $p.ProcessId -Force } catch {}
            }
            $lbl.Text = "Status: Stopped"
            $btnStart.Enabled = $true
            $btnStop.Enabled = $false
            [System.Windows.Forms.MessageBox]::Show("Server processes killed.", "Stopped") | Out-Null
        } else {
            $lbl.Text = "Status: Stopped"
            $btnStart.Enabled = $true
            $btnStop.Enabled = $false
            [System.Windows.Forms.MessageBox]::Show("No server process found.", "Info") | Out-Null
        }
    }
}

# Hook up events
$btnStart.Add_Click({ Start-Server })
$btnStop.Add_Click({ Stop-Server })
$btnLogs.Add_Click({
    $log = Join-Path $scriptDir "server.log"
    if (Test-Path $log) { Start-Process notepad.exe $log } else { [System.Windows.Forms.MessageBox]::Show("No server.log found yet.", "Logs") | Out-Null }
})
$btnExit.Add_Click({ 
    try { Stop-Server } catch {}
    $form.Close()
})

# Show
$form.Add_Shown({ $form.Activate() })
[void] $form.ShowDialog()
