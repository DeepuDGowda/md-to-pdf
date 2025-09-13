# Product Documention: Home Loan Application

## Home Loan overview

This document outlines the **feature requirements** for the initial data collection stages of a **digital Home Loan application process**. The goal is to capture essential user information in a clear, secure, and user-friendly manner.

## Basic Details

This is the first step in the application process, designed to **capture the user's primary identification** and **contact information** through a series of mandatory fields.

### Mobile Number

The initial field captures the user's Mobile Number. This is a mandatory text field requiring a **10-digit** numeric input, which will serve as the primary point of contact and be used for critical communications, including **OTP-based verification**.

The system must validate that the entry is exactly 10 digits, contains no letters or special characters, and an **OTP will be send to the user entered phone number**, which they must enter to proceed with the application.

If the input fails validation, a clear error message, such as **Please enter a valid 10-digit mobile number**, should be displayed to guide the user.

- **Field Name**: Mobile Number

- **Description**: The user's primary 10-digit mobile phone number. This will be used for communication and OTP-based verification

- **Data Type**: Numeric (10 digits)

- **Input Control**: Text Field

**Validations**:

- Must be a 10-digit number.

- Should not contain any letters or special characters.

- Should start with a digit from 6 to 9.

- Field is mandatory.

**User Experience**:

- An **OTP** (One-Time Password) will be sent to entered number for verification. The user must enter the OTP to proceed.

- Display a clear error message like **Please enter a valid 10-digit mobile number** if the validation fails.

### PAN Number

The applicant must provide their **PAN Number**, their unique 10-character alphanumeric identifier issued by the Income Tax Department.

This mandatory text field must be validated to ensure it is exactly 10 characters and adheres to the standard format of five letters, followed by four numbers, and ending with a final letter (e.g., **ABCDE1234F**).

To enhance the user experience and prevent common errors, all input should be automatically converted to **uppercase**. A help icon or tooltip explaining the correct format should be available.

If the entry is invalid, an error message like **Please enter a valid 10-character PAN number** will be shown.

- **Field Name**: PAN Number
- **Description**: The user's Permanent Account Number (PAN) as issued by the Income Tax Department of India.
- **Data Type**: Alphanumeric (10 characters)
- **Input Control**: Text Field

**Validations**:

- Must be exactly 10 characters long.
- Must follow the format: **ABCDE1234F(first five are letters, next four are numbers, last is a letter)** .
- Field is mandatory.

User Experience:

- Input should be automatically converted to **uppercase** to avoid errors.
- Provide a small help icon or tooltip explaining the format of a PAN card.
- Display an error message like **Please enter a valid 10-character PAN number** for invalid entries.

### Aadhaar Number

The user will be prompted to enter their **Aadhaar Number**. This is a mandatory **12-digit numeric field** for the user's unique identification number from UIDAI. The system will validate that the input is precisely 12 digits and contains no non-numeric characters.

To improve readability and data entry accuracy, the input field should automatically format the number into groups of four (e.g., **XXXX XXXX XXXX**).

This information is crucial as it may be used for e-KYC verification later in the process. An error message, **Please enter a valid 12-digit Aadhaar number**, should be displayed for any incorrect entries.

- **Field Name**: Aadhaar Number
- **Description**: The user's 12-digit unique identification number issued by the UIDAI.
- **Data Type**: Numeric (12 digits)
- **Input Control**: Text Field

**Validations**:

- Must be a 12-digit number.
- Should not contain any letters or special characters.
- Field is mandatory.
- User Experience:
- The input field can be formatted to accept numbers in groups (e.g., **XXXX XXXX XXXX**) to improve readability.
- This may be used for e-KYC verification at a later stage.
- Display an error message like **Please enter a valid 12-digit Aadhaar number** for incorrect entries.

## Applicant Details

After basic verification, the user will proceed to fill in their **personal details**.

### Date of Birth (DOB)

