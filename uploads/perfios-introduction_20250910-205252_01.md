# Perfios InteGREAT

## Introduction

Perfios InteGREAT is a revolutionary low-code platform, uniquely engineered for the complex, multi-party workflows of the financial and insurance sectors. It empowers organizations to rapidly design, build, and deploy sophisticated applications, transforming any process that involves multiple stakeholders into a seamless digital journey.

From customer onboarding for lending and credit cards to fully digitized invoice discounting and marketplace lending, InteGREAT provides the flexibility to build solutions of any scale—from simple employee onboarding automation to intricate, multi-layered financial platforms. Our intuitive, console-based environment empowers both business and IT teams to collaborate and launch solutions with unprecedented speed and agility.

## Core Capabilities

- **Rapid, Collaborative Development:** Tune, configure, and build customized solutions through a powerful low-code console, enabling instant deployment and dramatically reducing time-to-market.

- **Rich Ecosystem of Integrations:** Accelerate development with an extensive library of pre-built plug-ins for Email/SMS gateways, payment systems, mandate registrations, risk scoring engines, and core enterprise systems (AD, DMS, CBS).

- **End-to-End Process Automation:** The platform supports essential functions out-of-the-box, including contract management, e-signatures, video interactions, and robust reporting, creating a truly unified workflow.

- **Flexible Workflow Engine:** The configurable workflow management capabilities allow you to seamlessly integrate your existing processes without major operational disruptions.

- **Omni-Channel Ready:** Deploy solutions effortlessly across web and mobile for all user types, including retail customers, channel partners, relationship managers, and field agents.

## Loan Processing System (LPS)

Built on the InteGREAT platform, our Loan Processing System (LPS) is a comprehensive, end-to-end digital loan origination solution (LOS). It manages the entire loan lifecycle:

- Online application and document submission

- Automated KYC verification and bureau checks

- Data enrichment and analysis via integrated FinTech services

- Advanced loan assessment, underwriting, and recommendation

- Third-party agency assignment and verification

## The Perfios Advantage: Powered by Insights

The InteGREAT platform is supercharged by Perfios Insights, our intelligent data analysis engine. It automates the extraction and verification of critical financial data, dramatically improving turnaround time (TAT) for both online and offline application channels.

By eliminating manual data validation, your back-office and underwriting teams can focus on what matters most: approval and fulfillment. This leads to significant operational improvements, including:

- Lower operational costs

- Reduced application processing times

- Higher data accuracy

- Superior customer acquisition and experience.

Whether for lending, credit cards, or insurance, the Perfios InteGREAT platform provides the intelligent foundation needed to build the future of financial services.

## InteGREAT Platform Features

- Configurable Loan Products, sub products and Loan programs/variants including Cards, Insurance and CASA.
- Multiple repayment schedules.
- Multiple Journey Support-Customer Web, Branch Assist, DSA, Market place, Branch correspondent.
- Mobile and Email Authentication for the Journeys.
- Internal Branch user authentication through LDAP, HRMS.
- STP, N-STP journeys- STP Disbursement, STP Sanction and In-principal Sanction.
- Digital loan onboarding.
- Custom loan form and documents definition.
- Loan Workflow definition- Product, Sub product, Loan program level.
- OCR for extraction of Information from documents like PoI, POA. Additional match scores.
- Branch and entire Org Hierarchy setup and Staff user Management.
- Role based Maker-Checker user setup and workflow definitions.
- Role based creation, modification of users and their rights to Admin levels.
- Automatic notifications and reminders and Configuration of multiple .templates for various products, applicant stages, user types etc.
- Configurable Loan Contract definition and signing
- Risk scorecard.
- Business Rules engine.
- Loan Approval/sanction authority.
- Loan Deviation/Exception approval.
- Committee/Forum level Sanctions and workflow (Various levels of committees, various types of approvals like Majority, Committee Head, Representative etc.).
- Checklist and Due diligence checks- Configurable based on User roles and departments/verticals.
- Template based configurable system generated internal documents (Appraisal notes, contracts, Proposal form etc.).
- Integrations with analytics and verification systems (including Perfios Insights Solutions).
- Credit bureau integration catering to all Bureaus-Retail & Commercial. Individual and Multi Bureau pull.
- Sales agent module for external channel partners for lead entry and onboarding.
- Field Agency/Agent module across all types viz Legal, Technical, Verification, PD: Agency/agent onboarding, Application assignment, Agency-agent allocation, Reports submission.
- Collections agency module
- Customizable reports and KPIs for monitoring
- Customizable UI on Colour palettes, Client images and Branding
- Video KYC, Video PD, and e-Verification.
- Collateral Checks-Vehicle RC authentication with Vaahan database and CERSAI for Properties charge creation check.
- e-Sign, e-Stamping, e-NACH, e-Disbursement, e-Payments/Collection.
- Integration with Core systems like CRM, CBS, LMS, Cards systems, DMS, AML
- Banking -multiple options of Authentications-Net Banking, AA, e-PDF, Scanned document.
- The Platform is already integrated with a service provider in India to fetch Land, Crop details using Satellite Imagery.
- Add-on Cards creations
- Multiple Document digitization and extractions-GST, ITR, Financial statements, Pay slips, Card statements.

