import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HeaderVoltar from '../../components/HeaderVoltar/HeaderVoltar'
import { styles } from '../../styles/styles'
import { alertaReponse, GrupoLocalizacaoInterface, localizacaoSalvasAlertaResponse, userResponse } from '../../util/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ModalLocalizacoesSalvas from './components/ModalLocalizacoesSalvas/ModalLocalizacoesSalvas';
import Header from '../../components/Header/Header';
import LocalizacaoSalvaModulo from './components/LocalizacaoSalvasModulo/LocalizacaoSalvaModulo';
import AuthorizedCaller from '../../Service/AuthorizedCaller';
import { AuthContext } from '../../Service/ProfileContext';

export default function LocalizacoesSalvas() {
    const [locSalvas, setLocSalvas] = useState<GrupoLocalizacaoInterface[]>([]);

    const [show, setShow] = useState<boolean>(false);
    const authorizedRequest = AuthorizedCaller();
    const { userId } = useContext(AuthContext)


    useEffect(() => {
        const getLocSalvas = async () => {
            try {
                const data = await authorizedRequest<GrupoLocalizacaoInterface[]>(
                    'GET',
                    `/grupo-localizacao/usuario/${userId}`
                );
                if (data) {
                    setLocSalvas(() => data);
                } else {
                    console.error('Erro ao buscar localizações salvas');
                }
            } catch (error) {
                console.error('Erro ao buscar localizações salvas:', error);
            }
        }
        getLocSalvas();
    }, []);

    return (
        <View style={[styles.container, { paddingTop: 50, gap: 30 }]}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
                <HeaderVoltar />
                <View style={{ width: "80%" }}>
                    <Text style={[styles.whiteText, { fontSize: 24, fontWeight: 500, textAlign: 'left' }]}>Localizações Salvas</Text>
                    <View style={{ borderWidth: 1, width: "85%", borderColor: "white" }}></View>
                </View>
            </View>
            {locSalvas.length > 0 ? (
                <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', height: '100%' }}>
                    {
                        locSalvas.map((loc, index) => (
                            <LocalizacaoSalvaModulo
                                key={index}
                                loc={loc}
                            />
                        ))
                    }

                </View>
            ) :
                (
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={[styles.whiteText, { fontSize: 18, textAlign: 'center' }]}>
                            Não há localizações salvas.
                        </Text>
                    </View>
                )
            }
            <View style={{ alignItems: 'center', width: '100%', flex:1 }}>
                <ModalLocalizacoesSalvas user={userId} setShowModal={setShow} showModal={show} />
            </View>
        </View>
    )
}
