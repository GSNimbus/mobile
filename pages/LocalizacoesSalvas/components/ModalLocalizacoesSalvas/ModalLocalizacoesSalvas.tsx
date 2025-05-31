
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import FormularioLocalizacaoSalvas from "../FormularioLocalizacaoSalvas/FormularioLocalizacaoSalvas";
import { userResponse } from "../../../../util/interfaces";



interface ModalLocalizacoesSalvas {
    user:userResponse;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

export default function ModalLocalizacoesSalvas(props: ModalLocalizacoesSalvas) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <View>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%',height:'60%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Adicionar localização</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Botao title="Adicionar localização" action={() => props.setShowModal(!props.showModal)} size="small"/>
                </View>
            </View>
        </View>
        <Modal backdropColor={"#7C94AC"} animationType="slide" visible={props.showModal}>
            <FormularioLocalizacaoSalvas user={props.user}  setShowModal={props.setShowModal} showModal={props.showModal}/>
        </Modal>
    </View>
  )
}