## InteGREAT Application Functional Architecture

The following diagram depicts the application functional architecture consisting of various application modules.

![application-functional-architecture](/image/application-functional-architecture.png)

## InteGREAT Application Modules

- Product Configuration
- Sub Product/Scheme Configuration
- Multi-Facilities configuration
- Onboarding Pages Configuration
- Credit Decisioning Rules Engine
- Document management
- Document Generation
- Document Template Management
- Action Orchestration
- User Management
- Roles Management
- Permission Management
- Deviation Management
- Branch Hierarchy Management
- CPC/Processing Centre Configuration
- Approval Hierarchy
- DSA Portal
- Branch Maker Portal
- Branch Checker Portal
- Committee Module
- Master Data Management
- Notification Engine
- Assessment Configuration and Multi-facility configuration
- Security/Asset Configuration
- Security/Collateral linkage to Facilities
- Checklist/Due diligence Definition
- Field Agency Admin Portal
- Field Agent Portal
- Field label, UI components, Tab name Localization
- Management Dashboard Report

### Product Configuration

- InteGREAT provides a capability to define loan products (Loan Modules), programs (Schemes) and facilities, which can further be defined along with their interest rates, rate code, minimum and maximum amounts, repayment types, fees and so on. The loan products can be grouped under product Groups for similar set of loan products along with tagging the products or product groups to a Line of Business. Using these parameters different types of loan products can be created for which the customers can apply. Tagging products to Line of Business, control which of these products are available to different customer types – such as retail loans for individuals, and SME loans for companies.

- Once products are defined, the forms required to apply for a loan product can be defined for each product, by enabling or disabling the required fields. This feature enables one to create customized forms for each product. All these fields and changes to them are reflected in the product form in real time.

- Product specific fields can be modeled using Question Group, which allows the configurator to define as many fields as possible and values that need to be exclusively and specifically captured for the product.

- Each loan product can define its own set of borrower onboarding fields or application fields that are relevant to that product. Platform supports conditional fields to ensure that the borrower only sees the relevant fields and does not have to view or fill out details which are not relevant to the product they wish to apply. By making certain fields mandatory or optional, one can ensure that all the required information is captured during the loan onboarding. LPS also supports lookup of information from a predefined list of values maintained as master data. The platform also supports enquiry of user information from government databases, to automatically pre-fill application forms for the borrower.

- Different types of borrowers – Individuals, Companies – proprietors, partnerships, LLPs, Private sector companies, etc., and Groups are supported in the onboarding and assessment.

### Sub Product/Scheme Configuration

- InteGREAT provides the capability to define schemes under loan products which can further be defined along with their interest rates, rate code, minimum and maximum amounts, repayment types, fees and so on.

- It provides flexibility to the user to apply all the conditions of the main product to the scheme and has an added set of criteria to be applicable for new loan schemes. E.g., Yoddha Personal loan.

### Multi-Facilities configuration

Multi-Facilities configuration caters to providing the option of availing multiple credit facilities in a single loan application.

- This could include a combination of Term loans, working capital loans, and other credit facilities to support various aspects of the businesses.

### Onboarding Pages Configuration

Platform supports configuring of Customer onboarding form pages with a comprehensive UI which facilitates easy change in fields, validations, mandatory checks on the go.

- The form fields can be configured for various data types (Dropdown, text, alphanumeric), visibility of the fields can be set, alignment of the fields on the form pages can devised by simple actions like enabling toggle switch, selecting from the dropdown menu etc.

- Platform provides easily configurable modules with simple rule applications on the fields wherever required, min-max value setting and numerous types of validations.

- The visibility and order of the tabs can be easily controlled in this module with the assistance of Tab Sort.

### Credit Decisioning Rules Engine

- Rule Builder: Allows for creation of custom rule sets using all data fields available. The UI interface lets users create their own rules sets with minimal involvement from the technical teams.

  - Supports most of the operators regularly used in building rule sets.
  - Supports multiple data types like numeric, category and date variables.
  - Simple rules as well as nested rule sets.

- Variable/Attribute Objects: Allows for creation of custom variables and ratios as well as all individual attributes available from various data sources. E.g., LTV, FOIR, Margins, Financial ratios etc.

  - The variables can be used from various data sources like
  - Bureau (Individual or Commercial)
  - Bank Statements (from Perfios BSA)
  - KYC Databases
  - Bank’s current LOS and LMS systems
  - Custom Lists (internal or external lists like red flags, offenders etc.)
  - Custom Data sets.

