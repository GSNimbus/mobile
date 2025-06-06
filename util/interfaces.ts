
export interface ViacepData{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado : string;
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
    username: string;
    email: string;
    password: string;
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface GrupoLocalizacaoInterface {
    id : number;
    nome : string;
    endereco : enderecoInterface;
    usuario : userResponse;
}

export interface GrupoLocalizacaoInput {
    nome : string;
    idEndereco : number;
    idUsuario : number;
}

export interface enderecoInterface{
    idEndereco: number;
    cep: string;
    idBairro:bairroInterface;
    nmLogradouro: string;
    nrLogradouro: number;
}

export interface EnderecoInput {
    cep : string;
    nomeLogradouro: string;
    numLogradouro: number;
    bairro : string;
    cidade : string;
    estado : string;
    pais : string;
}


export interface bairroInterface{
    id: number;
    nome: string;
    idCidade: cidadeInterface;
    idLocalizacao : localizacaoResponse
}

export interface cidadeInterface{
    idCidade: number;
    nmCidade: string;
    idEstado: estadoInterface;
}
export interface estadoInterface{
    idEstado: number;
    nmEstado: string;
    idPais: paisInterface;
}
export interface paisInterface{
    idPais: number;
    nmPais: string;
}


export interface alertaReponse{
    id_alerta:number;
    ds_risco:string;
    ds_tipo:number;
    horario_alerta:Date;
    id_localizacao:localizacaoResponse;
}

export interface localizacaoResponse{
    id:number;
    longitude:number;
    latitude:number;
}

export interface localizacaoSalvasResponse {
    id_localizacao_salva:number;
    nome:string;
    id_bairro: enderecoInterface;
    id_usuario: userResponse;
}

export interface localizacaoSalvasAlertaResponse extends localizacaoSalvasResponse {
    alerta: alertaReponse[];
}


