
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import FormularioLocalizacaoSalvas from "../FormularioLocalizacaoSalvas/FormularioLocalizacaoSalvas";
import { enderecoInterface, userResponse } from "../../../../util/interfaces";
import { Ionicons } from "@expo/vector-icons";
import FormularioMudaGp from "../FormularioMudaGp/FormularioLocalizacaoSalvas";



interface ModalLocalizacoesSalvas {
    user:number;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    idGrupo : number;
    endereco: number;
}

export default function ModalAlteraGP(props: ModalLocalizacoesSalvas) {
  return (
    <View style={{}}>
        <View>
            <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable onPress={() => props.setShowModal(!props.showModal)}>
                        <Ionicons name="pencil-sharp" size={24} color="#fff"/>
                    </Pressable>
                </View>
            </View>
        </View>
        <Modal backdropColor={"#7C94AC"} animationType="slide" visible={props.showModal}>
            <FormularioMudaGp user={props.user} endereco={props.endereco} idGrupo={props.idGrupo}  setShowModal={props.setShowModal} showModal={props.showModal}/>
        </Modal>
    </View>
  )
}
