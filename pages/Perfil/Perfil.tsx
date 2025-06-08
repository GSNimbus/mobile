import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import AuthorizedCaller from "../../Service/AuthorizedCaller";
import { AuthContext } from "../../Service/ProfileContext";
import { enderecoInterface, userResponse } from "../../util/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Perfil = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Perfil">>();
  const authorizedRequest = AuthorizedCaller();
  const { userId, setUserId, setToken } = useContext(AuthContext);
  const [user, setUser] = useState<userResponse | null>(null);
  const [endereco, setEndereco] = useState<enderecoInterface | null>(null);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const usuario = await authorizedRequest<userResponse>(
          "GET",
          `/usuario/${userId}`
        );
        setUser(usuario);
        console.log("cavalo 1000");
        const endereco = await authorizedRequest<enderecoInterface>(
          "GET",
          `/grupo-localizacao/casa/usuario/${userId}`
        );
        setEndereco(endereco);
        console.log("cavalo 1001");
      } catch (e) {
        console.error("Erro ao buscar previsões:", e);
      }
    })();
  }, [userId, authorizedRequest]);

  const limparUso = async () => {
    setUserId(null);
    setToken(null);
    await AsyncStorage.clear()
  }

  const handleLogout = () => {
    try {
      limparUso()
    } catch (error) {
      console.error(error)
    }
    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
  };

  return (
    <View style={[styles.container, { paddingTop: 50 }]}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.container_center}
        showsVerticalScrollIndicator={false}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={150}
          color="white"
        />
        <Text style={{ color: "white", fontSize: 36 }}>{user?.username ?? ''}</Text>
        <View style={[{ width: "100%", gap: 10, marginVertical: 30 }]}>
          <UserField titulo="Nome completo" valor={user?.username ?? ""} />
          <UserField titulo="Email" valor={user?.email ?? ""} />
          <UserField titulo="Senha" valor={user?.password ?? ""} isPassword />
          <UserField
            titulo="Endereço"
            valor={`${endereco?.nmLogradouro}, ${endereco?.nrLogradouro}, ${
              endereco?.idBairro?.nome ?? ""
            }`}
          />
          <UserField titulo="Cep" valor={endereco?.cep ?? ''} /> 
        </View>
        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center'}}> 
          <Botao
            title="Alterar dados"
            size="small"
            action={() => navigation.navigate("AlterarPerfil")}
          />
            <Botao
              title="Logout"
              size="small"
              additionalStyles={{ backgroundColor: '#D9534F', borderColor: '#D9534F' }}
              action={handleLogout}
            />
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;
