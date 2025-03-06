import React from 'react';
import { useCompany } from '../context/CompanyContext';
import './Movimentacoes.css';

const Movimentacoes = () => {
    const { selectedCompany } = useCompany();

    if (!selectedCompany) {
        return (
            <div className="no-company-selected">
                <h2>Nenhuma empresa selecionada</h2>
                <p>Por favor, selecione uma empresa no painel para visualizar suas movimentações.</p>
            </div>
        );
    }

    return (
        <div className="movimentacoes">
            <h2>Movimentações - {selectedCompany.name}</h2>
            <div className="movimentacoes-content">
                <div className="summary-cards">
                    <div className="summary-card">
                        <h3>Entradas</h3>
                        <p className="amount positive">R$ 50.000,00</p>
                    </div>
                    <div className="summary-card">
                        <h3>Saídas</h3>
                        <p className="amount negative">R$ 30.000,00</p>
                    </div>
                    <div className="summary-card">
                        <h3>Saldo</h3>
                        <p className="amount">R$ 20.000,00</p>
                    </div>
                </div>

                <div className="transactions-list">
                    <h3>Últimas Transações</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10/03/2024</td>
                                <td>Venda de Produtos</td>
                                <td className="type-entrada">Entrada</td>
                                <td className="amount positive">R$ 15.000,00</td>
                            </tr>
                            <tr>
                                <td>09/03/2024</td>
                                <td>Pagamento Fornecedor</td>
                                <td className="type-saida">Saída</td>
                                <td className="amount negative">R$ 8.000,00</td>
                            </tr>
                            {/* Add more transaction rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Movimentacoes; 