Use of variables mapped under commonly used Objects, which lets users pick the attributes faster. E.g., Attributes grouped under Objects like Income, Employment, PII/KYC etc.

- Scorecard Builder: The Scorecard Builder allows for the creation of a simple weighted average scorecard based on the Data Fields and Custom Variables created within a decision workflow.
  - Custom Scores can be populated against each metric and an Aggregated score can be arrived at against the Benchmark scores.
  - Scores can be used for eligibility checks at multiple stages. E.g., Minimum Credit Checks at initial stage for qualification of Applications into Go/No and for final eligibility assessment at Subsequent stages.

### Document management

The documents that are to be submitted by the customer can be configured conveniently at the LOS platform.

- Documents can be configured for the products and sub-product/program level and can be further classified according to the customer types. The documents can be marked mandatory or optional according to the loan product.
- Platform supports analysis on the documents including Bank statement analysis, GST Analysis, Form 16 analysis upon extracting the data. Document extraction and analysis using different solutions (OCR, Data Fetch) is also possible on the platform.
- The extracted and analyzed information are presented to the credit underwriter along with the loan form once it is submitted, enabling the credit underwriter to make informed decisions.
- Minimum documents requirement checks at different stages of the journey can be configured from the platform. Different decisions like Go/No Go/ Discrepancy can be enabled based on these checks.

### Document Generation

Certain Loan documents such as in-principal sanction letters are required to be generated in standard format in order to take action from the user end.

- Internal documents like appraisal notes, approval notes and so on, where a templatized document is required for application documentation purposes can be generated on the system by the specified users. These notes can also be enabled for editing by the users if required before saving it and can be downloaded and printed for signing and reuploaded again for storing documentation. Platform also records the details of who and when the notes were generated and uploaded for auditing purposes.

### Document Template Management

InteGREAT provides template management module to provide systematic handling of document templates, which serve as standardized forms, contracts and agreements used throughout loan application to ensure consistency, compliance and streamlined operations.

- The documents/contracts that are to be generated for the customers to download and e-sign can be configured in contracts management module via built-in editor. The templates of the contracts can be configured easily and can automatically be generated for each borrower. These contracts can be presented to the borrower at any stage of the onboarding process and can support signing in different ways - OTP based acceptance, e-Sign as well as manual sign and upload of contracts. These contracts will be available to both the borrower and the staff users (Ops team) to view and download at any stage in the origination and onboarding process.

- Versions of the same contract type can be created for Audit purposes. Contracts can be edited or modified using HTML editors and formats customized with the use of Application variables. E-signing and e-stamping services for the documents can be enabled and notifications to the intended user group can be sent.

### Action Orchestration

The platform enables decisioning of the loan workflows, build custom workflows and allows financial institutions to improve efficiency in their lending process without compromising their credit policies and requirements.

- The loan products have different application workflows depending on the type of loan and other loan parameters. LPS supports the creation of different workflows for each loan product. There can be a different workflow for Branch Assisted Journeys and Borrower Do-It-Yourself (DIY) journeys. The support for DIY journey workflow enables the platform to support pause/resume of application journeys and omnichannel customer journey across different devices.

- The platform also supports the concept of sub-stages where multiple actions need to be taken within a stage in the workflow. Each workflow state can have multiple sub-stages where users can take different actions. Automation tasks can be associated with some of the sub-stages to support automated actions. We can connect different actions to be performed – such as integrations etc. at the substage, to ensure specific actions are performed at specific instances in the workflow.

- While defining the workflow, certain checks called “Checklists” can also be associated to ensure all required actions are completed before moving the loan application to the next stage in the workflow. This way, the checklist can be used for the due diligence at each stage before moving the application to the next stage in the workflow.

### User Management

This module easily enables creation and management of user profiles accessing the LPS.

- The platform has a full support for defining branches, allowing to define the full structure of the bank from branches, circles, zones, Regions and so on all the way to the Head office (with a hierarchical relationship amongst these units) along with possibilities of attaching Regional Processing Centers to the Branches. This allows the bank to replicate their physical branch structure in the LPS, along with visibility and user mapping. The users can be provided visibility of only their assigned applications, or all the applications within the branch based on their role definition.

- Along with the branch mapping, the platform also defines the approval limits which can be controlled either at the branch or for the user grade/scale, to ensure the approval rights are maintained as per bank requirements. These limits can be separated for each product group for additional control on approval matrices.

### Roles Management

While creation of users, a user role is associated with it to ensure clear understanding of the activities the user can perform.

- While defining the staff users, each of them can be assigned either as Maker or Checker of the application.
- Additionally, Roles can be defined and associated with Role what all sections or fields can be visible to a role either view-only/Read-only or edit permissions.

### Permission Management

