
// PillPal - Healthcare Management System (Frontend)
import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            {!user ? (
                <div>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={login}>Login</button>
                </div>
            ) : (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={bookAppointment}>Book Appointment</button>
                    <button onClick={downloadPDF}>Download Medical Records</button>
                </div>
            )}
        </div>
    );
}

export default App;
