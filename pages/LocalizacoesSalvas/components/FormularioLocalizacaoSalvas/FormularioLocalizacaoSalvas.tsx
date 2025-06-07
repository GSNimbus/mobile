import { Text, ToastAndroid, View } from "react-native";
import InputLabel from "../../../../components/InputArea/InputLabel";
import { useState } from "react";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import axios from "axios";
import { alertaReponse, EnderecoInput, enderecoInterface, GrupoLocalizacaoInput, GrupoLocalizacaoInterface, userResponse, ViacepData } from "../../../../util/interfaces";
import { Ionicons } from "@expo/vector-icons";
import AuthorizedCaller from "../../../../Service/AuthorizedCaller";

interface FormularioLocalizacaoSalvasProps {
    user: number | null;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}


export default function FormularioLocalizacaoSalvas(props: FormularioLocalizacaoSalvasProps) {


    const [nome, setNome] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [numLogradouro, setNumLogradouro] = useState("");
    const authorizedRequest = AuthorizedCaller();

    const postToGpLoc = async () => {
        if (!nome || !cep) {
            ToastAndroid.show("Tipo e descrição são obrigatórios.", ToastAndroid.SHORT);
            return;
        }
        if (cep.length != 8) {
            ToastAndroid.show("CEP inválido.", ToastAndroid.SHORT);
            return;
        }
        const resEndereco = await postToApiEndereco();
        if (!resEndereco) {
            ToastAndroid.show("Erro ao buscar endereço.", ToastAndroid.SHORT);
            return;
        }
        const data: GrupoLocalizacaoInput = {
            nome: nome,
            idEndereco: resEndereco.idEndereco,
            idUsuario: props.user ? props.user : 0
        }
        const res = await authorizedRequest<GrupoLocalizacaoInput>(
            'POST',
            '/grupo-localizacao',
            data
        );
        if (res) {
            ToastAndroid.show("Grupo adicionado com sucesso!", ToastAndroid.SHORT);
            setNome('');
            setCep('');
        } else {
            ToastAndroid.show("Erro ao denunciar alerta.", ToastAndroid.SHORT);
        }

    }

    const postToApiEndereco = async () => {
        try {
            const viacepRes = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (viacepRes.status !== 200 || viacepRes.data.erro) {
                ToastAndroid.show('CEP inválido', ToastAndroid.SHORT);
                return;
            }
            const viaCepData: ViacepData = viacepRes.data;
            const endereco: EnderecoInput = {
                bairro: viaCepData.bairro,
                cep,
                cidade: viaCepData.localidade,
                estado: viaCepData.estado,
                numLogradouro: parseInt(numLogradouro),
                nomeLogradouro: viaCepData.logradouro,
                pais: "Brasil",
            };
            console.log("Dados do endereço:", endereco);
            const data = await authorizedRequest<enderecoInterface>(
                'POST',
                '/endereco/todo',
                endereco
            );
            if (data) {
                return data;
            } else {
                ToastAndroid.show('Erro ao Cadastrar endereço', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
            ToastAndroid.show('Erro ao enviar dados para a API', ToastAndroid.LONG);
        }
    }


    return (
        <View style={{ padding: 20, gap: 20 }}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                <View style={{ width: "50%", borderRadius: 10, padding: 10 }}>
                    <Text style={[styles.whiteText, { fontSize: 32, fontWeight: 500, textAlign: 'left' }]}>Alertas</Text>
                    <View style={{ borderWidth: 1, width: "100%", borderColor: "white" }}></View>

                </View>
                <Ionicons onPress={() => { props.setShowModal(!props.showModal) }} name="close-circle" size={36} color="white" style={{ marginTop: 10 }} />
            </View>
            <InputLabel title="Nome" setValue={setNome} value={nome} placeholder="Escreva o nome da localização" show={false}></InputLabel>
            <InputLabel title="Cep" setValue={setCep} value={cep} placeholder="Escreva o cep" show={false}></InputLabel>
            <InputLabel title="Número de logradouro" value={numLogradouro} setValue={(e) => setNumLogradouro(e)} placeholder="Digite o número de casa" show={false}/>
                <Botao title="Adicionar localização" action={() => { postToGpLoc() }} size="small"></Botao>
            </View>
            )
            
}