InteGREAT platform has the capability to provide role-based permissions to every module in the platform which reduces the ambiguity in the operations to be performed by the users.

- The user can define the operations a role can perform and assign permissions to access/edit the tabs.
- Permissions to access selective work steps can be easily configured by the user.

### Deviation Management

InteGREAT provides robust deviation management module which ensures all the auto-deviation and manual deviation in the entire loan workflow is covered.

- A Rules based deviation management is supported by the platform and external rule engine can also be plugged in into the system.
- No applications can be approved until all deviations are accepted. Such deviations can be raised manually by the user or raised automatically as an output of the rule engine. Different types of deviations can be configured for each product separately as per the bank policies.
- Deviations workflow management to support either a sequential flow of Deviations through all levels, or to parallelly assign the Deviations.
- Notifications to respective users, as and when Deviations decisions are taken, to proceed with next steps.
- As and when there are internal policy/product changes on the deviations, the Go to Time for making these changes are done with the ease of configurations instantly by Bank users themselves.

### Branch Hierarchy Management

Platform provides configurable hierarchy management system considering various divisions, zones, and functions of the branch unit.

- Any branch unit can be easily added and aligned to the parent unit according to its functions. Unit levels can be as per the Bank’s requirements like Head Office, Zone, Branch and Region.
- Along with the branch mapping, the platform also defines the approval limits which can be controlled either at the branch or for the user grade/scale, to ensure the approval rights are maintained as per bank requirements. These limits can be separated for each product group for additional control on approval matrices.

### CPC/Processing Centre Configuration

Platform supports the possibilities of attaching Processing Centers to the Branches

- In certain cases, applications are processed through Central Processing Units/Centers (CPU/Cs). The applications are sent from Branch to an associated CPC for application data punching and/or information verification. Platform supports for mapping associated CPC for branches.

### Approval Hierarchy

As there are many individuals involved in the Credit Approval Process, having a clear and convenient approval process according to the limits assigned per user reduces the probability of loan default.

- The loan applications as well as deviations, if any, are assigned to the users of the parking branch selected according to the scale of the officer.
- Maker-checker functionality in loan approval and deviation approval ensures that decision making on the application is verified end to end level.

### DSA Portal

InteGREAT platform comes with an in-house DSA portal which enables them to create loan applications from anywhere. The DSAs can be onboarded, and relevant credentials can be shared with them.

- The portal has access to role-wise restricted functionalities. The applications can be initialized and tracked.
- Separate DSA dashboard enables them to have 360-degree visibility of the transactions.

### Branch Maker Portal

Maker portal in LOS provides the facility ranging from onboarding the customer to sending the application for further approval.

- The extensive data entry is ensured at this portal, eligibility assessment is done, rule-based deviations are showcased.
- The application can be routed to any processing center through branch maker portal for further processing or can be sent for approval to checker portal as per Bank’s requirement.
- The user logged in the maker portal can view the pending applications in his/her queue, along with the TAT associated with it.
- The customer journeys that are dropped from the web portal can be resumed from here to further process them.
- Branch maker portal enables branch officer to calculate the EMI and ROI on the preliminary level before initializing the loan application which eases the decision making.

### Branch Checker Portal

The maker officer initiates the transaction, checker approves it. This ensures that the loan approval processes or transactions are correct and honest.

- The checker officer can be defined at the user management level.
- Checker officer can approve, reject or recommend the loan applications, also it can do similar operations on deviations, committee level operations as well.
- Applications can be assigned to checkers for regular sanctions or decisions, deviations or as part of committee approvals.
- Checkers will have options to either send back for any queries/discrepancies or to take action for final decision or to recommend further for higher level actions.
- Checkers also have options to assign applications to different branches or processing units from the current branch.

### Committee Module

Committee module addresses the entire workflow related to proposals which need to be sanctioned at Committee or Forum levels, in place of individual delegation.

The Committee or Forum is a group of members across Scale and departments authorized within Banks for sanction of proposals above certain Loan limits or for some specific deviations of the proposal.

The module enables end to end digital workflow of committee/forum level sanctions involving following steps:

- Creation of committee and assigning levels. E.g., Branch level retail committee, Zone level SME committee etc.
- Creation and adding members to the committee based on Scale, grade, level, department, roles etc.
- Definition of validations for requirements like Min count of members in the committee, Min count of members in each role required for sanction, Min representation of certain grades of levels required in the committee etc.
- Definition of additional roles like Head of committee, authorized representative or secretarial etc.
- Definition of approval types within the committee like Head level, majority, Min count of roles + Head, All members etc.
- Definition of workflow of the proposals sent to such committees in terms of sequential flow of recommendation from junior level committees, direct assignment, parallel assignment to multiple members within the committee etc.
- Incorporation of each committee member’s remarks in the final approved proposal notes.
- Query module and flow for any of the committee members raising queries on the proposal.
- Generation of final sanction note once final sanction is completed by Committee.
- Notifications to various members on actions like Sanction, rejection, query raised etc.

