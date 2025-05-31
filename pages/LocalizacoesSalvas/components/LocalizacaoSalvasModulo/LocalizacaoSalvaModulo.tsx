import { ParamListBase } from '@react-navigation/native'
import { ListRenderItemInfo, Text, View } from 'react-native'
import { alertaReponse, localizacaoSalvasAlertaResponse, localizacaoSalvasResponse } from '../../../../util/interfaces'
import { useState } from 'react';

export default function LocalizacaoSalvaModulo(props: localizacaoSalvasAlertaResponse) {
    return (
        <View>
            {props.alerta.map((alerta: alertaReponse, index: number) => {
                const bgColor =
                    alerta.ds_tipo === 1
                        ? '#FF000020' 
                        : alerta.ds_tipo === 2
                        ? '#FFFF0020' 
                        : alerta.ds_tipo === 3
                        ? '#00FF0020' 
                        : '#888';   

                return (
                    <View key={index} style={{ backgroundColor: bgColor, padding: 10, margin: 5 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize:18 }}>{props.nome}</Text>
                        <Text style={{ color: '#fff' }}>{alerta.ds_risco}</Text>
                        <Text style={{ color: '#fff' }}>{alerta.ds_tipo}</Text>
                        <Text style={{ color: '#fff' }}>{new Date(alerta.horario_alerta).toLocaleString()}</Text>
                    </View>
                );
            })}
        </View>
    )
}