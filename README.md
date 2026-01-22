Culinary Connoisseurs Portal
A high-fidelity front-end authentication and transaction management interface. This project focuses on Validation Logic and Interface Engineering, providing a secure and intuitive portal for caterers to manage client accounts and events.

🚀 Key Features
Multi-Step Validation: Employs complex Regular Expressions (Regex) to ensure data integrity for passwords, phone numbers, and IDs.

Dynamic UI Feedback: Real-time DOM manipulation toggles "REQUIRED" indicators and password visibility to enhance the user experience.

Data Normalization: Includes a custom engine to standardize inconsistent phone number formats (dashes, spaces, and extensions) for reliable backend processing.

Account Verification: A client-side verification system that cross-references inputs against a structured data array to authorize transactions.

🛠️ Technical Stack
HTML5: Structured with semantic elements for accessibility and clear form hierarchy.

CSS3: Custom styles featuring Flexbox layouts, semi-transparent overlays (rgba), and responsive design for cross-device compatibility.

JavaScript (ES6): Pure JS implementation of form logic, event listeners, and data filtering.

📂 Logic Breakdown
1. Robust Form Validation
The system enforces strict security and formatting rules:

Passwords: Must start with a special character, contain at least one uppercase letter, one number, and be no longer than 5 characters.

Phone Numbers: Requires a 10-digit base plus a mandatory extension (e.g., x123 or ext 123).

Emails: Validated with a 1–3 letter domain constraint when confirmation is requested.

2. Data Processing
The normalizePhone function ensures that regardless of how a user types their number, the system stores and compares it in a consistent format:

JavaScript

// Example: "123-456-7890x123" vs "123 456 7890 ext 123" 
// Both are normalized to a standard digit-string for verification.
📝 Usage
Open login.html in any modern web browser.

Enter valid caterer credentials (e.g., Sneh Bhatt, ID 1001, Password #Sb68).

Select a transaction type from the dropdown menu.

Submit to trigger the verification sequence and receive a personalized welcome alert.

Would you like me to add a "Future Enhancements" section to this README to show how you would scale this into a full-stack application?
