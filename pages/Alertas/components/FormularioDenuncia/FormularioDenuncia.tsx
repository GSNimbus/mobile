import { Text, ToastAndroid, View } from "react-native";
import InputLabel from "../../../../components/InputArea/InputLabel";
import { useState } from "react";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import axios from "axios";
import { alertaReponse, localizacaoResponse } from "../../../../util/interfaces";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import getCurrentLocation from "../../../../Service/getLocation";
import postToLocalizacao from "../../../../Service/postToLocalizacao";

interface FormularioDenunciaProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}


export default function FormularioDenuncia(props: FormularioDenunciaProps) {
    
    
    const [tipo, setTipo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    
    const postToApiDenuncia = async () => {
        if (!tipo || !descricao) {
            ToastAndroid.show("Tipo e descrição são obrigatórios.",ToastAndroid.SHORT);
            return;
        }
        setLocation(await getCurrentLocation());
        const dataLoc : localizacaoResponse = await postToLocalizacao(location?.coords);
        if (!dataLoc) {
            ToastAndroid.show("Erro ao obter localização atual.", ToastAndroid.SHORT);
            return;
        }
        const data : alertaReponse = {
            id_alerta: 0,
            //precisa fazer a tabela de tipo para arrumar o picker
            ds_tipo: 1,
            ds_risco: descricao,
            horario_alerta: new Date(),
            id_localizacao: dataLoc
        }
        const res = await axios.post('https://nimbus-api.com/api/alertas', data);
        if (res.status === 200) {
            ToastAndroid.show("Alerta denunciado com sucesso!", ToastAndroid.SHORT);
            setTipo('');
            setDescricao('');
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
