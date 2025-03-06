import React from 'react';
import './Header.css';

const Header = ({ onLogout }) => {
    return (
        <header className="header">
            <div className="header-content">
                <h1>Painel Empresarial</h1>
                <button onClick={onLogout} className="logout-button">
                    Sair
                </button>
            </div>
        </header>
    );
};

export default Header; 