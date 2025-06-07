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
    user: number
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    idGrupo: number;
    endereco: number;
}


export default function FormularioMudaGp(props: FormularioLocalizacaoSalvasProps) {


    const [nome, setNome] = useState<string>('');
    const authorizedRequest = AuthorizedCaller();

    const putToGpLoc = async () => {
        const data: GrupoLocalizacaoInput = {
            nome: nome,
            idEndereco: props.endereco,
            idUsuario: props.user  
        }
        const res = await authorizedRequest<GrupoLocalizacaoInterface>(
            'PUT',
            `/grupo-localizacao/${props.idGrupo}`,
            data
        );
        if (res) {
            ToastAndroid.show("Pessoa adicionada com sucesso!", ToastAndroid.SHORT);
            setNome('');
        } else {
            ToastAndroid.show("Erro ao denunciar alerta.", ToastAndroid.SHORT);
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
            <Botao title="Criar grupo de localização" action={() => { putToGpLoc }} size="small"></Botao>
            </View>
            )
            
}
