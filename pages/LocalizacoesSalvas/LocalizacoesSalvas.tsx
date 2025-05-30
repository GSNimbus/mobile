import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HeaderVoltar from '../../components/HeaderVoltar/HeaderVoltar'
import { styles } from '../../styles/styles'
import { alertaReponse, localizacaoSalvasResponse, userResponse } from '../../util/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LocalizacoesSalvas() {

    const [user, setUser] = useState<userResponse>();
    const [locSalvas, setLocSalvas] = useState<localizacaoSalvasResponse[]>([]);
    const [alertas, setAlertas] = useState<alertaReponse[]>([]);

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
    }, [user]);


    useEffect(() => {
        const getAlertas = async (idLoc: number) => {
            try {
                const res = await axios.get(`https://nimbus-api.com/api/alertas?bairro=${idLoc}`)
                if (res.status === 200) {
                    const data : alertaReponse[] = res.data;
                    setAlertas(()=>[...alertas, ...data]);
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
    <View style={[styles.container,{paddingTop:30,gap:30}]}>
        <View style={{justifyContent:'flex-start',alignItems:'center',gap:10,flexDirection:'row'}}>
            <HeaderVoltar />
            <View style={{width:"100%"}}>
                <Text style={[styles.whiteText,{fontSize:32,fontWeight:500,textAlign:'left'}]}>Localizações Salvas</Text>
                <View style={{borderWidth:1,width:"80%",borderColor:"white"}}></View>
            </View>
        </View>
        {locSalvas.length>0?(
            <View>

            </View>
        ):
        (
            <View>
                
            </View>
        )
    }
    </View>
  )
}