### Master Data Management

Master Data Management helps banks build a primary central repository of master’s by combining data across different source systems.

- Platform supports defining various masters and data mappings between masters. Some of the masters include State, District, City, Branch, Zone, Region, Manufacturer, Vehicle, Dealer, Crop, Scale of Finance, Gold, Agency/Agent master, Nearest Branch to a given pin-code, Vehicle Manufacturer, Model, Variant Master, Gold Price Master, Agri crop scale of finance at district level, HL Builder Master etc. If any of the master data needs to be mapped to other systems such as CRM, CBS then the mapping code can also be associated with each of the Master data.
- To update the Master data, User Roles and Permissions can be defined. Audit trail for each update is maintained by the platform.

### Notification Engine

As part of the platform configuration, different notifications can be configured.

- Set which actions should trigger notifications.
- Set whether send the notifications through email or SMS or Mobile App Push Notification
- See list of all notifications triggered and their status.
- Can specify the notifications template.
- Set the content template for each notification type.
- Able to put variables/parameters in the templates (e.g., borrower’s name)
Once the notification template is configured and notification method is enabled, the system can send automatic Email and SMS notifications to borrowers and/or to Staff users depending on what is the application workflow status.

### Assessment Configuration and Multi-facility configuration

Assessment module serves as the Credit underwriting assessment screen or CAM (Credit assessment memo) for the Credit/Risk analysts, providing a summary of the Program eligibility, comparison of eligibility across multiple assessment methods and the calculations of such assessments.

- Configuration of multiple assessment methods based on policy/surrogate programs at product level lets the users design and compute loan eligibility across multiple programs and facilities on the fly. Rule engine with policy rules configured powers the assessment screen.
- Users can get a comparison view of Loan eligibilities across multiple programs and can configure a final eligibility or recommendation based on rules like Min, Average etc. The comparison can be rendered in a tabular as well as graphical view.
- In addition to the final eligibility, the detailed workings, or calculations of all such eligibility are also presented on the screen to the users.
- CAM can be configured differently based on the various products, sub products and even at the Client level. CAM screen is integrated with Rules engine, such that, every time a re-run of the eligibility has to be computed, CAM screen is dynamically populated with revised output.
Multiple facilities configurations are relevant in certain products like Business or MSME loans, where multiple sub facilities can be requested by Borrower within the main product.
  - Example: Within the main product of Business Loan, sub products like Cash Credit/Overdraft and non-fund-based products like LC, BG are availed.
- Platform lets users configure such multiple loan facilities within the main product as part of the same Application ID. Configuration of designing different input/onboarding fields, documentation requirements, assessment output can be taken up.
- Flexibility to define these facilities as either Sub-limits of the main Product or as additional limits can also be configured as per client needs.

### Security/Asset Configuration

InteGREAT platform allows the primary and secondary security to be configured and linked to the eligibility assessment as per the loan product.

- Borrowers and branch staff can provide details of the assets such as land, vehicles and other collateral which would be used for assessing the overall eligibility. Different assets and collateral types as well as details can be captured for different products. The users can also provide multiple supporting documents for the assets as proof of ownership.

### Security/Collateral linkage to Facilities

This module lets users define various types of Security required in terms of Primary or Collateral, define specific coverage % for each and have them also linked to various credit facilities.

- Securities further can be defined in terms of whether they are Primary or collateral. E.g., Book debts, Stocks etc. are normally defined as Primary security while properties, FDs etc. are defined as collateral.
- Design of input fields based on the type of security can be configured. E.g., for FD as collateral, holder name, current value, tenure of FD etc.
- Additionally, such security/collateral defined can also be linked to various loan facilities based on policy norms. While linking, we can also define the specific collateral coverage ratios for each type of security based on the margin requirements. E.g., for FD, the margin can be only 10% while for a commercial property, the margin can be higher at 40%. The system has in built validations to ensure the user enters the values as per the requirements of the policy norms, thereby preventing erroneous data entry.

### Checklist/Due diligence Definition

Defining Checklist/Due Diligence ensures that all the required actions are completed before moving the loan application to the next stage in the workflow.

- Before sending the case for approval, the checker officer can validate whether the mandatory details are submitted pre-sanction and post-sanction as well.
- The due diligence list can be configured with eas with simple addition questions in the list with mentioning the data types of the answer required.

### Field Agency Admin Portal

InteGREAT provides robust Field agency Admin portal which ensures hassle free addition of external field agencies and supports linking of Field agents to it.

- The agencies can be categorized according to the functionality e.g.: Legal, Valuation, Investigation etc.
- With the help of Admin portal, the agencies can be disabled/blacklisted if required.
- The audit logs in detail are captured regarding the operations done on added agency.

### Field Agent Portal

