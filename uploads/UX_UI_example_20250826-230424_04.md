---
title: UI/UX Example
sidebar_position: 4
---

### Project Overview

This document outlines the end-to-end UI/UX specifications for the Personal Loan Application platform, covering desktop and mobile views.

```yaml
Document Title: UX/UI Design Specification – Personal Loan Application Journey
Version: 1.0.0
Date: 27 July 2025
Prepared by: Deepu Gowda
Figma Design Link: [Insert URL or leave as placeholder]
Approved by: [Reviewer Name]
```

### Business Goals

- Quick loan disbursal with minimum documentation

- Mobile-first, user-friendly flow

- Instant eligibility check & KYC verification.

### Target User

| **User Type**           | **Description**             | **Requirments**                    |
| ----------------------- | --------------------------- | -------------------------------------- |
| **Salaried**            | Monthly income via employer | Easy document upload, fast approval    |
|**Self-employed**       | Variable income             | More flexible eligibility, extra proof |

### Loan application flow

| **Stage**             | **Purpose**                            | **UI Screens**    |
| --------------------- | -------------------------------------- | ----------------- |
| **Landing Page**      | Showcase offer & prompt to apply       | Landing Page      |
| **Eligibility Check** | Collect PAN + Mobile + basic income    | Eligibility Form  |
| **KYC Upload**        | Upload Aadhaar, PAN, Bank Statements   | Document Upload   |
| **Loan Offer**        | Show eligible amount, interest, tenure | Offer Screen      |
| **e-Sign**            | Aadhaar-based e-signature              | Signature Screen  |
| **Disbursment**       | Post-submission tracking               | Congratulation    |

### Procedure

#### 1. Landing Page

Goal: Highlight loan benefits, direct to application.

```yaml
  - Banner: Get Instant Personal Loan up to ₹5L!
  - CTA: Apply Now
  - USPs: No collateral, Fast approval, Paperless
```

#### 2. Eligibility Check

Goal: Determine pre-qualification instantly.

**Fields:**

```yaml
Verification with OTP:
  Mobile Number
  Email Address
  PAN Number
  Aadhaar Number
  Voter ID / any Govt., approved Document
```

#### 3. KYC Upload

Goal: Collect ID, address & Income proof.

```yaml
Upload Documents:
  Aadhaar (front & back)
  PAN Card
  Salary Slips (last 3 months for salaried Employee)
  Bank statement (last 6 months for self employement)
  ITR's
  
UX Notes:
  Allow file upload (mobile)
  Compress file size should be <5MB
  Show thumbnails after verification
  Show uploaded icon after file uploaded
```

#### 4. CIBIL & Eligability Check

Goal: Check the CIBIL score & previous loan details (if applicable).

```yaml
CIBIL:
  Check, if the applicant is meeting the minimum score.

Eligability:
  Check for any other on-going loans.  
```

#### 5. Loan Offer Screen

Goal: Present approved amount & terms

```yaml
Data Displayed:
  Approved loan amount
  Tenure (months dropdown)
  Interest rate (%)
  EMI estimate
  Allow adjustment of amount/tenure
  Recalculate EMI in real time
```

#### 6. e-Sign Screen

Goal: Legally authorize agreement

```yaml
Steps:
  Display agreement preview
  OTP sent to Aadhaar-linked number
  Confirmation of success

UX Notes:
  Scroll to bottom before enable sign
  Legal text in readable format
```

#### 7. Disbursment

Goal: Track progress & repayment

```yaml
Sections:
  Application ID
  Status bar (Submitted → Approved → Disbursed)
  Documents re-upload (if needed)
  Contact Support

UX Notes:
  Quick help via Helpline/email
```

### Design References

**Color:**

```yaml
  Background: #E9E5E5
  Primary: #6200EE 
  Accent: #03DAC5
  Success: #4CAF50
  Error: #D32F2F
```

#### Microcopy Samples

| Scenario    | Text                                              |
| ----------- | ------------------------------------------------- |
| Empty State | "No documents are uploaded yet. Start now."       |
| Error       | "Invalid PAN number. Please check and try again." |
| Success     | "Congratulations! Your loan is approved."         |

#### Business Rules

```yaml
  Minimum salary: ₹15,000/month
  Mobile number, Email and PAN are mandatory
  Aadhaar OTP must match UIDAI
  Rejection reason shown transparently
```

#### Appendix

```yaml
  Links: Figma
  Assets Folder: Logos and Icons
  Glossary: EMI, KYC, eSign, etc.
```
