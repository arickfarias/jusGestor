import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import QSAManager from './QSAManager';
import TaxProfileEditor from './TaxProfileEditor';
import './CompanyCard.css';

const CompanyCard = ({ company, onUpdate, selected, onSelect }) => {
    const [editingCompany, setEditingCompany] = useState(false);
    const [companyData, setCompanyData] = useState(company);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditingCompany(true);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
            try {
                await axios.delete(`http://localhost:5000/api/companies/${company._id}`);
                onUpdate();
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/companies/${company._id}`, companyData);
            setEditingCompany(false);
            onUpdate();
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleCardClick = (e) => {
        if (!editingCompany) {
            onSelect(company);
        }
    };

    return (
        <div 
            className={`company-card ${selected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
            onClick={handleCardClick}
        >
            <button 
                onClick={handleDelete}
                className="company-delete-button"
                title="Excluir empresa"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            
            {editingCompany ? (
                <form onSubmit={handleSubmit} className="edit-form" onClick={e => e.stopPropagation()}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={companyData.name}
                            onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>CNPJ:</label>
                        <input
                            type="text"
                            value={companyData.cnpj}
                            onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Endereço:</label>
                        <input
                            type="text"
                            value={companyData.address}
                            onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-button">Salvar</button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditingCompany(false);
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="company-info">
                        <h3>{company.name}</h3>
                        <p><strong>CNPJ:</strong> {company.cnpj}</p>
                        <p><strong>Endereço:</strong> {company.address}</p>
                        <button 
                            className="toggle-button"
                            onClick={handleToggle}
                            title={isExpanded ? "Recolher" : "Expandir"}
                        >
                            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                        </button>
                    </div>
                    
                    <div className="expandable-content" onClick={e => e.stopPropagation()}>
                        {selected && (
                            <>
                                <QSAManager company={company} onUpdate={onUpdate} />
                                <TaxProfileEditor company={company} onUpdate={onUpdate} />
                            </>
                        )}

                        <div className="card-actions">
                            <button 
                                onClick={handleEdit}
                                className="edit-button"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CompanyCard; 