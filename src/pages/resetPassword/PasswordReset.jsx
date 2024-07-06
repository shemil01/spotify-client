import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Axios } from '../mainPage/MainPage';

function PasswordReset() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`/reset/${token}`, { password });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PasswordReset;