The LOS Field Agent Module is a great way to handle external verifications in loan applications. It can be used for verification of Vehicle, Equipment, Property etc. for mortgage loans against property or against equipment and so on.

- Field Investigation agencies or individual agents can be assigned to loan applications, to perform physical, technical, legal and other evaluations. These evaluations can be provided back to the credit underwriter along with supporting documents which can be uploaded by the investigation agent. Using these inputs and documents, the credit underwriter is empowered to make better decisions.
- Administrative tasks like bulk upload of agencies and executives, temporarily deactivating/reactivating agencies etc. are also supported and can be done with the ease of Configurations without any development efforts.
- Applications can be re-assigned from One agency or Agent to another through User actions, if applications are pending beyond a threshold time period.

### Field label, UI components, Tab name Localization

Localization of the field name, tab name ensures the re-usability of the attributes which keeps the application light and saves the trouble duplication.

- InteGREAT provides configurable localization functionality with the easy to use edit feature.
- The field label hence can easily be edited and re-used in another form creation.
- The loan statuses can also be renamed and re-used with the help of localization.

### Management Dashboard Report

Management and user hierarchy level dashboards for tracking various important Business metrics with options of filters for slicing the data on time period, Product, line of business etc.

- The following types of reports are available on the platform:
  - Day, MTD, QTD, YTD, customized date wise report of approval/disbursement (Disbursement report)
  - Day, MTD, QTD, YTD, customized date wise report for collection (upcoming repayment report), outstanding.
  - Day, MTD, QTD, YTD, customized date wise report for new loan applications.
  - Overall view of the application count across stages
  - LOB based dashboards with month wise distribution count of disbursed cases.
- The metrics need to be tracked various product, business hierarchy like Branch, zone, head office etc.
- The platform provides various dashboards for tracking the business metrics like above mentioned. Dashboards are also enabled at the hierarchy level. E.g. a Branch level user will get to view the metrics in the dashboard at the Branch level, while the Zone level user will view the dashboards aggregated at the zone level which is an aggregate of data across all Branches mapped to the zone.
- Users can also configure the various loan stages for the Application funnel view. Dashboards are displayed both for count of applications and Amount or Value of Loan amounts.
- Users can also view the data across other slicing including Salaried Vs Self-employed split, ETB vs NTB, break up of Sanctions based on Bureau score bands etc.

### Product specific TAT definition and tracking

Definition of Turnaround Time or TAT for every product and every loan stage along with the ability to configure by Business users, when there are changes to be made. Tracking and display of such TAT info to users with a visual differentiation like % completion, TAT breach

- Turnaround Time or TAT is an important metric for the lenders and borrowers for value proposition in a Loan onboarding journey.
- For every product onboarding, TAT in terms of no of days can be configured from a loan stage “A” till the loan stage “B”, when the decision and the logical completion of the application is done.
- Since a product onboarding navigates through multiple stages in the interim, TAT can be configured for each of these stages as well, in order to track the efficiency of every unit processing the application.
- Calculation of TAT is done on the fly for applications, when a Bank user looks at his set of applications to be worked upon.
- TAT Is also displayed to users visually in order to prioritize the applications within the list. Visual display like % left for TAT, TAT breach in no of days etc. with different colour coding is also enabled. This also lets supervisors plan the work distribution among the team members.

Risk Scorecard Management
InteGREAT platform has features of creating customizable scorecards based on Credit Underwriting policy and risk categorization policy.

- Platform supports for modeling such policies and associated to each product and the same gets evaluated during the loan application processing.
- Based on the score, LOS can also auto assign risk types to the loan, and support different workflows based on the risk type.
- Along with this, auto assignment of loan amount, tenure and interest rate is also supported using risk types. This assists the underwriter to classify different borrowers and loan types and take the necessary action based on the classification.

### Configurable Loan Calculator

Loan calculators can help users figure out the monthly payments on different types of loans. These include mortgages, car loans, personal loans, and so on.

- These can also help the customers understand how much they can afford to borrow based on your income and other factors.
- The parameters such as loan limit, tenure limit for the loan product can be set according to the loan product. Also, the calculator parameters such as ROI%, FOIR%, multiplier factor can be configured easily.

### Loan ROI Calculation with Taxes and Fees

Considering the requirement of the Bank to have easy to change ROI and processing fee according to seasonality, InteGREAT provides ROI calculation, processing fees configurable according to the loan product along with rules from BRE engine.

- The codes for ROI can be defined for Base rate and additional surcharge and configured according to the loan product.
- Components under ROI can define like Base rate, Mark-up, Spread rate, Preferential interest rate and the Interest type can be selected as Fixed or Floating.

### Personal discussion Questionnaire configuration

The Personal Discussion option allows the user to have an online discussion with the applicant and co-applicant through video call and acquire answers to all of the questions required to submit the application.

