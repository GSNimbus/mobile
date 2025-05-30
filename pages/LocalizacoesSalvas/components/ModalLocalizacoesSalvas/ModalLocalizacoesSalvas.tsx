
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "../../../../styles/styles";
import Botao from "../../../../components/Botao/Botao";
import FormularioLocalizacaoSalvas from "../FormularioLocalizacaoSalvas/FormularioLocalizacaoSalvas";



interface ModalLocalizacoesSalvas {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

export default function ModalLocalizacoesSalvas(props: ModalLocalizacoesSalvas) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%',height:'80%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Adicionar localização</Text>
                <View style={{width:"80%", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Botao title="Adicionar localização" action={() => props.setShowModal(!props.showModal)} size="medium"/>
                </View>
            </View>
        </View>
        <Modal backdropColor={"#7C94AC"} animationType="slide" visible={props.showModal}>
            <FormularioLocalizacaoSalvas  setShowModal={props.setShowModal} showModal={props.showModal}/>
        </Modal>
    </View>
  )
}
