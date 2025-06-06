import { View } from 'react-native'
import { styles } from '../../styles/styles'
import Header from '../../components/Header/Header'
import { use, useEffect, useState } from 'react'
import axios from 'axios'
import { previsaoResponse, userResponse } from '../../util/interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PrevisãoPrincipal from './components/PrevisaoPrincipal/PrevisaoPrincipal'
import Previsoes from './components/Previsoes/Previsoes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../util/types'
import Navegacoes from './components/Navegacoes/Navegacoes'
import { NavigationContainer } from '@react-navigation/native'


export default function Principal() {

    const API_URL = process.env.EXPO_PUBLIC_NIMBUS_API;

    const [user, setUser] = useState<userResponse>();
    const [previsoes, setPrevisoes] = useState<previsaoResponse[]>([]);

    const {Navigator,Screen} = createNativeStackNavigator<RootStackParamList>();

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
        const getPrevisoes = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/previsoes?cidade=${user?.endereco.cidade.nome}`)
                if (res.status === 200) {
                    const data : previsaoResponse[] = res.data;
                    setPrevisoes(()=>data);
                } else {
                    console.error('Erro ao buscar previsões:', res.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar previsões:', error);
            }
        }
        getPrevisoes();
    }, [user]);

    const previsaovazio : previsaoResponse = {
        cidade: 'cidade',
        graus: '24 C',
        data: new Date(),
    }
    return (
        <View style={[styles.container,{paddingTop:30,gap:10}]}>
            <Header />
            <View style={{width:'100%',flex:1}}>
                <Navegacoes />
                <PrevisãoPrincipal previsao={previsaovazio} />
            </View>
            <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                <Previsoes/>
            </View>
        </View>
    )
}
