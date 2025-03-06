import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import Login from './components/Login';
import Header from './components/Header';
import { CompanyProvider } from './context/CompanyContext';
import './style.css';

const Dashboard = ({ onLogout }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="app-container">
            <Header onLogout={onLogout} />
            <div className="outer-container">
                <Sidebar onOptionClick={handleOptionClick} />
                <div className="content-area">
                    <ContentArea selectedOption={selectedOption} />
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <CompanyProvider>
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/dashboard"
                    element={
                        token ? (
                            <Dashboard onLogout={handleLogout} />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />
            </Routes>
        </CompanyProvider>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;