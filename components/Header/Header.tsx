import {  Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { styles } from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../util/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export default function Header() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
    return (
        <View style={[{justifyContent:'space-between',paddingHorizontal:25,flexDirection:'row',alignItems:'center',paddingTop:20}]}>
            <Pressable onPress={() => navigation.navigate('Principal')}>
                <Ionicons name="cloud" size={28} color="#fff" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Perfil')}>
                <Ionicons name="person" size={28} color="#fff" />
            </Pressable>
        </View>
    )
}
