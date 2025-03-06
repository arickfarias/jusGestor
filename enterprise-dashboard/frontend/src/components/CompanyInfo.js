import React from 'react';

const CompanyInfo = ({ companyData }) => {
    // Check if companyData is defined
    if (!companyData) {
        return <div>Nenhuma informação da empresa disponível.</div>;
    }

    return (
        <div className="company-info">
            <h2>Informações da Empresa</h2>
            <p><strong>Nome:</strong> {companyData.name}</p>
            <p><strong>CNPJ:</strong> {companyData.cnpj}</p>
            <p><strong>Endereço:</strong> {companyData.address}</p>
        </div>
    );
};

export default CompanyInfo;