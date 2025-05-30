import { useEffect, useState } from 'react';
import { Text, View } from 'react-native'
import { alertaReponse, userResponse } from '../../util/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../../styles/styles';
import Header from '../../components/Header/Header';
import ListaAlerta from './components/ListaAlerta/ListaAlerta';
import ModalDenunciar from './components/ModalDenunciarAlerta/ModalDenunciar';
import HeaderVoltar from '../../components/HeaderVoltar/HeaderVoltar';

export default function Alertas() {
    
    const [user, setUser] = useState<userResponse>();
    const [alertas, setAlertas] = useState<alertaReponse[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    

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
        const getAlertas = async () => {
            try {
                const res = await axios.get(`https://nimbus-api.com/api/alertas?bairro=${user?.endereco.nomeBairro}`)
                if (res.status === 200) {
                    const data : alertaReponse[] = res.data;
                    setAlertas(()=>data);
                } else {
                    console.error('Erro ao buscar previsões:', res.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar previsões:', error);
            }
        }
        getAlertas();
    }, [user]);
    
    return (
        <View style={[styles.container,{paddingTop:30,gap:30}]}>
            <View style={{justifyContent:'flex-start',alignItems:'center',gap:10,flexDirection:'row'}}>
                <HeaderVoltar />
                <View style={{width:"60%"}}>
                    <Text style={[styles.whiteText,{fontSize:32,fontWeight:500,textAlign:'left'}]}>Alertas</Text>
                    <View style={{borderWidth:1,width:"60%",borderColor:"white"}}></View>
                </View>
            </View>
            {alertas.length > 0 ? (
                <View style={{flex:1, width:'100%'}}>
                    <ListaAlerta listaAlerta={alertas} />
                </View>
                ):(
                <View style={{width:'100%', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ModalDenunciar showModal={showModal} setShowModal={setShowModal}/>
                </View>
                )}
            
        </View>
    )
}
