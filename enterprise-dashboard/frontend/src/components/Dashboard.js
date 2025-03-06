import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import CompanyRegistration from './CompanyRegistration';
import CompanyInfo from './CompanyInfo';
import axios from 'axios';

const Dashboard = ({ onLogout }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    // Fetch company data from the backend
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/companies');
                if (response.data.length > 0) {
                    setCompanyData(response.data[0]); // Use the first company in the list
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, []);

    // Define the onOptionClick function
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // Handle company registration
    const handleCompanyRegistration = (data) => {
        setCompanyData(data); // Update the company data state
    };

    return (
        <>
            {/* Header with Logout Button */}
            <header style={styles.header}>
                <h1>Dashboard</h1>
                <button onClick={onLogout} style={styles.logoutButton}>
                    <FontAwesomeIcon icon={faPowerOff} /> Logout
                </button>
            </header>

            {/* Outer Container for Sidebar and Content Area */}
            <div className="outer-container">
                <Sidebar onOptionClick={handleOptionClick} />
                <div className="content-area">
                    {selectedOption === 'painel' && (
                        <>
                            <CompanyRegistration onRegister={handleCompanyRegistration} />
                            <CompanyInfo companyData={companyData} />
                        </>
                    )}
                    <ContentArea selectedOption={selectedOption} />
                </div>
            </div>
        </>
    );
};

// Styles for the header and logout button
const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd',
        position: 'fixed', // Fix the header at the top
        top: 0,
        left: 250, // Adjust for the sidebar width
        right: 0,
        zIndex: 1000, // Ensure the header is above other content
    },
    logoutButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#dc3545', // Red color for the logout button
    },
};

export default Dashboard;