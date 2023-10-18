export interface Student {
  id: string;
  nomeCompleto: string;
  cpf: string;
  matricula: string;
  dataDeNascimento: string;
  nomeDaMae: string;
  enderecoRua: string;
  enderecoBairro: string;
  enderecoCidade: string;
  enderecoEstado: string;
  enderecoNumero: string;
  idade: number;
  serie: string;
  contatoDoResponsavel: string;
  registerDate: string; // ou você pode usar o tipo Date
  updateDate: string;   // ou você pode usar o tipo Date
}