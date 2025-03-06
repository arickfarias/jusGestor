import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useCompany } from '../context/CompanyContext';
import CompanyCard from './CompanyCard';
import './CompanyList.css';

const CompanyList = () => {
    const { companies, setCompanies, selectedCompany, setSelectedCompany } = useCompany();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        cnpj: '',
        address: ''
    });

    const fetchCompanies = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/companies');
            setCompanies(response.data);
            if (response.data.length === 0) {
                setShowRegistrationForm(true);
            }
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    }, [setCompanies]);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/companies', formData);
            setFormData({ name: '', cnpj: '', address: '' });
            setShowRegistrationForm(false);
            fetchCompanies();
        } catch (error) {
            console.error('Error registering company:', error);
        }
    };

    const handleAddCompany = () => {
        setShowRegistrationForm(true);
        setFormData({ name: '', cnpj: '', address: '' });
    };

    return (
        <div className="company-list">
            <div className="company-list-header">
                <h2>Empresas Cadastradas</h2>
            </div>
            
            {showRegistrationForm && (
                <div className="registration-form">
                    <div className="form-header">
                        <h3>Cadastrar Nova Empresa</h3>
                        {companies.length > 0 && (
                            <button 
                                onClick={() => setShowRegistrationForm(false)}
                                className="close-form-button"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CNPJ:</label>
                            <input
                                type="text"
                                name="cnpj"
                                value={formData.cnpj}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Endereço:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Cadastrar</button>
                    </form>
                </div>
            )}

            <div className="companies-container">
                {!showRegistrationForm && (
                    <button onClick={handleAddCompany} className="add-company-button">
                        + Adicionar Empresa
                    </button>
                )}
                
                {companies.length > 0 && (
                    <div className="companies-grid">
                        {companies.map(company => (
                            <CompanyCard
                                key={company._id}
                                company={company}
                                onUpdate={fetchCompanies}
                                selected={selectedCompany?._id === company._id}
                                onSelect={setSelectedCompany}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyList; 