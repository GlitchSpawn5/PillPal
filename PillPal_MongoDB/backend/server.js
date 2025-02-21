
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pdfkit = require('pdfkit');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    medicalRecords: Array,
    appointments: Array,
});

const User = mongoose.model('User', userSchema);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/book-appointment', async (req, res) => {
    const { userId, date, doctor } = req.body;
    const user = await User.findById(userId);
    if (user) {
        user.appointments.push({ date, doctor });
        await user.save();
        transporter.sendMail({
            to: user.email,
            subject: 'Appointment Confirmation',
            text: `Your appointment with ${doctor} is scheduled for ${date}.`,
        });
        res.json({ message: 'Appointment booked successfully!' });
    } else {
        res.status(400).json({ message: 'User not found' });
    }
});

app.get('/generate-pdf/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const doc = new pdfkit();
    res.setHeader('Content-Disposition', 'attachment; filename=medical_record.pdf');
    doc.pipe(res);
    doc.text(`Medical Records for ${user.name}`);
    user.medicalRecords.forEach((record, index) => {
        doc.text(`${index + 1}. ${record}`);
    });
    doc.end();
});

app.listen(5000, () => console.log('Server running on port 5000'));
