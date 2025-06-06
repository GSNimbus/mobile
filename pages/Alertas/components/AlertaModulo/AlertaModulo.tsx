import { ParamListBase } from '@react-navigation/native'
import { ListRenderItemInfo, Text, View } from 'react-native'
import { alertaReponse } from '../../../../util/interfaces'
import { useState } from 'react';

export default function AlertaModulo(props: ListRenderItemInfo<alertaReponse>) {
    
    const [color, setColor] = useState<number>(0);

    if (props.item.tipo === "ALTO_RISCO") {
        setColor(0xFF000020); // Red
    }
    else if (props.item.tipo === "MEDIO_RISCO") {
        setColor(0xFFFF0020); // Yellow
    }
    else if (props.item.tipo === "BAIXO_RISCO") {
        setColor(0x00FF0020); // Green
    }
    else if (props.item.tipo === "INDETERMINADO") {
        setColor(0x0000FF20); // Blue
    }
    else {
        setColor(0x00000020); // Gray
    }



    return (
        <View>
            <Text style={{fontSize:24,fontWeight:700}}>{props.item.risco}</Text>
            <Text style={{fontSize:18}}>Descrição: {props.item.risco}</Text>
            <Text style={{fontSize:18}}>Bairro: {props.item.idBairro.nome}</Text>
        </View>
    )
}
