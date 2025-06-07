import { ParamListBase, useNavigation } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'
import {  GrupoLocalizacaoInterface, localizacaoSalvasAlertaResponse } from '../../../../util/interfaces'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ModalAlteraGP from '../ModalAlteraGp/ModalLocalizacoesSalvas';
import AuthorizedCaller from '../../../../Service/AuthorizedCaller';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../util/types';

interface localizacaoSalvaModuloProps {
    loc: GrupoLocalizacaoInterface;

}

export default function LocalizacaoSalvaModulo(props: localizacaoSalvaModuloProps) {

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SingleAlert'>>();
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList, "Principal">>();
    const authorizedRequest = AuthorizedCaller();
    const [showModal, setShowModal] = useState(false);
    const apagarGrupo = async () => {
        try {
            // API retorna 204 no-content para DELETE bem sucedido
            await authorizedRequest<void>('DELETE', `/grupo-localizacao/${props.loc.id}`);
            console.log("Grupo apagado com sucesso");
            nav.navigate('Principal');
        } catch (error) {
            console.error('Erro ao apagar grupo:', error);
        }
    }

    const borderColor = "#2196f3";
    const color = "#2196f333";
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
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <Pressable
                style={{ width: "70%", alignItems: 'flex-start' }}
                onPress={() => { navigate.navigate('SingleAlert', { id: props.loc.id, nome: props.loc.nome }) }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
                    {props.loc.nome}
                </Text>
                <Text style={{ fontSize: 16, color: "#fff", marginBottom: 2 }}>
                    <Text style={{ fontWeight: 'bold' }}>Logradouro: </Text>
                    {props.loc.endereco.nmLogradouro}
                </Text>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                    <Text style={{ fontWeight: 'bold' }}>Bairro: </Text>
                    {props.loc.endereco.idBairro.nome}
                </Text>
            </Pressable>
            <View style={{ alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
                <Pressable style={{width:"100%"}} onPress={() => apagarGrupo()}>
                    <Ionicons name="trash-bin" size={28} color="#ff5555" />
                </Pressable>
                <ModalAlteraGP
                    user={props.loc.usuario.id}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    idGrupo={props.loc.id}
                    endereco={props.loc.endereco.idEndereco}
                />
            </View>
        </View>
    );
}