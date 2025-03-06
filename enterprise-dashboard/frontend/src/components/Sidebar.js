const Sidebar = ({ onOptionClick }) => {
    const buttons = [
        { id: 'painel', label: 'Painel' },
        { id: 'movimentacoes', label: 'Movimentações' },
        { id: 'obrigacoes_acessorias', label: 'Obrigações Acessórias' },
        { id: 'relatorios', label: 'Relatórios' },
        { id: 'gestao_bi', label: 'Gestão (BI)' },
        { id: 'area_socio', label: 'Área do Sócio' },
        { id: 'rh_pessoal', label: 'RH (Pessoal)' },
        { id: 'modulo_contratos', label: 'Módulo de Contratos' }
    ];

    return (
        <div className="sidebar">
            <h2>Menu</h2>
            {buttons.map(btn => (
                <button key={btn.id} onClick={() => onOptionClick(btn.id)}>
                    {btn.label}
                </button>
            ))}
        </div>
    );
};

export default Sidebar;