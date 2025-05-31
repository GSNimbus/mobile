import React, { useState } from 'react'
import { Pressable, Text, ToastAndroid, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputLabel from '../../../components/InputArea/InputLabel'
import Botao from '../../../components/Botao/Botao';
import { RootStackParamList } from '../../../util/types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../../../styles/styles';
import * as Location from 'expo-location';
import getCurrentLocation from '../../../Service/getLocation';
import { enderecoInterface, userResponse } from '../../../util/interfaces';

export default function FormularioCadastro() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Cadastro'>>();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [cep, setCep] = useState('');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    
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
            setLocation(await getCurrentLocation());
            if (!location) {
                ToastAndroid.show('Não foi possível obter a localização atual', ToastAndroid.SHORT);
                return;
            }
            const viaCepData = viacepRes.data;
            const { latitude, longitude } = location.coords;
            const localizacaoResponse = await axios.post('https://api.example.com/Localizacao', {
                nr_longitude: longitude,
                nr_latitude: latitude
            });
            if (localizacaoResponse.status !== 200) {
                ToastAndroid.show('Erro ao salvar localização', ToastAndroid.SHORT);
                return;
            }
            const bairroResponse  = await axios.get(`https://api.example.com/Bairro?nome=${viaCepData.bairro}`);
            if (bairroResponse.status !== 200) {
                ToastAndroid.show('Erro ao buscar bairro', ToastAndroid.SHORT);
                return;
            }
            const dataEndereco : enderecoInterface ={
                id: 0, // O ID será gerado pelo banco de dados
                cep: viaCepData.cep,
                logradouro: viaCepData.logradouro,
                idBairro: bairroResponse.data.id 
            } 
            const resEndereco = await axios.post('https://api.example.com/Endereco', dataEndereco);
            if (resEndereco.status !== 200) {
                ToastAndroid.show('Erro ao salvar endereço', ToastAndroid.SHORT);
                return;
            }
            const dataPost:userResponse = {
                id: 0, // O ID será gerado pelo banco de dados
                nome: nome,
                email: email,
                senha: senha,
                endereco: resEndereco.data,
                idLocalizacao: localizacaoResponse.data
                }

            const res = await axios.post('https://api.example.com/Cadastro', dataPost);
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
