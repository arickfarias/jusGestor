import React, { useState } from 'react';
import axios from 'axios';
import CNAESelector from './CNAESelector';
import './TaxProfileEditor.css';

const TaxProfileEditor = ({ company, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [taxData, setTaxData] = useState(company.taxProfile || {
        regime: '',
        category: '',
        mainActivity: ''
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

    const clearForm = () => {
        setTaxData({
            regime: '',
            category: '',
            mainActivity: ''
        });
        setEditing(false);
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja remover o perfil tributário?')) {
            try {
                await axios.delete(`http://localhost:5000/api/companies/${company._id}/tax-profile`);
                clearForm();
                showSaveMessage('Perfil tributário removido com sucesso!', 'success');
                onUpdate();
            } catch (error) {
                console.error('Error deleting tax profile:', error);
                const errorMessage = error.response?.status === 404 
                    ? 'Empresa não encontrada. Por favor, recarregue a página.'
                    : error.response?.data?.error || error.message;
                showSaveMessage('Erro ao remover perfil tributário: ' + errorMessage, 'error');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/companies/${company._id}/tax-profile`, taxData);
            setEditing(false);
            showSaveMessage('Perfil tributário salvo com sucesso!', 'success');
            onUpdate();
        } catch (error) {
            console.error('Error updating tax profile:', error);
            const errorMessage = error.response?.status === 404 
                ? 'Empresa não encontrada. Por favor, recarregue a página.'
                : error.response?.data?.error || error.message;
            showSaveMessage('Erro ao salvar perfil tributário: ' + errorMessage, 'error');
        }
    };

    return (
        <div className="tax-profile-editor">
            <h3>Perfil de Tributação</h3>
            {saveMessage && (
                <div className={`save-message ${saveStatus}`}>
                    {saveMessage}
                </div>
            )}
            
            {editing ? (
                <div className="tax-form-container">
                    <button 
                        className="close-button"
                        onClick={clearForm}
                    >
                        ×
                    </button>
                    <form onSubmit={handleSubmit} className="tax-form">
                        <div className="form-group">
                            <label>Regime Tributário:</label>
                            <select
                                value={taxData.regime}
                                onChange={(e) => setTaxData({...taxData, regime: e.target.value})}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="Simples Nacional">Simples Nacional</option>
                                <option value="Lucro Presumido">Lucro Presumido</option>
                                <option value="Lucro Real">Lucro Real</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Categoria:</label>
                            <input
                                type="text"
                                value={taxData.category}
                                onChange={(e) => setTaxData({...taxData, category: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Atividade Principal:</label>
                            <CNAESelector
                                value={taxData.mainActivity}
                                onChange={(value) => setTaxData({...taxData, mainActivity: value})}
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="save-button">Salvar</button>
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
            ) : (
                <div className="tax-profile-display">
                    {company.taxProfile ? (
                        <>
                            <button 
                                onClick={handleDelete}
                                className="delete-button"
                                title="Remover perfil tributário"
                            >
                                ×
                            </button>
                            <p><strong>Regime:</strong> {company.taxProfile.regime}</p>
                            <p><strong>Categoria:</strong> {company.taxProfile.category}</p>
                            <p><strong>Atividade Principal:</strong> {company.taxProfile.mainActivity}</p>
                            <button 
                                onClick={() => setEditing(true)}
                                className="edit-button"
                            >
                                Editar
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setEditing(true)}
                            className="add-button"
                        >
                            + Adicionar Perfil Tributário
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaxProfileEditor; 