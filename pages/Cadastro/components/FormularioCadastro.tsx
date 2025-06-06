import React, { useState, useContext } from "react";
import { Pressable, Text, ToastAndroid, View } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputLabel from "../../../components/InputArea/InputLabel";
import Botao from "../../../components/Botao/Botao";
import { RootStackParamList } from "../../../util/types";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { styles } from "../../../styles/styles";
// import * as Location from "expo-location";
// import getCurrentLocation from "../../../Service/getLocation";
import {
  EnderecoInput,
  enderecoInterface,
  GrupoLocalizacaoInput,
  GrupoLocalizacaoInterface,
  LoginInput,
  UserInput,
  userResponse,
  ViacepData,
} from "../../../util/interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../../Service/ProfileContext";
import { TokenResponse } from "../../../util/interfaces";

export default function FormularioCadastro() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Cadastro">>();
  const { setToken, setUserId } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cep, setCep] = useState("");
  const [numLogradouro, setNumLogradouro] = useState("");
  // const [location, setLocation] = useState<Location.LocationObject | null>(
  //   null
  // );

  const API_URL = process.env.EXPO_PUBLIC_NIMBUS_API;
  console.log("Api: ", API_URL);

  const postToApiCadastro = async () => {
    try {
      if (!nome || !email || !senha || !confirmarSenha || !cep) {
        ToastAndroid.show(
          "Por favor, preencha todos os campos",
          ToastAndroid.SHORT
        );
        return;
      }
      if (senha !== confirmarSenha) {
        ToastAndroid.show("As senhas não coincidem", ToastAndroid.SHORT);
        return;
      }
      if (cep.length !== 8) {
        ToastAndroid.show("O CEP deve ter 8 dígitos", ToastAndroid.SHORT);
        return;
      }
      if (!email.includes("@")) {
        ToastAndroid.show(
          "Por favor, insira um email válido",
          ToastAndroid.SHORT
        );
        return;
      }
      const viacepRes = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
      );
      if (viacepRes.status !== 200 || viacepRes.data.erro) {
        ToastAndroid.show("CEP inválido", ToastAndroid.SHORT);
        return;
      }
      const viaCepData: ViacepData = viacepRes.data;
      console.log(viaCepData);
      const endereco: EnderecoInput = {
        bairro: viaCepData.bairro,
        cep,
        cidade: viaCepData.localidade,
        estado: viaCepData.estado,
        numLogradouro: parseInt(numLogradouro),
        nomeLogradouro: viaCepData.logradouro,
        pais: "Brasil",
      };
      console.log(endereco)
      const dataPost: UserInput = {
        username: nome,
        email: email,
        password: senha,
      };
      const loginRequest: LoginInput = {
        email,
        password: senha,
      };

      console.log(`${API_URL}/usuario`);
      console.log(`Usuario ${nome}, email ${email} e senha ${senha}`);
      console.log(endereco)

      const res = await axios.post(`${API_URL}/usuario`, dataPost, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      console.log(res.status);
      if (res.status === 201) {
        console.log("oi cavalo");
        const tokenRequest = await axios.post(
          `${API_URL}/autenticacao/login`,
          loginRequest
        );
        if (tokenRequest.status !== 200) {
          ToastAndroid.show("Usuário ou senha inválido", ToastAndroid.SHORT);
          return;
        }
        const tokenResponse: TokenResponse = tokenRequest.data;
        // store token and userId in AsyncStorage and context
        await AsyncStorage.setItem('token', tokenResponse.token);
        await AsyncStorage.setItem('userId', tokenResponse.idUsuario.toString());
        setToken(tokenResponse.token);
        setUserId(tokenResponse.idUsuario);
        console.log("Login bem-sucedido e contexto atualizado", tokenResponse);

        const enderecoUsuario = await axios.post(
          `${API_URL}/endereco/todo`,
          endereco,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.token}`,
            },
          }
        );
        console.log("cavalo 3")

        if (enderecoUsuario.status == 400 || enderecoUsuario.status == 404 || enderecoUsuario.status == 500) {
          console.log("cavalo 4i910938909")
          ToastAndroid.show("Endereço inválido", ToastAndroid.LONG);
          throw Error("Erro aqui no endereco")
          return;
        }
        console.log("cavalo baum")

        const enderecoSalvo: enderecoInterface = enderecoUsuario.data;
        const usuarioNovo: userResponse = res.data;
        console.log("Grupo de localizacao iniciando...")
        console.log(enderecoSalvo)
        console.log(usuarioNovo)
        const grupoLocalizacao: GrupoLocalizacaoInput = {
          nome: "Casa",
          idEndereco: enderecoSalvo.idEndereco,
          idUsuario: usuarioNovo.id,
        };
        const novoGrupoDeLocalizacao = await axios.post(
          `${API_URL}/grupo-localizacao`,
          grupoLocalizacao,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.token}`,
            },
          }
        );
        if (novoGrupoDeLocalizacao.status == 400 || novoGrupoDeLocalizacao.status == 404 || novoGrupoDeLocalizacao.status == 500) {
          ToastAndroid.show("Grupo de endereço inválido", ToastAndroid.LONG);
          return;
        }
        ToastAndroid.show("Usuário criado com sucesso!", ToastAndroid.SHORT);
        navigation.navigate("Principal");
        return;
      } else {
        ToastAndroid.show("Erro ao realizar cadastro", ToastAndroid.LONG);
      }
    } catch ( error ) {
      console.error("Erro ao enviar dados para a API:", error);
      ToastAndroid.show("Erro ao enviar dados para a API", ToastAndroid.LONG);
    }
  };

  return (
    <View style={{ width: "100%", alignItems: "center", gap: 50 }}>
      <View style={{ width: "100%", alignItems: "center", gap: 20 }}>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Nome"
            value={nome}
            setValue={(e) => setNome(e)}
            placeholder="Digite o seu Nome"
            show={false}
          />
        </View>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Email"
            value={email}
            setValue={(e) => setEmail(e)}
            placeholder="Digite o seu email"
            show={false}
          />
        </View>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Senha"
            value={senha}
            setValue={(e) => setSenha(e)}
            placeholder="Digite a sua senha"
            show={false}
            secure={true}
          />
        </View>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Confirmar Senha"
            value={confirmarSenha}
            setValue={(e) => setConfirmarSenha(e)}
            placeholder="Confirme a sua senha"
            show={false}
            secure={true}
          />
        </View>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="CEP"
            value={cep}
            setValue={(e) => setCep(e)}
            placeholder="Digite o seu CEP"
            show={false}
          />
        </View>
        <View style={{ width: "90%" }}>
          <InputLabel
            title="Número de logradouro"
            value={numLogradouro}
            setValue={(e) => setNumLogradouro(e)}
            placeholder="Digite o número de casa"
            show={false}
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
        <Botao
          title="Cadastrar"
          size="medium"
          action={postToApiCadastro}
        ></Botao>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={[styles.whiteText]}>Já possui conta?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.whiteText, { fontWeight: 700 }]}>
              Clique aqui
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
