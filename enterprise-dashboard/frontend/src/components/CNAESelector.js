import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './CNAESelector.css';

const CNAESelector = ({ value, onChange }) => {
    const [cnaes, setCnaes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCnae, setSelectedCnae] = useState(value || '');
    const [filteredCnaes, setFilteredCnaes] = useState([]);
    const [error, setError] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchCNAEs = async () => {
            try {
                console.log('Fetching CNAEs...');
                const response = await axios.get('https://servicodados.ibge.gov.br/api/v2/cnae/classes', {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const formattedCnaes = response.data.map(cnae => ({
                    codigo: cnae.id,
                    descricao: cnae.descricao,
                    displayValue: `${cnae.id} - ${cnae.descricao}`
                }));
                
                setCnaes(formattedCnaes);
                setFilteredCnaes(formattedCnaes);
                setLoading(false);
            } catch (error) {
                console.error('Error details:', error.response || error);
                setError('Erro ao carregar CNAEs. Por favor, tente novamente.');
                setLoading(false);
            }
        };

        fetchCNAEs();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCnaes(cnaes);
            return;
        }

        const searchLower = searchTerm.toLowerCase();
        const filtered = cnaes.filter(cnae => 
            cnae.descricao.toLowerCase().includes(searchLower) ||
            cnae.codigo.toString().includes(searchTerm) ||
            cnae.displayValue.toLowerCase().includes(searchLower)
        );
        setFilteredCnaes(filtered);
    }, [searchTerm, cnaes]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setSelectedCnae('');
        onChange('');
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (cnae) => {
        setSelectedCnae(cnae.displayValue);
        setSearchTerm(cnae.displayValue);
        onChange(cnae.displayValue);
        setShowSuggestions(false);
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedCnae(value);
        setSearchTerm(value);
        onChange(value);
    };

    if (loading) return <div>Carregando CNAEs...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="cnae-selector" ref={wrapperRef}>
            <div className="cnae-search-container">
                <input
                    type="text"
                    placeholder="Digite o código ou descrição do CNAE..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    className="cnae-search"
                />
                {showSuggestions && filteredCnaes.length > 0 && searchTerm && !selectedCnae && (
                    <div className="suggestions-dropdown">
                        {filteredCnaes.slice(0, 10).map(cnae => (
                            <div
                                key={cnae.codigo}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(cnae)}
                            >
                                <span className="suggestion-code">{cnae.codigo}</span>
                                <span className="suggestion-description">{cnae.descricao}</span>
                            </div>
                        ))}
                        {filteredCnaes.length > 10 && (
                            <div className="suggestion-item more-results">
                                + {filteredCnaes.length - 10} mais resultados...
                            </div>
                        )}
                    </div>
                )}
            </div>
            <select
                value={selectedCnae}
                onChange={handleSelectChange}
                className="cnae-select"
                required
            >
                <option value="">Selecione um CNAE</option>
                {filteredCnaes.map(cnae => (
                    <option key={cnae.codigo} value={cnae.displayValue}>
                        {cnae.displayValue}
                    </option>
                ))}
            </select>
            {filteredCnaes.length === 0 && searchTerm && !selectedCnae && (
                <div className="no-results">Nenhum CNAE encontrado para "{searchTerm}"</div>
            )}
        </div>
    );
};

export default CNAESelector; 