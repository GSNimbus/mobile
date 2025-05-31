
import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { RootStackParamList } from '../../util/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderVoltar() {
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Principal'>>();
    return (
        <View style={{paddingHorizontal:25}}>
            <Pressable onPress={()=>nav.goBack()}>
                <Ionicons name="arrow-back" size={36} color={'#fff'}/>
            </Pressable>
        </View>
    )
}
