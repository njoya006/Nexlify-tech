# Email Setup Guide for Nexlify Tech Contact Form

## Option 1: EmailJS Setup (Recommended - FREE)

EmailJS allows you to send emails directly from your contact form without a backend server.

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### Step 2: Connect Your Gmail Account
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Click "Connect Account" and login to nexlifytech06@gmail.com
5. Give it a Service ID (like "gmail_service")

### Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Submission - {{from_name}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
Company: {{company}}
Service Interested: {{service}}
Budget: {{budget}}
Timeline: {{timeline}}

Message:
{{message}}

---
This message was sent from the Nexlify Tech contact form.
```

4. Save the template and note the Template ID

### Step 4: Update Your Website
1. In your EmailJS dashboard, go to "Account" → "General"
2. Copy your Public Key
3. Go to "Email Services" and copy your Service ID
4. Go to "Email Templates" and copy your Template ID

5. In your contact.html file, replace:
   - `YOUR_PUBLIC_KEY` with your actual public key
   - `YOUR_SERVICE_ID` with your service ID  
   - `YOUR_TEMPLATE_ID` with your template ID

### Step 5: Test the Form
1. Open your contact page
2. Fill out and submit the form
3. Check nexlifytech06@gmail.com for the email

---

## Option 2: Formspree (Alternative - Easy Setup)

If you prefer a different service:

1. Go to https://formspree.io/
2. Sign up for free account
3. Create a new form
4. Update your form action to: `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
5. Change all `name` attributes back to simple names like `name="name"`

---

## Option 3: Simple mailto: Link (Fallback)

If you want a simple solution that opens the user's email client:

Replace the form with:
```html
<a href="mailto:nexlifytech06@gmail.com?subject=Project Inquiry&body=Hello Nexlify Tech, I'm interested in..." class="btn">Send Email</a>
```

---

## Current Status

✅ Form is updated with proper field names for EmailJS
✅ nexlifytech06@gmail.com is set as the contact email
✅ EmailJS integration code is added
⏳ Waiting for you to configure EmailJS account and add your keys

## Next Steps

1. Set up your EmailJS account (5 minutes)
2. Update the three IDs in contact.html
3. Test the form
4. Start receiving emails from your website!

The form will send professional emails with all the client information directly to nexlifytech@gmail.com.
