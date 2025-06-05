import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { RootStackParamList } from "../../util/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import UserField from "../Perfil/components/UserField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header/Header";
import { styles } from "../../styles/styles";
import Botao from "../../components/Botao/Botao";
import InputLabel from "../../components/InputArea/InputLabel";

const AlterarPerfil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "AlterarPerfil">>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");

  const handleSubmit = () => {
    const form = { nome, email, senha, cep, pais, estado, cidade };
    console.log("Dados do formulário:", form);
    // Api...
  };
  
  return (
     <View style={[styles.container, { paddingTop: 50 }]}>
      <Header /> 
      <View style={styles.container_center}>
            <MaterialCommunityIcons name="account-circle-outline" size={150} color="white" />
            <Text style={{color: 'white', fontSize: 36}}>Gustavo</Text>
        <ScrollView style={{width: '100%'}}>
            <View style={[{width: '100%', gap: 10, marginVertical: 30}]}>
                <InputLabel title="Nome completo" value={nome} setValue={setNome}  />
                <InputLabel title="Email" value={email} setValue={setEmail}   />
                <InputLabel title="Senha" value={senha} setValue={setSenha} />
                <InputLabel title="Cep" value={cep} setValue={setCep}  />
                <InputLabel title="Pais" value={pais} setValue={setPais}  />
                <InputLabel title="Estado" value={estado} setValue={setEstado}  />
                <InputLabel title="Cidade" value={cidade} setValue={setCidade}  />
            </View>
            <Botao title="Salvar" size="medium" action={handleSubmit} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AlterarPerfil;
