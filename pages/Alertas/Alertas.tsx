import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native'
import { alertaReponse, userResponse } from '../../util/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../../styles/styles';
import Header from '../../components/Header/Header';
import ListaAlerta from './components/ListaAlerta/ListaAlerta';
import HeaderVoltar from '../../components/HeaderVoltar/HeaderVoltar';
import AuthorizedCaller from '../../Service/AuthorizedCaller';
import { AuthContext } from '../../Service/ProfileContext';

export default function Alertas() {
    

    const [alertas, setAlertas] = useState<alertaReponse[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const authorizedRequest = AuthorizedCaller();
    const { userId } = useContext(AuthContext);
   
    useEffect(() => {
        const getAlertas = async () => {
            try {
                const res = await authorizedRequest<alertaReponse[]>(
                    'GET',
                    `/alerta/usuario/${userId}` 
                );
                if (res) {
                    
                    setAlertas(()=>res);
                } else {
                    console.error('Erro ao buscar alertas');
                }
            } catch (error) {
                console.error('Erro ao buscar alertas:', error);
            }
        }
        getAlertas();
    }, [authorizedRequest,alertas, showModal]);
    
    return (
        <View style={[styles.container,{paddingTop:50,gap:30}]}>
            <View style={{justifyContent:'flex-start',alignItems:'center',gap:10,flexDirection:'row'}}>
                <HeaderVoltar />
                <View style={{width:"60%"}}>
                    <Text style={[styles.whiteText,{fontSize:24,fontWeight:500,textAlign:'left'}]}>Alertas</Text>
                    <View style={{borderWidth:1,width:"60%",borderColor:"white"}}></View>
                </View>
            </View>
            {alertas.length > 0 ? (
                <View style={{flex:1, width:'100%'}}>
                    <ListaAlerta listaAlerta={alertas} />
                </View>
                ):(
                <View style={{width:'100%', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={[styles.whiteText, { fontSize: 18, textAlign: 'center' }]}>
                        Não há alertas disponíveis no momento.
                    </Text>
                </View>
                )}
            
        </View>
    )
}
