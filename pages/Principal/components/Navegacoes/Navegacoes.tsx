import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, View } from 'react-native'
import { RootStackParamList } from '../../../../util/types';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Navegacoes() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Principal'>>();
    return (
        <View style={[{justifyContent:'space-between',paddingHorizontal:25,flexDirection:'row',alignItems:'center',paddingTop:20}]}>
            <Pressable onPress={() => navigation.navigate('Alertas')}>
                <Ionicons name="cloud" size={28} color="#fff" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('LocalizacoesSalvas')}>
                <Ionicons name="person" size={28} color="#fff" />
            </Pressable>
        </View>
    )
}
