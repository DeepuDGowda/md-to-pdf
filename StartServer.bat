@echo off
REM StartServer.bat — creates/uses .venv, installs deps, runs run_server.py
REM Place this file in the project folder (same dir as run_server.py)

REM Move to script folder (handles spaces)
pushd "%~dp0"

REM Prefer `py` launcher if available; else use python
where py >nul 2>&1
if %ERRORLEVEL% == 0 (
  set PYEXEC=py
) else (
  set PYEXEC=python
)

REM Ensure Python is present
%PYEXEC% --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Python is not found on PATH. Install Python and check "Add to PATH".
  pause
  popd
  exit /b 1
)

REM Create venv if missing
if not exist ".venv\Scripts\activate.bat" (
  echo Creating virtual environment in .venv...
  %PYEXEC% -m venv .venv
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to create virtual environment.
    pause
    popd
    exit /b 1
  )
)

REM Activate venv (cmd-style)
call ".venv\Scripts\activate.bat"

REM Upgrade pip and install requirements quietly (only installs missing ones)
echo Installing / verifying Python dependencies...
python -m pip install --upgrade pip >nul 2>&1
python -m pip install -r requirements.txt

REM Run the server (run_server.py will open a browser)
echo Starting Document Composer...
python run_server.py

REM Keep console open so user can see errors or logs
echo.
echo Server exited. Press any key to close this window...
pause >nul

REM Return to original folder
popd
