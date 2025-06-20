import React, { useState, useContext } from "react";
import { Alert, Platform, Pressable, Text, ToastAndroid, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputLabel from "../../../components/InputArea/InputLabel";
import Botao from "../../../components/Botao/Botao";
import { RootStackParamList } from "../../../util/types";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { styles } from "../../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../Service/ProfileContext";
import { TokenResponse } from "../../../util/interfaces";

export default function FormularioLogin() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setToken, setUserId } = useContext(AuthContext);

  const API_URL = process.env.EXPO_PUBLIC_NIMBUS_API;

  const postToApiLogin = async () => {
    try {
      if (!email || !senha) {
        ToastAndroid.show(
          "Por favor, preencha todos os campos",
          ToastAndroid.SHORT
        );
        return;
      }
      if (!email.includes("@")) {
        ToastAndroid.show(
          "Por favor, insira um email válido",
          ToastAndroid.SHORT
        );
        return;
      }

      const res = await axios.post<TokenResponse>(
        `${API_URL}/autenticacao/login`,
        { email, password: senha }
      );

      if (res.status === 401){
        if (Platform.OS ===  'android'){
          ToastAndroid.show(`O ${email} já está sendo usado!`, ToastAndroid.LONG);
        } else {
          Alert.alert(`O ${email} já está sendo usado!`)
        }
      }


      if (res.status === 200) {
        const tokenResponse = res.data;
        ToastAndroid.show("Login realizado com sucesso!", ToastAndroid.SHORT);

        // Armazena token e userId
        await AsyncStorage.setItem("token", tokenResponse.token);
        await AsyncStorage.setItem("userId", tokenResponse.idUsuario.toString());
        setUserId(tokenResponse.idUsuario);
        setToken(tokenResponse.token);
        console.log("Estou aqui")
        navigation.navigate("Principal");
      } else {
        ToastAndroid.show("Erro ao realizar login", ToastAndroid.LONG);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        ToastAndroid.show("Usuário ou senha incorreta", ToastAndroid.LONG);
      } else {
        console.error("Erro ao enviar dados para a API:", error);
        ToastAndroid.show("Erro ao enviar dados para a API", ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={{ width: "100%", alignItems: "center", gap: 50 }}>
      <View style={{ width: "100%", alignItems: "center", gap: 20 }}>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Email"
            value={email}
            setValue={setEmail}
            placeholder="Digite o seu email"
            show={false}
          />
        </View>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Senha"
            value={senha}
            setValue={setSenha}
            placeholder="Digite a sua senha"
            show={false}
            secure={true}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 10,
          alignItems: "center",
        }}
      >
        <Botao title="Acessar" size="medium" action={postToApiLogin} />
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.whiteText}>Não possui conta?</Text>
          <Pressable onPress={() => navigation.navigate("Cadastro")}>
            <Text style={[styles.whiteText, { fontWeight: "700" }]}>
              Clique aqui
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}