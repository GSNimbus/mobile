
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
    id: number;
    nome: string;
    email: string;
    senha: string;
    endereco: enderecoInterface;
}

export interface enderecoInterface{
    id: number;
    cep: string;
    nomeBairro:string;
    logradouro: string;
    cidade: number;
}

export interface cidadeInterface{
    id: number;
    nome: string;
    estado: number;
}
export interface estadoInterface{
    id: number;
    nome: string;
    pais: number;
}
export interface paisInterface{
    id: number;
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

export interface localizacaoSalvasResponse {
    id_localizacao_salva:number;
    nome:string;
    id_bairro: enderecoInterface;
    id_usuario: userResponse;
}