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
    nomeBairro:string;
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


export interface alertaReponse{
    id_alerta:number;
    ds_risco:string;
    ds_tipo:string;
    horario_alerta:Date;
    id_localizacao:localizacaoResponse;
}

export interface localizacaoResponse{
    id_localizacao:number;
    nr_longitude:number;
    nr_latitude:number;
}