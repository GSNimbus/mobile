import React, { useState } from 'react'
import { Pressable, Text, ToastAndroid, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputLabel from '../../../components/InputArea/InputLabel'
import Botao from '../../../components/Botao/Botao';
import { RootStackParamList } from '../../../util/types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../../../styles/styles';

export default function FormularioCadastro() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Cadastro'>>();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [cep, setCep] = useState('');

    const postToApiCadastro = async () => {
        try {
            if (!nome || !email || !senha || !confirmarSenha || !cep) {
                ToastAndroid.show('Por favor, preencha todos os campos', ToastAndroid.SHORT);
                return;
            }
            if (senha !== confirmarSenha) {
                ToastAndroid.show('As senhas não coincidem', ToastAndroid.SHORT);
                return;
            }
            if (cep.length !== 8) {
                ToastAndroid.show('O CEP deve ter 8 dígitos', ToastAndroid.SHORT);
                return;
            }
            if (!email.includes('@')) {
                ToastAndroid.show('Por favor, insira um email válido', ToastAndroid.SHORT);
                return;
            }
            const viacepRes = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (viacepRes.status !== 200 || viacepRes.data.erro) {
                ToastAndroid.show('CEP inválido', ToastAndroid.SHORT);
                return;
            }
            const viaCepData = viacepRes.data;
            const res = await axios.post('https://api.example.com/Cadastro', {
                nome: nome,
                email: email,
                senha: senha,
                cep: cep,
                logradouro: viaCepData.logradouro,
                bairro: viaCepData.bairro,
                cidade: viaCepData.localidade,
                estado: viaCepData.uf
            });
            if (res.status === 200) {
                ToastAndroid.show('Login realizado com sucesso!', ToastAndroid.SHORT);
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
                <View style={{width: '90%'}}>
                    <InputLabel title='Nome' value={nome} setValue={(e)=>setNome(e)} placeholder='Digite o seu Nome' show={false}/>
                </View>
                <View style={{ width: '90%' }}>
                    <InputLabel title='Email' value={email} setValue={(e)=>setEmail(e)} placeholder='Digite o seu email' show={false}/>
                </View>
                <View style={{width: '90%'}}>
                    <InputLabel title='Senha' value={senha} setValue={(e)=>setSenha(e)} placeholder='Digite a sua senha' show={false} secure={true}/>
                </View>
                <View style={{width: '90%'}}>
                    <InputLabel title='Confirmar Senha' value={confirmarSenha} setValue={(e)=>setConfirmarSenha(e)} placeholder='Confirme a sua senha' show={false} secure={true}/>
                </View>
                <View style={{width: '90%'}}>
                    <InputLabel title='CEP' value={cep} setValue={(e)=>setCep(e)} placeholder='Digite o seu CEP' show={false}/>
                </View>
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap:10, alignItems:'center'}}>
                <Botao title='Cadastrar' size='medium' action={postToApiCadastro}></Botao>
                <View style={{flexDirection:"row",gap:5}}>
                    <Text style={[styles.whiteText]}>Já possui conta?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.whiteText,{fontWeight:700}]}>Clique aqui</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
