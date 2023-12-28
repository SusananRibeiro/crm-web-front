export interface RegistroDeInteracoes {
    id: number,
    dataDaInteracao: Date,
    canalDeComunicacao: string, // ex: telefone, e-mail, chat online, pessoalmente ou por outro meio
    responsavelPelaInteracao: string,
    descricao: string,
    statusDaInterferencia: string // RESOLVIDA, ENCAMINHADA_PARA_OUTRO_DEPARTAMENTO, REQUER_ACOMPANHAMENTO;
}