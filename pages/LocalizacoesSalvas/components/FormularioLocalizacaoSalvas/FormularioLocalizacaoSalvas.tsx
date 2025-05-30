import { Text, ToastAndroid, View } from "react-native";
import InputLabel from "../../../../components/InputArea/InputLabel";
import { useState } from "react";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import axios from "axios";
import { alertaReponse, localizacaoSalvasResponse } from "../../../../util/interfaces";
import { Ionicons } from "@expo/vector-icons";

interface FormularioLocalizacaoSalvasProps {
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
        const data : localizacaoSalvasResponse = {
            id_localizacao_salva: 0,
            nome: nome,
            id_bairro: {
                
            },
            id_usuario:{

            }
        }
        const res = await axios.post('https://nimbus-api.com/api/alertas', data);
        if (res.status === 200) {
            ToastAndroid.show("Alerta denunciado com sucesso!", ToastAndroid.SHORT);
            setNome('');
            setNome('');
        } else {
            ToastAndroid.show("Erro ao denunciar alerta.", ToastAndroid.SHORT);
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
            <InputLabel title="Tipo de desastre" setValue={setTipo} value={tipo} placeholder="Escreva o tipo de desastre" show={false}></InputLabel>
            <InputLabel title="Descrição" setValue={setDescricao} value={descricao} placeholder="Escreva uma descrição do alerta" show={false}></InputLabel>
            <Botao title="Denunciar Alerta" action={() => {postToApiDenuncia}} size="small"></Botao>
        </View>
    )
}
