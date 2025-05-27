import { Image, Text, View } from "react-native";
import { styles } from "../../styles/styles";
import FormularioLogin from "./components/FormularioLogin";


export default function Login() {
  return (
    <View style={[styles.container,{paddingTop:30,gap:30}]}>
        <View style={{alignItems:'center'}}>
            <Image style={{width:200,height:150}} source={require("../../assets/nuvemNimbus.png")}></Image>
        </View>
        <View style={{justifyContent:'flex-start',paddingHorizontal:20,gap:10}}>
            <Text style={[styles.whiteText,{fontSize:32,fontWeight:500,textAlign:'left'}]}>Login</Text>
            <View style={{borderWidth:1,width:"60%",borderColor:"white"}}></View>
        </View>
        <View>
            <FormularioLogin />
        </View>
    </View>
  )
}
