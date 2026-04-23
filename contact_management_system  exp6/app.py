"""
Contact Management System
Author: Student
Date: April 14, 2026
Description: A Flask-based contact management application with CRUD operations
"""

from flask import Flask, render_template, request, redirect, url_for, flash
import re
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# In-memory storage for contacts
contacts = []
contact_id_counter = 1


def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_phone(phone):
    """Validate phone number format"""
    # Accept formats: 123-456-7890, (123) 456-7890, 1234567890, etc.
    pattern = r'^[\d\s\-\(\)\+]{10,}$'
    return re.match(pattern, phone) is not None


def validate_contact(name, phone, email):
    """Validate all contact fields"""
    errors = []
    
    if not name or not name.strip():
        errors.append("Name is required")
    
    if not phone or not phone.strip():
        errors.append("Phone number is required")
    elif not validate_phone(phone):
        errors.append("Invalid phone number format")
    
    if not email or not email.strip():
        errors.append("Email is required")
    elif not validate_email(email):
        errors.append("Invalid email format")
    
    return errors


@app.route('/')
def index():
    """Display all contacts"""
    search_query = request.args.get('search', '').lower()
    
    if search_query:
        filtered_contacts = [
            c for c in contacts
            if search_query in c['name'].lower() or search_query in c['phone']
        ]
    else:
        filtered_contacts = contacts
    
    return render_template('index.html', contacts=filtered_contacts, search_query=search_query)


@app.route('/add', methods=['GET', 'POST'])
def add_contact():
    """Add a new contact"""
    global contact_id_counter
    
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        
        # Validate inputs
        errors = validate_contact(name, phone, email)
        
        if errors:
            for error in errors:
                flash(error, 'error')
            return redirect(url_for('add_contact'))
        
        # Create new contact
        new_contact = {
            'id': contact_id_counter,
            'name': name,
            'phone': phone,
            'email': email,
            'created_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        contacts.append(new_contact)
        contact_id_counter += 1
        
        flash(f'Contact "{name}" added successfully!', 'success')
        return redirect(url_for('index'))
    
    return render_template('add_contact.html')


@app.route('/edit/<int:contact_id>', methods=['GET', 'POST'])
def edit_contact(contact_id):
    """Edit an existing contact"""
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    
    if not contact:
        flash('Contact not found', 'error')
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        email = request.form.get('email', '').strip()
        
        # Validate inputs
        errors = validate_contact(name, phone, email)
        
        if errors:
            for error in errors:
                flash(error, 'error')
            return redirect(url_for('edit_contact', contact_id=contact_id))
        
        # Update contact
        contact['name'] = name
        contact['phone'] = phone
        contact['email'] = email
        contact['updated_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        flash(f'Contact "{name}" updated successfully!', 'success')
        return redirect(url_for('index'))
    
    return render_template('edit_contact.html', contact=contact)


@app.route('/delete/<int:contact_id>')
def delete_contact(contact_id):
    """Delete a contact"""
    global contacts
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    
    if contact:
        contact_name = contact['name']
        contacts = [c for c in contacts if c['id'] != contact_id]
        flash(f'Contact "{contact_name}" deleted successfully!', 'success')
    else:
        flash('Contact not found', 'error')
    
    return redirect(url_for('index'))


@app.route('/contact/<int:contact_id>')
def view_contact(contact_id):
    """View contact details"""
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    
    if not contact:
        flash('Contact not found', 'error')
        return redirect(url_for('index'))
    
    return render_template('contact_detail.html', contact=contact)


if __name__ == '__main__':
    # Add sample contacts for demonstration
    sample_contacts = [
        {
            'id': contact_id_counter,
            'name': 'John Doe',
            'phone': '555-123-4567',
            'email': 'john@example.com',
            'created_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    ]
    contact_id_counter += 1
    contacts.extend(sample_contacts)
    
    app.run(debug=True, port=5000)