The system will capture the applicant's **Date of Birth** to verify their age and identity. This is a mandatory field that should use a calendar-style date picker to ensure the data is entered in a consistent format (**DD/MM/YYYY**) and to prevent formatting errors.

A key validation is to automatically calculate the applicant's age from the entered date to ensure they meet the minimum age requirement for the loan, which could be 18 or 21 years old.

- **Field Name**: Date of Birth
- **Description**: The applicant's date of birth as it appears on their official documents.
- **Data Type**: Date (DD/MM/YYYY)
- **Input Control**: Date Picker
- Validations:
- Field is mandatory.
- User Experience:
- Using a calendar-style date picker is recommended to prevent formatting errors.
- Clearly label the format as DD/MM/YYYY if manual input is allowed.

### Email Address

The applicant's primary **Email Address** will be collected for all digital correspondence, including sending verification links, documents, and application status updates.

This is a mandatory text field that must be validated to ensure it follows a standard email format (e.g., **name@example.com**). An error message like Please enter a valid email address should be displayed for any invalid formats to guide the user.

- **Field Name**: Email Address
- **Description**: The applicant's primary email address for communication.
- **Data Type**: Alphanumeric (String)
- **Input Control**: Text Field
- Validations:
- Must be in a valid email format (e.g., **name@example.com**).
- Field is mandatory.
- User Experience:
- A verification link or code may be sent to this email address.
- Display an error message like Please enter a valid email address for invalid formats.

### Education Details

To understand the applicant's background, their **Highest Education Qualification** is required. This mandatory field should be a dropdown menu to ensure standardized data entry.

The options will include standard qualifications like Post Graduate, Graduate, and so on. If the user selects Other, a new text field must dynamically appear, allowing them to specify their qualification manually.

- **Field Name**: Highest Education Qualification
- **Description**: The applicant's highest level of education completed.
- **Data Type**: String
- **Input Control**: Dropdown/Select Menu

**Options**:

- Post Graduate
- Graduate
- Under Graduate
- Diploma
- HSC (12th)
- SSC (10th)
- Other

**Validations**:

- Field is mandatory.
- User Experience:
- Using a dropdown ensures standardized data entry.
- If **Other** option is selected, a text field should appear to allow the user to specify their qualification.

### Parent's & Spouse's Details

The full names of the applicant's immediate family members, including **Father's Name, Mother's Name,** and **Spouse's Name**, are required for the application record.

The names of the father and mother are mandatory fields. The field for the spouse's name should only become visible and mandatory if the applicant has previously indicated their marital status as **Married**. All name fields should be validated to accept only alphabetic characters and spaces.

- Field Name(s): Father's Name, Mother's Name, Spouse's Name
- Description: The full names of the applicant's parents and spouse (if applicable).
- Data Type: Alphabetic (String)
- Input Control: Text Fields
- Validations:
- Father's Name and Mother's Name are mandatory.
- Spouse's Name field should only be enabled and made mandatory if the applicant's marital status is Married.
- Should only contain letters and spaces.
- User Experience:
- Provide separate, clearly labeled fields for each name.
- The Spouse's Name field can be dynamically shown or hidden based on a Marital Status field (which should be added before this step).

## Section 3: Credit & Employment

### Credit Bureau Check

This step involves an automated, system-driven check of the **applicant's CIBIL score** to assess their creditworthiness. This is not a user-facing data entry form but a backend process that is triggered after the applicant submits their basic details.

The system will use the applicant's **PAN** details to make an API call to a credit bureau and retrieve their credit report. The outcome of this check will determine if the application proceeds, is flagged for review, or is rejected.

- **Process Name**: CIBIL Score Check
- **Description**: An automated API call to a credit bureau (e.g., CIBIL) to fetch the applicant's credit score and report.
- Trigger: Successful submission and verification of the Basic Details section.
- **Input Data**: Applicant's PAN Number.
- **Business Rule**: The system will check if the fetched CIBIL score is above a predefined threshold (e.g., 720).
- **Success/Failure Handling**: Applications with scores below the threshold may be automatically rejected or sent for manual review, with appropriate notification sent to the applicant.

