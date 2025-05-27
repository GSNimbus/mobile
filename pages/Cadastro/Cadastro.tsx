import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import FormularioCadastro from "./components/FormularioCadastro";



export default function Cadastro() {
  return (
    <ScrollView contentContainerStyle={{alignItems:'center', gap:50, paddingBottom: 40, backgroundColor:'#7C94AC'}}>
        <View style={[styles.container_center,{paddingTop:30,gap:20,width:'100%'}]}>
            <View style={{alignItems:'center'}}>
                <Image style={{width:200,height:150}} source={require("../../assets/nuvemNimbus.png")}></Image>
            </View>
            <View style={{justifyContent:'flex-start',paddingHorizontal:20,gap:10, width:'100%'}}>
                <Text style={[styles.whiteText,{fontSize:32,fontWeight:500,textAlign:'left'}]}>Cadastro</Text>
                <View style={{borderWidth:1,width:"60%",borderColor:"white"}}></View>
            </View>
            <View style={{width:'100%',alignItems:'center'}}>
                <FormularioCadastro />
            </View>
        </View>
    </ScrollView>
  )
}
