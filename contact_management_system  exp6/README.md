# Contact Management System

## Description
A Flask-based contact management application that allows users to create, read, update, and delete (CRUD) contacts. The system includes features like search functionality, input validation, and a responsive UI with modern styling.

## Author
Student

## Date
April 14, 2026

## Features Implemented

### Task 1: Project Setup & Environment ✅
- Created project folder structure
- Installed Flask
- Created all required directories and files

### Task 2: Flask App Initialization ✅
- Initialized Flask application
- Created home route displaying all contacts
- In-memory storage using list/dictionary

### Task 3: Add New Contacts (Create) ✅
- Route `/add` for adding contacts
- Form with Name, Phone, Email fields
- Input validation for all fields
- Success/error flash messages

### Task 4: View & Display Contacts (Read) ✅
- Contact list table display
- Card-based layout with hover effects
- Contact details page
- Display creation and update dates

### Task 5: Update Contact Details (Update) ✅
- Route `/edit/<id>` for editing contacts
- Pre-filled form with current contact data
- Validation on update
- Timestamp tracking for updates

### Task 6: Delete Contacts (Delete) ✅
- Route `/delete/<id>` for deleting contacts
- Confirmation dialog before deletion
- Automatic redirect to home page

### Task 7: Search & Styling (Bonus) ✅
- Search by name or phone number
- Professional CSS styling with gradient backgrounds
- Responsive grid layout for contact cards
- Animated alerts and transitions
- Icon emojis for better UX

## Installation

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Setup Steps

1. **Navigate to project folder:**
   ```bash
   cd contact_management_system
   ```

2. **Create virtual environment (optional but recommended):**
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install required packages:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask development server:**
   ```bash
   python app.py
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:5000
   ```

3. **Stop the server:**
   - Press `Ctrl+C` in the terminal

## Usage

### Adding a Contact
1. Click "➕ Add Contact" button in the navigation
2. Fill in the form with Name, Phone, and Email
3. Click "✅ Add Contact" to save

### Viewing Contacts
- Home page displays all contacts in a card layout
- Click on a card to view full details

### Editing a Contact
1. Click "✏️ Edit" button on a contact card
2. Modify the information
3. Click "💾 Save Changes"

### Deleting a Contact
1. Click "🗑️ Delete" button on a contact card
2. Confirm the deletion
3. Contact will be removed from the system

### Searching Contacts
1. Enter a name or phone number in the search box
2. Click "🔍 Search" to filter
3. Click "Clear" to reset the search

## File Structure

```
contact_management_system/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── README.md                       # This file
├── templates/
│   ├── base.html                  # Base template with styling
│   ├── index.html                 # Contact list page
│   ├── add_contact.html           # Add contact form
│   ├── edit_contact.html          # Edit contact form
│   └── contact_detail.html        # Contact details page
└── static/
    └── (CSS and JS files)         # Static assets folder
```

## Validation Rules

### Name
- Required field
- Cannot be empty or only whitespace

### Phone Number
- Required field
- Format: 555-123-4567, (555) 123-4567, or 5551234567
- Minimum 10 digits

### Email
- Required field
- Must contain valid email format (abc@domain.com)

## Features

### User Interface
- **Responsive Design:** Works on desktop and mobile devices
- **Gradient Backgrounds:** Modern gradient color scheme
- **Animated Elements:** Smooth transitions and animations
- **Flash Messages:** Success and error notifications
- **Icon Emojis:** Visual indicators for actions

### Functionality
- **CRUD Operations:** Complete create, read, update, delete functionality
- **Search Feature:** Quick search by name or phone
- **Validation:** Client-side and server-side validation
- **Timestamps:** Track when contacts were created and updated
- **Contact Counter:** Display total number of contacts

### Code Quality
- **Clean Code:** Well-organized and commented code
- **Error Handling:** Proper error messages and handling
- **Input Validation:** Prevents invalid data entry
- **Reusable Templates:** Base template inheritance for consistency

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, modify the last line in `app.py`:
```python
app.run(debug=True, port=5001)  # Change to different port
```

### Flask Not Installed
Ensure Flask is installed:
```bash
pip install flask
```

### Virtual Environment Issues
Deactivate and reactivate virtual environment:
```bash
deactivate
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux
```

## Academic Integrity

This is original work created for educational purposes. All code is written from scratch following Flask best practices and web development standards.

### References
- Flask Official Documentation: https://flask.palletsprojects.com/
- Python Regular Expressions: https://docs.python.org/3/library/re.html
- HTML5 Specification: https://html.spec.whatwg.org/

## Credits

- HTML5 & CSS3 for web standards
- Flask micro-framework for Python
- Bootstrap concepts for responsive design

## License

This project is for educational purposes only.

## Contact

For questions or support, please contact your instructor.

---

**Last Updated:** April 14, 2026