### Employment Details

This section is designed to capture the applicant's **current employment status, employer's information,** and **professional experience**. This information is critical for the lender to assess the applicant's income stability and repayment capacity.

The applicant will need to provide details such as their employment type **(salaried or self-employed)**, the name and address of their employer, and their total years of work experience.

- **Field Name(s)**: Employment Type, Employer Name, Employer Address, Total Work Experience
- **Description**: Captures the applicant's professional and employment history.
- **Employment Type**: Dropdown menu (Options: Salaried, Self-Employed/Business).
- **Employer Name**: Text Field.
- **Employer Address**: Text Area.
- **Total Work Experience**: Numeric Field (in years).
- **Validations**: All fields in this section are mandatory.

## Financial & Document Uploads

### Income Verification

To verify the applicant's declared income, this section requires them to upload **supporting financial documents**. The user will be presented with a file upload interface to submit digital copies of their **bank statements** and **Income Tax Returns (ITR)**.

This step is crucial for validating the applicant's financial health and eligibility for the loan amount.

- **Process Name**: Document Upload for Income Verification
- **Description**: An interface for the applicant to upload required financial documents.
- **Input Control**: File Upload component.

**Required Documents**:

- Bank Statements (e.g., last 6 months).
- Income Tax Returns (ITR) (e.g., last 2-3 years).
- Recent Salary Slips (if salaried).
- Validations: The system should validate the uploaded files for format (e.g., PDF, JPG, PNG) and enforce a maximum file size limit.
- User Experience: The interface should show a progress bar during upload and display a confirmation message for each successfully uploaded file.

### Property Documents

The applicant must upload a**ll legal documents related to the property being purchased** or **offered as collateral**. This includes proof of ownership, cost estimates, and tax receipts. This is a critical step for the legal and technical verification of the property.

- **Process Name**: Property Document Upload
- **Description**: An interface for the applicant to upload all property-related legal and financial documents.
- **Input Control**: File Upload component.

**Required Documents**:

- Sales Purchase Agreement
- Cost Estimate from Engineer/Architect
- ROR/Mutation Certificate
- Land and building tax paid receipts
- Validations: File format (PDF preferred) and size limits will be enforced.

### Supporting Documents

To complete the **KYC (Know Your Customer)** process, the applicant is required to upload additional identity and address proofs. This is a mandatory step to comply with regulatory guidelines.

- **Process Name**: Supporting KYC Document Upload
- **Description**: The applicant must upload their Aadhaar card and a valid address proof.
- **Input Control**: File Upload component.

**Required Documents:**

- Aadhaar Card (both sides)
- Address Proof (e.g., Utility Bill, Passport, Voter ID)
- Validations: File format and size limits will apply.

## Property & Security Verification

### Collateral Security Details

In this section, the applicant must provide details about the **property or asset** they are offering as collateral against the home loan.

This includes specifying the type of security, its value, and the margin or down payment amount the applicant intends to contribute. This information allows the system to calculate the total eligible loan amount based on the bank's Loan-to-Value (LTV) policies.

- Field Name(s): Type of Security, Total Security Amount (Property Value), Margin Amount, Total Eligible Amount
- Description: Captures details of the asset being pledged as security.
- Input Control:
- Type of Security: Dropdown (e.g., Residential Property, Commercial Property).
- Total Security Amount: Numeric (Currency) Field.
- Margin Amount: Numeric (Currency) Field.
- System-Calculated Field: The Total Eligible Amount will be calculated and displayed by the system based on the property value and the bank's lending policies.
- Validations: All user-input fields are mandatory.

### Property Verification

This is a backend process where the bank's **technical team verifies the submitted property details**. The assessment includes checking the property's age, marketability, legal status (such as RERA/HIRA approval), and its current market and distress values based on government guidelines.