- The questions that are to be asked during the Personal Discussion to the applicant can be easily configured.
- During the Video call, the required Questions and answers are captured and noted.
- Additional questions and following answers can also be noted on the call.

### Video Personal Discussion with video recording

The Video Personal Discussion feature allows the user to be on the live video call with the borrower and co-borrower for any type of discussion which might be required during loan processing.

- The RM/DSA can use this functionality to invite the applicant and co-applicant by sending an invitation to their registered email address.
- When the applicant clicks on the invite link, he/she is able to join the video conference, while the RM/DSA will be waiting for the applicant to join the video call.
- The RM/DSA can record the responses to all queries as well as the overall state of the conversation during the call. The whole discussion can be recorded and saved for future reference.
- The module has a dedicated dashboard using which DSA user can refer to all the completed discussions.
- DSA users can capture the screenshots during discussion calls.

### Branch visit Appointment

In the STP journey, the customer can decide to visit the Branch in case of any query with the help of Branch Appointments and Schedule module of InteGREAT.

- Customer can initiate the appointment based on the available timeslot with the branch.
- Appointment once confirmed is visible on the calendar of the branch officer.
- The branch officer can further resume the loan journey from the branch.
- The appointments are synchronized according to the working days of the bank and Bank specific holiday calendar can configured with the module.

### Service Ticket

A service ticket system is a module that facilitates customers to raise a ticket (complaint/query) regarding a product or a service offered by the bank.

- It provides a common digital platform for the customers and the bank officials for resolving issues related to products and services offered by the bank.
- The tool can be used for tracking, logging and assigning of service tickets among the bank’s officials.
- The service tickets can be created for various products and depending on the selection of product the request types can be configured.
- For e.g.: Credit Card would have service tickets to modify limit, upgrade card, Block card, application tracking, Contact Branch officer etc.
- The service ticket number is generated on successful creation of the ticket and is allocated to the respective branch for further action.
- The customer and branch are notified through email and SMS regarding the updates of the service ticket.

### Audit Trails

InteGREAT platform has its robust auditing under every module to ensure all the activities performed are getting tracked to a minute level.

- Every field value that gets changed (either manually through the staff user or system changes) is tracked and captured along with Date timestamp, user ID and device identifier (IP address). These are write-once kinds of updates to the database and are stored separately from the transaction database.
- Every API request invocation is logged, and the audit trail is maintained. The entire request parameters are recorded in a separate database for auditing purposes.

### Bundled Loan

A bundle loan, by definition, combines several different loan products into one package, allowing borrowers to secure financing for multiple needs under a single agreement. This innovative approach not only streamlines the borrowing process but also offers unique benefits to both the borrower and the lender.

- Ability to create custom bundle loan products, seamlessly integrating multiple loan offerings into a single, parent loan product. This flexibility ensures that financial institutions can cater to the diverse needs of their clients, offering tailored financial solutions.
- This module provides the capability to specify the precise status a bundle loan product must reach before it can be created or processed. This feature introduces a structured approach to loan management, enabling financial institutions to streamline their operations and enhance efficiency.
- Capability to define the status that the bundled loan product will attain once it is created. This functionality allows for clear, consistent management of loan products post-creation, ensuring that all stakeholders are informed of the loan's progress and current standing.
- A specialized screen is dedicated to managing all bundled loans under the parent loan, providing a centralized platform for oversight. This dedicated interface ensures that managing bundled loans is straightforward and efficient, allowing financial institutions to maintain control over their loan products with ease.

**Advantages for Borrowers:**

- Simplified Management: By consolidating various loans into a single package, borrowers can enjoy the ease of managing one account with one monthly payment, eliminating the hassle of multiple payment dates, terms, and conditions.
- Better Rates and Terms: Leveraging the total loan amount, borrowers often secure more favorable rates and terms than they would negotiating individual loans. This can lead to significant savings over the life of the loans.
- Customized Financial Solutions: Bundle loans allow for greater flexibility and personalization, tailoring the financial package to meet the borrower's specific needs, timelines, and financial goals.

**Advantages for Banks and Lenders:**

- Increased Business Opportunities: Offering bundle loans can attract a wider customer base looking for comprehensive financing options, leading to increased loan origination volumes.
- Enhanced Customer Loyalty: By providing a solution that simplifies and improves the borrowing experience, banks can strengthen relationships with their clients, fostering loyalty and long-term engagement.
- Operational Efficiency: Processing one bundled application is more efficient than managing multiple separate applications, reducing administrative overhead, and improving turnaround times.

### Balance Transfer

As the name suggests, the Balance Transfer feature allows customers to transfer outstanding debt from one account to another account, typically with a lower interest rate or more favorable terms. This service is often used by consumers to consolidate debt, save money on interest payments, or take advantage of any promotional offers.

