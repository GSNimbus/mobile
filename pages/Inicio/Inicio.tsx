import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import Botao from "../../components/Botao/Botao";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/types';

export default function Inicio({ navigation }: NativeStackScreenProps<RootStackParamList, 'Inicio'>) {

    return (
        <View style={[styles.container_center,{paddingTop:30,gap:100}]}>
            <View style={{alignItems:'center'}}>
                <Image style={{width:200,height:150}} source={require("../../assets/nuvemNimbus.png")}></Image>
                <Text style={{fontSize:46,color:'white',fontStyle:'italic',fontWeight:300}}>Nimbus</Text>
            </View>
            <View style={{flex:1,alignItems:'center',gap:10}}>
                <Text style={{fontSize:24,color:'white',fontStyle:'italic',fontWeight:300}}>Seja bem-vindo</Text>
                <Text style={{textAlign:"center",color:'white'}}>A sua segurança em primeiro lugar: previsão e alerta de desastres naturais em tempo real.</Text>
            </View>
            <View style={{flex:1,alignItems:'center',gap:10}}>
                <Botao title="Login com Email" size="medium" action={()=>{
                    navigation?.popTo("Login");
                }}></Botao>
                <View style={{flexDirection:"row",gap:5}}>
                    <Text style={[styles.whiteText]}>Não possui conta?</Text>
                    <Pressable onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={[styles.whiteText,{fontWeight:700}]}>Clique aqui</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