- **Process Name**: Technical Property Verification.
- **Description**: A backend assessment of the property's physical and legal characteristics.
- **Input Data**: Property documents, address, and collateral details provided by the applicant.
- **Parameters Checked**: Type of property, age, marketability, RERA/HIRA approval status, market value, distress value, rate as per government guidelines.
- **Outcome**: A verification report that influences the final loan eligibility and amount.

## Underwriting & Assessment

### In-Principle Assessment

This is an automated backend step that generates a preliminary **assessment of the applicant's financial profile**. The system calculates a summary of their income, existing liabilities, and potential loan eligibility based on the data provided. This gives the underwriter an initial view of the applicant's financial standing.

- **Process Name**: In-Principle Financial Assessment
- **Description**: An automated summary of the applicant's financial health and preliminary loan eligibility.
- **Input Data**: Income details, employment details, existing investments, and proposed loan terms.
- **Output Summary**: Gross annual income, tax, net monthly income, monthly EMIs, proposed loan tenure, ROI, and eligible loan amount.

### Rating Sheet

The system will generate a rating score for the applicant based on a **predefined set of parameters set by the bank**. This internal rating helps the bank quantify the risk associated with the application by evaluating factors like the applicant's age, income stability, credit history, and recent financial behavior.

- **Process Name**: Applicant Risk Rating
- **Description**: A system-generated score that rates the applicant against various risk parameters.
- **Parameters**: Age, existing customer status, income source, EMI, loan tenure, address changes in the last 12 months, mobile number changes, and recent loan inquiries.
- **Outcome**: An internal score used by the underwriting team for decision-making.

### Final Assessment

This step provides a consolidated summary of the applicant's overall loan eligibility.

It combines the outcomes of various checks, including the maximum loan amount allowed for the product, the applicant's repayment capacity, and the eligibility based on the property's value and margin.

- **Process Name**: Final Eligibility Assessment
- **Description**: A comprehensive summary of the final loan eligibility from all assessments.
- **Summary Consists Of**: Maximum product cap, repayment capacity details, eligibility as per repayment capacity, eligibility as per property margin, and overall final loan eligibility.

## Review, Sanction & Agreement

### Review Details

This screen provides the applicant with a comprehensive summary of all the information they have entered throughout the application process.

It is a crucial step for ensuring data accuracy before final submission. The applicant can review all sections and will be given the option to go back and edit any information that is incorrect.

- **Process Name**: Application Review Summary
- **Description**: A read-only display of all data entered in the previous sections.
- **Functionality**: Each section displayed on the summary page will have an Edit button or link.

User Action:

- Clicking *Edit* will navigate the user back to the corresponding section to make modifications.
- A *Confirm & Submit* button will allow the user to finalize their application after review.

### Key Facts Statement

Once the loan is approved in principle, a **Key Facts Statement** is generated and presented to the applicant. This document provides a clear and concise summary of the most important terms of the loan before the final sanction.

- **Process Name**: Key Facts Statement
- **Description**: A summary of the primary loan terms and conditions.
- **Displayed Information**: Loan account number, type of loan, sanctioned loan amount, and loan terms.

### Loan Sanction Details

This screen displays the **final sanctioned loan offer** from the bank. It provides the official confirmation of the approved loan amount, interest rate, tenure, and EMI, reflecting the outcome of the entire underwriting process.

- **Process Name**: Loan Sanction Details
- **Description**: Displays the final, sanctioned loan details.
- **Displayed Information**: The actual sanctioned loan amount, final Rate of Interest (ROI), loan tenure, and final EMI details.

### Loan Agreement & Contract Execution

This is the final step where the **legal agreement is executed**. The applicant is required to download the loan agreement, affix a physical signature, and then scan and upload the signed document back into the system to complete the process.

- **Process Name**: Loan Agreement and Contract Upload
- **Description**: The process for downloading, signing, and uploading the final loan contract.

**User Action**:

- Download the loan agreement document.

- Print and physically sign the contract.

- Scan the signed document.

- Upload the scanned, signed contract back to the system.

- Input Control: A download link and a file upload component.
