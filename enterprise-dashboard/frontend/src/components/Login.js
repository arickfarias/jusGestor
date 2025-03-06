import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios';
import './Login.css'; // Optional: Add styles for the login page

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Mock validation logic
            if (credentials.email === 'arickfarias@gmail.com' && credentials.password === '290528') {
                const mockResponse = {
                    data: {
                        token: 'mock-token', // Simulate a token
                        user: {
                            email: credentials.email,
                            name: 'Arick Farias' // Simulate user data
                        }
                    }
                };
    
                // Simulate a delay to mimic network request
                await new Promise((resolve) => setTimeout(resolve, 1000));
    
                // Use the mock response
                onLogin(mockResponse.data); // Pass the mock user data to the parent component
                navigate('/dashboard'); // Redirect to the dashboard after login
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Invalid email or password');
        }

    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;