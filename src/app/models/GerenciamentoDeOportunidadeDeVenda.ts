import { Cliente } from './Cliente';
export interface GerenciamentoDeOportunidadeDeVenda {
    id: number,
    estagioDaOportunidade: string, // PROSPECT, QUALIFICACAO, PROPOSTA, FECHAMENTO;
    valorEstimadoDaVenda: number,
    clienteId: Cliente
}