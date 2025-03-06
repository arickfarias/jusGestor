import React, { createContext, useState, useContext } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companies, setCompanies] = useState([]);

    const value = {
        selectedCompany,
        setSelectedCompany,
        companies,
        setCompanies
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
}; 