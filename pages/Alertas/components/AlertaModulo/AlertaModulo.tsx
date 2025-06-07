import { ParamListBase } from '@react-navigation/native'
import { ColorValue, ListRenderItemInfo, Text, View } from 'react-native'
import { alertaReponse } from '../../../../util/interfaces'
import { useState } from 'react';

export default function AlertaModulo(props: ListRenderItemInfo<alertaReponse>) {
    
    let color: ColorValue = "#cccccc33"; 
    let borderColor: ColorValue = "#888"; 

    if (props.item.tipo === "ALTO_RISCO") {
        color = "#ff000033"; // Vermelho translúcido
        borderColor = "#ff0000";
    } else if (props.item.tipo === "MEDIO_RISCO") {
        color = "#fff70033"; // Amarelo translúcido
        borderColor = "#fff700";
    } else if (props.item.tipo === "BAIXO_RISCO") {
        color = "#00ff0033"; // Verde translúcido
        borderColor = "#00c853";
    } else if (props.item.tipo === "INDETERMINADO") {
        color = "#2196f333"; // Azul translúcido
        borderColor = "#2196f3";
    }



    return (
        <View
            style={{
                backgroundColor: color,
                marginVertical: 8,
                marginHorizontal: 16,
                padding: 18,
                borderRadius: 14,
                borderLeftWidth: 8,
                borderLeftColor: borderColor,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.18,
                shadowRadius: 4,
                elevation: 4,
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
                {props.item.risco}
            </Text>
            <Text style={{ fontSize: 16, color: "#fff", marginBottom: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>
                {props.item.risco}
            </Text>
            <Text style={{ fontSize: 16, color: "#fff" }}>
                <Text style={{ fontWeight: 'bold' }}>Bairro: </Text>
                {props.item.idBairro.nome}
            </Text>
        </View>
    )
}
