import React, { useState } from 'react'
import { Pressable, Text, ToastAndroid, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputLabel from '../../../components/InputArea/InputLabel'
import Botao from '../../../components/Botao/Botao';
import { RootStackParamList } from '../../../util/types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../../../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormularioLogin() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const postToApiLogin = async () => {
        try {
            if (!email || !senha) {
                ToastAndroid.show('Por favor, preencha todos os campos', ToastAndroid.SHORT);
                return;
            }
            if (!email.includes('@')) {
                ToastAndroid.show('Por favor, insira um email válido', ToastAndroid.SHORT);
                return;
            }
            const res = await axios.post('https://api.example.com/login', {
                email: email,
                senha: senha
            });
            if (res.status === 200) {
                ToastAndroid.show('Login realizado com sucesso!', ToastAndroid.SHORT);
                const data = res.data;
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('user', JSON.stringify(data.user));
                navigation.navigate('Inicio');
            } else {
                ToastAndroid.show('Erro ao realizar login', ToastAndroid.LONG);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
            ToastAndroid.show('Erro ao enviar dados para a API', ToastAndroid.LONG);
        }
    }

    return (
        <View style={{width:'100%',alignItems:'center',gap:50}}>
            <View style={{width:'100%',alignItems:'center',gap:20}}>
                <View style={{ width: '90%' }}>
                    <InputLabel title='Email' value={email} setValue={(e)=>setEmail(e)} placeholder='Digite o seu email' show={false}/>
                </View>
                <View style={{width: '90%'}}>
                    <InputLabel title='Senha' value={senha} setValue={(e)=>setSenha(e)} placeholder='Digite a sua senha' show={false} secure={true}/>
                </View>
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap:10, alignItems:'center'}}>
                <Botao title='Acessar' size='medium' action={postToApiLogin}></Botao>
                <View style={{flexDirection:"row",gap:5}}>
                    <Text style={[styles.whiteText]}>Não possui conta?</Text>
                    <Pressable onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={[styles.whiteText,{fontWeight:700}]}>Clique aqui</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