- The feature allows customers to apply for a balance transfer either through the bank's online platform or through the mobile app eliminating the hassle of visiting the branch physically.
- It allows the customer to choose the loan that they want to transfer among all their existing liabilities.
- It allows the transfer of one or many loans from one banking institution to another.
- A dedicated screen has been developed to oversee the transfer of loans and manage its requirements.

**Advantages to Borrowers:**

- **Lower Interest Rates:** By transferring debt to an account with a lower interest rate, customers can reduce the amount of interest they pay over time, potentially saving money.
- **Consolidation:** Managing multiple debts can be overwhelming. Balance transfers allow customers to consolidate their debt into a single account, making it easier to track and manage payments.

**Advantages to Lenders:**

- **Interest Income:** While balance transfers often come with promotional periods of low interest, banks still benefit from any remaining balance that is subject to the standard interest rate, which generates revenue for the bank.
- **Acquisition of New Customers:** It often attract new customers who may be enticed to switch their loan account to a new account with more favorable terms, leading to an increase in the bank's customer base and potentially long-term relationships with these customers.
- **Increased Wallet Share:** By offering balance transfer services, banks have the opportunity to gain a larger share of their customers' financial activities.
- **Cross-Selling Opportunities:** It represents opportunities for cross-selling other financial products and services. Once they become customers, banks can market additional products such as insurance, investment accounts, or rewards programs, further increasing revenue and customer engagement.

### Existing Liabilities Closure

As the name suggests, the feature allows the user to close liabilities existing with a customer with any number of banks/lenders. This helps the borrower in increasing their credit limit to a certain extent.

- The page/tab considers all the liabilities of the borrower.
- The page/tab provides the borrower with an estimation of their tentative impact of closure on their loan offer.
- It allows the user to close multiple liabilities at once and get an estimation on their eligible loan amount instantaneously.
- A dedicated screen has been enabled to manage all the complexities of closing the existing loans and getting a better loan offer.

**Advantages to Lenders:**

- Increased Creditworthiness: When borrowers close existing liabilities, their overall debt burden decreases. This can improve their creditworthiness, making them the ideal customers to lenders for new loans.
- Lower Default Risk: Borrowers with fewer existing liabilities are less likely to default on new loans. This reduces the credit risk for banks/lenders and improves the overall quality of their loan portfolio.
- Faster Loan Approvals: Borrowers with fewer existing liabilities may present lower risk profiles, leading to faster loan approval processes for lenders.

**Advantages to Borrowers:**

- Savings on Interest Payments: By closing existing liabilities, borrowers can save money on interest payments over the long term, especially if the liabilities carry high-interest rates.
- Improved Credit Score: Closing existing liabilities demonstrates responsible financial behavior and can improve credit scores over time, making it easier to access credit in the future.

### Exception Cases

The Exception Cases tab acts as a checklist for the user to get all the required information in place before the application moves forward for sanction and/or disbursal. The exceptions must be configured on to the platform, and there’s no limit on the number of cases that can be added.

- The exceptions are triggered by the BRE and appear to the user dynamically.
- The versatility of the configuration is such that it can allow the user to raise an exception basis a single source or dual sources.
- For a dual source case scenario, the tab also showcases the user the percentage match between the 2.
- The feature also allows the user to configure the literature that needs to be configured on a case-by-case basis.

**Advantages to Lenders:**

- **Dynamic Checklist:** The tab displays the list only when a discrepancy/gap has been found in the loan journey. It makes the loan journey fool-proof by making sure all the points have been covered before sanctioning or disbursing a loan to the customer.
- **Curbs Human Error:** Since the process is entirely automated and dynamic, it eliminates the chances of human error and thereby reduces the risk of incomplete due diligence.
- **Quick Turnover:** It eliminates the human intervention of collating points for creating a checklist. The dynamic behavior of the tab creates the checklist on-the-go and reduces the overall TAT.

### Reports and Analysis

The purpose of the tab is to showcase the user all the documents that were used while processing a loan application and to allow them to download it. The Reports and Analysis tab acts as a dashboard and presents all the documents that have been involved in the entire loan journey and provides the capability to download them as well. The documents are a culmination of all the documents that have been acquired, processed and analyzed throughout the journey.

- The tab provides a glimpse of the necessary details required to identify the candidate accurately.
- The tab segregates the documents basis the actors involved in the loan process – Main Applicant, Co-applicant, Guarantor, etc. into separate categories. This helps the user in navigating through the page easily and quickly.
- It also allows the user to download the documents all at once or to download documents from a single category together.

<!-- **Advantages to Lenders:**

- **Ease of Use:** With the templatized representation of the documents and its actors, it becomes easier for the bank user to locate a particular file.
- **Time Saving:** The dashboard saves the time of the user that would have been spent gathering all the documents involved in the loan.
- **Download Button:** The tab along with the collation allows the user to download all the documents from a single point of view saving both time and effort on their end. -->
