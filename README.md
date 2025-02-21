PillPal - Student Healthcare Management System
Overview
PillPal is a secure, user-friendly, and scalable healthcare management system designed for students. It enables seamless access to medical records, appointment scheduling, and document generation, ensuring an enhanced healthcare experience.

The system is built using Node.js (Express.js) for the backend, React.js for the frontend, and MySQL for database management, replacing MongoDB for better relational data structuring and security.

Key Features
1. Secure Health Records Management 🏥
Stores comprehensive student medical records, including prescriptions, diagnostic reports, and doctor consultations.
Secure login using JWT authentication ensures privacy.
Users can search and filter medical history based on doctor names, diagnosis, or treatment dates.
2. Appointment Booking & Management 📅
Students can book, reschedule, or cancel appointments online.
Automated email notifications for appointment confirmations, reminders, and updates.
Doctors can manage their availability through the admin panel.
3. Automated Medical Documentation 📜
Students can generate official medical certificates or leave permissions by selecting specific time periods or conditions.
Documents can be downloaded as PDFs for submission to schools or workplaces.
4. Notifications & Reminders 🔔
Email and SMS notifications for:
Upcoming appointments
Vaccination schedules
Prescription refill reminders
Medical report availability
5. Mobile & Web Compatibility 📱💻
Fully responsive UI that works seamlessly on desktops, tablets, and smartphones.
Clean, modern, and user-friendly interface with easy navigation.
Technology Stack
Component	Technology Used
Frontend	React.js (Vite for fast builds)
Backend	Node.js + Express.js
Database	MySQL (Relational Data Management)
Authentication	JWT (JSON Web Token)
Email Service	Nodemailer (for sending notifications)
PDF Generation	PDFKit (for medical records & documents)
Styling	Tailwind CSS / Bootstrap
Deployment	Can be hosted on Vercel (Frontend) and AWS/DigitalOcean (Backend & Database)
Security Features 🔒
User authentication: JWT-based secure login system.
Data encryption: Sensitive medical data is encrypted in the database.
Access control: Only authorized users can view and manage personal records.
Secure communication: HTTPS and SSL encryption for safe data transmission.
