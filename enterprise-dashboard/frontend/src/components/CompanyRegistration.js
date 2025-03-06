import React, { useState } from 'react';
import axios from 'axios';
import './CompanyRegistration.css';

const CompanyRegistration = ({ onRegister }) => {
    const [companyData, setCompanyData] = useState({
        name: '',
        cnpj: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const response = await axios.post('http://localhost:5000/api/companies', companyData);
            onRegister(response.data);
            setCompanyData({ name: '', cnpj: '', address: '' });
            setSuccess('Empresa cadastrada com sucesso!');
        } catch (error) {
            console.error('Error registering company:', error);
            setError(error.response?.data?.message || 'Erro ao cadastrar empresa. Por favor, tente novamente.');
        }
    };

    return (
        <div className="company-registration">
            <h2>Registro da Empresa</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome da Empresa</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={companyData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cnpj">CNPJ</label>
                    <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        value={companyData.cnpj}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Endereço</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={companyData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Registrar</button>
            </form>
        </div>
    );
};

export default CompanyRegistration;