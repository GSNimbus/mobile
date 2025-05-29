export interface viacep{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export interface previsaoResponse{
    graus: string;
    cidade: string;
    data: Date;
}

export interface userResponse{
    id: string;
    nome: string;
    email: string;
    senha: string;
    endereco: enderecoInterface;
}

export interface enderecoInterface{
    id: string;
    cep: string;
    logradouro: string;
    cidade: cidadeInterface;
}

export interface cidadeInterface{
    id: string;
    nome: string;
    estado: estadoInterface;
}
export interface estadoInterface{
    id: string;
    nome: string;
    pais: paisInterface;
}
export interface paisInterface{
    id: string;
    nome: string;
}