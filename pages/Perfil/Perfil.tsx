import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../styles/styles";
import HeaderVoltar from "../../components/HeaderVoltar/HeaderVoltar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header/Header";
import InputLabel from "../../components/InputArea/InputLabel";
import UserField from "./components/UserField";
import Botao from "../../components/Botao/Botao";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../util/types";

const Perfil = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Perfil'>>();
  

  return (
    <View style={[styles.container, { paddingTop: 50 }]}>
      <Header /> 
      <View style={styles.container_center}>
        <MaterialCommunityIcons name="account-circle-outline" size={150} color="white" />
        <Text style={{color: 'white', fontSize: 36}}>Gustavo</Text>
        <View style={[{width: '100%', gap: 10, marginVertical: 30}]}>
            <UserField  titulo="Nome completo" valor="Gustavo Dias" /> 
            <UserField  titulo="Email" valor="gustavodiasdsc@gmail.com" /> 
            <UserField  titulo="Senha" valor="********" isPassword /> 
            <UserField  titulo="Endereço" valor="Rua dos Prefeitos, 345, Atibaia - São Paulo" /> 
            <UserField  titulo="Cep" valor="09997-390" /> 
        </View>
        <Botao title="Alterar dados" size="medium" action={() => navigation.navigate('AlterarPerfil')} /> 
      </View>
    </View>
  );
};

export default Perfil;
