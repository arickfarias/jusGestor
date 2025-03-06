import React, { useState } from 'react';
import axios from 'axios';
import './QSAManager.css';

const QSAManager = ({ company, onUpdate }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingPartnerId, setEditingPartnerId] = useState(null);
    const [partnerData, setPartnerData] = useState({
        name: '',
        cpf: '',
        participation: '',
        role: ''
    });
    const [saveMessage, setSaveMessage] = useState('');
    const [saveStatus, setSaveStatus] = useState('');

    const showSaveMessage = (message, status) => {
        setSaveMessage(message);
        setSaveStatus(status);
        setTimeout(() => {
            setSaveMessage('');
            setSaveStatus('');
        }, 3000);
    };

    const handleEdit = (partner) => {
        setEditingPartnerId(partner._id);
        setPartnerData({
            name: partner.name,
            cpf: partner.cpf,
            participation: partner.participation,
            role: partner.role
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPartnerId) {
                await axios.put(`http://localhost:5000/api/companies/${company._id}/qsa/${editingPartnerId}`, partnerData);
                showSaveMessage('Sócio atualizado com sucesso!', 'success');
            } else {
                await axios.post(`http://localhost:5000/api/companies/${company._id}/qsa`, partnerData);
                showSaveMessage('Sócio adicionado com sucesso!', 'success');
            }
            setShowForm(false);
            setEditingPartnerId(null);
            setPartnerData({ name: '', cpf: '', participation: '', role: '' });
            onUpdate();
        } catch (error) {
            console.error('Error saving partner:', error);
            const errorMessage = error.response?.data?.error || error.message;
            showSaveMessage(`Erro ao ${editingPartnerId ? 'atualizar' : 'adicionar'} sócio: ${errorMessage}`, 'error');
        }
    };

    const clearForm = () => {
        setPartnerData({ name: '', cpf: '', participation: '', role: '' });
        setEditingPartnerId(null);
        setShowForm(false);
    };

    return (
        <div className="qsa-manager">
            <h3>Quadro Societário</h3>
            {saveMessage && (
                <div className={`save-message ${saveStatus}`}>
                    {saveMessage}
                </div>
            )}

            <div className="partners-list">
                {company.qsa?.map((partner) => (
                    <div key={partner._id} className="partner-card">
                        <div className="partner-info">
                            <h4>{partner.name}</h4>
                            <p><strong>CPF:</strong> {partner.cpf}</p>
                            <p><strong>Participação:</strong> {partner.participation}%</p>
                            <p><strong>Cargo:</strong> {partner.role}</p>
                        </div>
                        <div className="partner-actions">
                            <button 
                                onClick={() => handleEdit(partner)}
                                className="edit-button"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                ))}

                {!showForm && (
                    <button 
                        className="add-partner-button"
                        onClick={() => {
                            setEditingPartnerId(null);
                            setPartnerData({ name: '', cpf: '', participation: '', role: '' });
                            setShowForm(true);
                        }}
                    >
                        + Adicionar Sócio
                    </button>
                )}
            </div>

            {showForm && (
                <div className="partner-form-container">
                    <button 
                        className="close-button"
                        onClick={clearForm}
                    >
                        ×
                    </button>
                    <form onSubmit={handleSubmit} className="partner-form">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={partnerData.name}
                                onChange={(e) => setPartnerData({...partnerData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CPF:</label>
                            <input
                                type="text"
                                value={partnerData.cpf}
                                onChange={(e) => setPartnerData({...partnerData, cpf: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Participação (%):</label>
                            <input
                                type="number"
                                value={partnerData.participation}
                                onChange={(e) => setPartnerData({...partnerData, participation: e.target.value})}
                                required
                                min="0"
                                max="100"
                            />
                        </div>
                        <div className="form-group">
                            <label>Cargo:</label>
                            <input
                                type="text"
                                value={partnerData.role}
                                onChange={(e) => setPartnerData({...partnerData, role: e.target.value})}
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="save-button">
                                {editingPartnerId ? 'Atualizar' : 'Salvar'}
                            </button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={clearForm}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default QSAManager; 