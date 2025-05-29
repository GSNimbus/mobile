import { Modal, Pressable, Text } from "react-native";
import { View } from "react-native";
import { styles } from "../../../../styles/styles";
import FormularioDenuncia from "../FormularioDenuncia/FormularioDenuncia";


interface ModalDenunciarProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

export default function ModalDenunciar(props: ModalDenunciarProps) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%',height:'80%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Denunciar Alerta</Text>
                <Text style={{ marginBottom: 20, textAlign:"center" }}>Você tem certeza que deseja denunciar este alerta?</Text>
                <View style={{width:"80%", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable onPress={() => props.setShowModal(!props.showModal)} style={{ padding: 10, backgroundColor: '#f00', borderRadius: 5 }}>
                        <Text style={{ color: '#fff' }}>Denunciar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        <Modal backdropColor={"#7C94AC"} animationType="slide" visible={props.showModal}>
            <FormularioDenuncia  setShowModal={props.setShowModal} showModal={props.showModal}/>
        </Modal>
    </View>
  )
}
