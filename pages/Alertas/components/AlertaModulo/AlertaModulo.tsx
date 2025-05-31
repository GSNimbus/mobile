import { ParamListBase } from '@react-navigation/native'
import { ListRenderItemInfo, Text, View } from 'react-native'
import { alertaReponse } from '../../../../util/interfaces'
import { useState } from 'react';

export default function AlertaModulo(props: ListRenderItemInfo<alertaReponse>) {
    
    const [color, setColor] = useState<number>(0);

    if (props.item.id_alerta === 3) {
        setColor(0xFF000020); // Red
    }
    else if (props.item.id_alerta === 2) {
        setColor(0xFFFF0020); // Yellow
    }
    else if (props.item.id_alerta === 1) {
        setColor(0x00FF0020); // Green
    }



    return (
        <View>
            <Text style={{fontSize:24,fontWeight:700}}>{props.item.id_alerta}</Text>
            <Text style={{fontSize:18}}>Descrição: {props.item.ds_risco}</Text>
            <Text style={{fontSize:18}}>Data: {props.item.horario_alerta.toLocaleDateString()}</Text>
        </View>
    )
}
