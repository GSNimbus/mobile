import { useNavigation, useRoute } from '@react-navigation/native';
import React, { use, useEffect, useState } from 'react'
import { ColorValue, Pressable, Text, View } from 'react-native'
import AuthorizedCaller from '../../Service/AuthorizedCaller';
import { alertaReponse, localizacaoSalvasAlertaResponse } from '../../util/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../util/types';
import { Ionicons } from '@expo/vector-icons';

export default function SingleAlert() {
    const route = useRoute();
    const { id, nome } = route.params as { id: number, nome: string };
    const [alertas, setAlertas] = useState<alertaReponse[]>([]);
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Alertas'>>();
    const authorizedRequest = AuthorizedCaller();

    useEffect(() => {
        const getAlertas = async () => {
            try {
                const res = await authorizedRequest<alertaReponse[]>(
                    'GET',
                    `/alerta/bairro/${id}`
                );
                if (res) {
                    setAlertas(res);
                } else {
                    console.error('Erro ao buscar alerta');
                }
            } catch (error) {
                console.error('Erro ao buscar alerta:', error);
            }
        }
        getAlertas();
    }
        , [id, authorizedRequest]);


    const changeColor = (tipo: string) => {
        switch (tipo) {
            case "ALTO_RISCO":
                return { bg: "#f4433650", border: "#f44336" } as { bg: ColorValue, border: ColorValue };
            case "MEDIO_RISCO":
                return { bg: "#ff980050", border: "#ff9800" } as { bg: ColorValue, border: ColorValue };
            case "BAIXO_RISCO":
                return { bg: "#4caf5050", border: "#4caf50" } as { bg: ColorValue, border: ColorValue };
            case "SEM_CHUVA":
                return { bg: "#2196f350", border: "#2196f3" } as { bg: ColorValue, border: ColorValue };
            default:
                return { bg: "#7C94AC50", border: "#7C94AC" } as { bg: ColorValue, border: ColorValue };
                
        }  
    }

    return (
        <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#7C94AC', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', marginBottom: 10 ,flexDirection:"row", justifyContent:'center'}}>
                <Pressable onPress={() => navigate.goBack()} style={{}}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </Pressable>
                <View style={{ width: "80%", alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{nome}</Text>
                    <View style={{ borderWidth: 1, width: "60%", borderColor: "white" }} />
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
                {alertas.length > 0 ? (
                    alertas.map((alerta, index) => {
                        const {bg , border} = changeColor(alerta.risco);
                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: bg,
                                    marginVertical: 8,
                                    marginHorizontal: 16,
                                    padding: 18,
                                    borderRadius: 14,
                                    borderLeftWidth: 8,
                                    borderLeftColor: border,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.18,
                                    shadowRadius: 4,
                                    elevation: 4,
                                    width: '90%',
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
                                    {alerta.risco}
                                </Text>
                                <Text style={{ color: "#fff", fontSize: 16, marginBottom: 2 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Tipo: </Text>
                                    {alerta.tipo}
                                </Text>
                                <Text style={{ color: "#fff", fontSize: 16 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>
                                    {alerta.risco}
                                </Text>
                            </View>
                        )
                    })
                ) : (
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Nenhum alerta encontrado.</Text>
                )}
            </View>
        </View>
    )
}
