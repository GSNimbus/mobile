import { Text, View } from 'react-native'
import { previsaoResponse } from '../../../../util/interfaces';
import { Ionicons } from '@expo/vector-icons';
import Previsoes from '../Previsoes/Previsoes';


interface propsPrevisaoPrincipal{
    previsao: previsaoResponse
}
export default function PrevisãoPrincipal(props: propsPrevisaoPrincipal) {
    
    return (
        <View style={{flex:1, gap:30,alignItems:'center',flexDirection:'column'}}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Ionicons name="cloud-outline" size={220} color="#fff" />
                <Text style={{color:'#fff',fontSize:24}}>{props.previsao.cidade}</Text>
                <Text style={{fontSize:56,color:'#fff',fontWeight:700}}>{props.previsao.graus}°</Text>
                <Text style={{color:'#fff',fontSize:28}}>{new Date(props.previsao.data).toLocaleDateString()}</Text>
            </View>
        </View>
    )
}
