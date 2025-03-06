import React from 'react';
import CompanyInfo from './CompanyInfo'; // Ensure this path is correct

const ContentArea = ({ selectedOption }) => {
    // Function to render content based on the selected option
    const renderContent = () => {
        switch (selectedOption) {
            case 'painel':
                return (
                    <div>
                        <CompanyInfo /> {/* Add CompanyInfo here */}
                        <div>Painel Content</div>
                    </div>
                );
            case 'movimentacoes':
                return <div>Movimentações Content</div>;
            // Other cases...
            default:
                return <div>Selecione uma opção no menu para visualizar o conteúdo.</div>;
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