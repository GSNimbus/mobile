import React from 'react'
import { FlatList, View } from 'react-native'
import { alertaReponse } from '../../../../util/interfaces'
import AlertaModulo from '../AlertaModulo/AlertaModulo'


interface listaAlertaProps{
    listaAlerta: alertaReponse[]
}

export default function ListaAlerta(props: listaAlertaProps) {
    return (
        <View>
            <FlatList data={props.listaAlerta} renderItem={AlertaModulo}/>
        </View>
    )
}
