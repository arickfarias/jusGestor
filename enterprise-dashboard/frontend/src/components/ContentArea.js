import React from 'react';
import CompanyList from './CompanyList';
import Movimentacoes from './Movimentacoes';
import { useCompany } from '../context/CompanyContext';

const ContentArea = ({ selectedOption }) => {
    const { selectedCompany } = useCompany();

    // Function to render content based on the selected option
    const renderContent = () => {
        switch (selectedOption) {
            case 'painel':
                return (
                    <div>
                        <CompanyList />
                    </div>
                );
            case 'movimentacoes':
                return <Movimentacoes />;
            case 'relatorios':
                return (
                    <div className="no-company-selected">
                        <h2>Relatórios</h2>
                        {!selectedCompany ? (
                            <p>Selecione uma empresa no painel para visualizar os relatórios.</p>
                        ) : (
                            <p>Relatórios da empresa {selectedCompany.name}</p>
                        )}
                    </div>
                );
            case 'configuracoes':
                return (
                    <div className="no-company-selected">
                        <h2>Configurações</h2>
                        {!selectedCompany ? (
                            <p>Selecione uma empresa no painel para ajustar as configurações.</p>
                        ) : (
                            <p>Configurações da empresa {selectedCompany.name}</p>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="welcome-message">
                        <h2>Bem-vindo ao Painel Empresarial</h2>
                        <p>Selecione uma opção no menu para começar.</p>
                    </div>
                );
        }
    };

    return (
        <div className="content-area">
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ContentArea;