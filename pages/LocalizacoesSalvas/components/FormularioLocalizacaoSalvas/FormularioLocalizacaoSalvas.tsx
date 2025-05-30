import { Text, ToastAndroid, View } from "react-native";
import InputLabel from "../../../../components/InputArea/InputLabel";
import { useState } from "react";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import axios from "axios";
import { alertaReponse, enderecoInterface, localizacaoSalvasResponse, userResponse, viacep } from "../../../../util/interfaces";
import { Ionicons } from "@expo/vector-icons";

interface FormularioLocalizacaoSalvasProps {
    user:userResponse
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}


export default function FormularioLocalizacaoSalvas(props: FormularioLocalizacaoSalvasProps) {
    
    
    const [nome, setNome] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    
    const postToApiDenuncia = async () => {
        if (!nome || !cep) {
            ToastAndroid.show("Tipo e descrição são obrigatórios.",ToastAndroid.SHORT);
            return;
        }
        const resEndereco : enderecoInterface  = await postToApiEndereco();
        const data : localizacaoSalvasResponse = {
            id_localizacao_salva: 0,
            nome: nome,
            id_bairro: resEndereco,
            id_usuario: props.user 
        }
        const res = await axios.post('https://nimbus-api.com/api/gploc', data);
        if (res.status === 200) {
            ToastAndroid.show("Pessoa adicionada com sucesso!", ToastAndroid.SHORT);
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
            const viaCepData : viacep = viacepRes.data;
            const data : enderecoInterface ={
                id:0,
                cep:cep,
                nomeBairro: viaCepData.bairro,
                logradouro: viaCepData.logradouro,
                cidade: 0
            }
            const res  = await axios.post('https://api.example.com/endereco', data);
            if (res.status === 200) {
                return res.data as enderecoInterface
            } else {
                ToastAndroid.show('Erro ao Cadastrar endereço', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
            ToastAndroid.show('Erro ao enviar dados para a API', ToastAndroid.LONG);
        }
    }

    
    return (
        <View style={{padding:20, gap:20}}>
            <View style={{flexDirection:'row',gap:10, justifyContent:'space-between'}}>
                <View style={{width:"50%", borderRadius:10,padding:10}}>
                <Text style={[styles.whiteText,{fontSize:32,fontWeight:500,textAlign:'left'}]}>Alertas</Text>
                <View style={{borderWidth:1,width:"100%",borderColor:"white"}}></View>
                
            </View>
                    <Ionicons onPress={()=>{props.setShowModal(!props.showModal)}} name="close-circle" size={36} color="white" style={{marginTop:10}} />
            </View>
            <InputLabel title="Nome" setValue={setNome} value={nome} placeholder="Escreva o nome da localização" show={false}></InputLabel>
            <InputLabel title="Cep" setValue={setCep} value={cep} placeholder="Escreva o cep" show={false}></InputLabel>
            <Botao title="Denunciar Alerta" action={() => {postToApiDenuncia}} size="small"></Botao>
        </View>
    )
}
