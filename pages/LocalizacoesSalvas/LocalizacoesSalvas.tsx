import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HeaderVoltar from '../../components/HeaderVoltar/HeaderVoltar'
import { styles } from '../../styles/styles'
import { alertaReponse, localizacaoSalvasAlertaResponse, localizacaoSalvasResponse, userResponse } from '../../util/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ModalLocalizacoesSalvas from './components/ModalLocalizacoesSalvas/ModalLocalizacoesSalvas';
import Header from '../../components/Header/Header';
import LocalizacaoSalvaModulo from './components/LocalizacaoSalvasModulo/LocalizacaoSalvaModulo';

export default function LocalizacoesSalvas() {

    const [user, setUser] = useState<userResponse>({
        id: 0,
        nome: '',
        email: '',
        senha: '',
        endereco:{
            id: 0,
            cep: '',
            nomeBairro: '',
            logradouro: '',
            cidade: 0
        }
    });
    const [locSalvas, setLocSalvas] = useState<localizacaoSalvasResponse[]>([]);
    const [alertas, setAlertas] = useState<localizacaoSalvasAlertaResponse[]>([]);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getUser = async () => {
            try{
                const res  = await AsyncStorage.getItem('user');
                if(res){
                    const userData : userResponse = JSON.parse(res);
                    setUser(()=>userData);
                }
            }catch(e){
                console.log('Erro ao buscar usuário:', e);
            }
        }
        
        getUser();
    }, [])

    useEffect(() => {
        const getLocSalvas = async () => {
            try {
                const res = await axios.get(`https://nimbus-api.com/api/localizacoesSalvas?user=${user?.id}`)
                if (res.status === 200) {
                    const data : localizacaoSalvasResponse[] = res.data;
                    setLocSalvas(()=>data);
                } else {
                    console.error('Erro ao buscar previsões:', res.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar previsões:', error);
            }
        }
        getLocSalvas();
    }, [user,show]);


    useEffect(() => {
        const getAlertas = async (idLoc: number) => {
            try {
                const res = await axios.get(`https://nimbus-api.com/api/alertas?bairro=${idLoc}`)
                if (res.status === 200) {
                    const data : alertaReponse[] = res.data;
                    for(let loc of locSalvas){
                        if(loc.id_bairro.id === idLoc){
                            const locSalvaComAlertas: localizacaoSalvasAlertaResponse = {
                                ...loc,
                                alerta: data
                            }
                            setAlertas((prev) => [...prev, locSalvaComAlertas]);
                        }
                    }
                } else {
                    console.error('Erro ao buscar previsões:', res.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar previsões:', error);
            }
        }
        for(let loc of locSalvas){
            getAlertas(loc.id_bairro.id);
        }
        
    }, [LocalizacoesSalvas]);
  
    return (
    <View style={[styles.container,{paddingTop:50,gap:30}]}>
        <View style={{justifyContent:'flex-start',alignItems:'center',gap:10,flexDirection:'row'}}>
            <HeaderVoltar />
            <View style={{width:"80%"}}>
                <Text style={[styles.whiteText,{fontSize:24,fontWeight:500,textAlign:'left'}]}>Localizações Salvas</Text>
                <View style={{borderWidth:1,width:"85%",borderColor:"white"}}></View>
            </View>
        </View>
        {locSalvas.length>0?(
            <View style={{flex:1, width:'100%'}}>
                {alertas.map((item, idx) => (
                    <LocalizacaoSalvaModulo key={idx} {...item} />
                ))}
            </View>
        ):
        (
            <View style={{flex:1, width:'100%'}}>
                <ModalLocalizacoesSalvas user={user} setShowModal={setShow} showModal={show}/>
            </View>
        )
    }
    </View>
  )
}
