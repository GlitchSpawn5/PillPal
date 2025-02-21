
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const login = async () => {
        const res = await axios.post('http://localhost:5000/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const bookAppointment = async () => {
        const res = await axios.post('http://localhost:5000/book-appointment', {
            userId: user._id,
            date: '2025-03-01',
            doctor: 'Dr. Smith',
        });
        alert(res.data.message);
    };

    const downloadPDF = () => {
        window.open(`http://localhost:5000/generate-pdf/${user._id}`);
    };

    return (
        <div className="container">
            {!user ? (
                <div className="login-box">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="input-field" />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="input-field" />
                    <button onClick={login} className="btn">Login</button>
                </div>
            ) : (
                <div className="dashboard">
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={bookAppointment} className="btn">Book Appointment</button>
                    <button onClick={downloadPDF} className="btn">Download Medical Records</button>
                </div>
            )}
        </div>
    );
}

export default App;
