import { View, Text, ScrollView, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { RootStackParamList } from "../../util/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import UserField from "../Perfil/components/UserField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header/Header";
import { styles } from "../../styles/styles";
import Botao from "../../components/Botao/Botao";
import InputLabel from "../../components/InputArea/InputLabel";
import AuthorizedCaller from "../../Service/AuthorizedCaller";
import { AuthContext } from "../../Service/ProfileContext";
import {
  bairroInterface,
  CasaGrupoResponse,
  cidadeInterface,
  EnderecoInput,
  enderecoInterface,
  estadoInterface,
  GrupoLocalizacaoInput,
  GrupoLocalizacaoInterface,
  userResponse,
  ViacepData,
} from "../../util/interfaces";
import axios from "axios";

const AlterarPerfil = () => {
  const authorizedRequest = AuthorizedCaller();
  const { userId } = useContext(AuthContext);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "AlterarPerfil">
    >();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numLogradouro, setNumLogradouro] = useState("");
  const [disable, setDisable] = useState<boolean>(true);
  const [endereco, setEndereco] = useState<enderecoInterface>();
  const [nomeGrupo, setNomeGrupo] = useState("")
  const [idGrupoLocalizacao, setIdGrupoLocalizacao] = useState<number>(0)

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const usuario = await authorizedRequest<userResponse>(
          "GET",
          `/usuario/${userId}`
        );
        setNome(usuario.username);
        setEmail(usuario.email);
        setSenha(usuario.password);
        console.log("cavalo 1000");
        const casa = await authorizedRequest<CasaGrupoResponse>(
          "GET",
          `/grupo-localizacao/casa/usuario/${userId}`
        );
        console.log(`Casa: ${casa}`)
        setEndereco(casa.endereco);
        setEstado(casa.endereco.idBairro.idCidade.idEstado.nmEstado);
        setCidade(casa.endereco.idBairro.idCidade.nmCidade);
        setBairro(casa.endereco.idBairro.nome);
        setLogradouro(casa.endereco.nmLogradouro);
        setNumLogradouro(casa.endereco.nrLogradouro.toString());
        setCep(casa.endereco.cep.toString());
        setIdGrupoLocalizacao(casa.idGrupoLocalizacao)
        setNomeGrupo(casa.nome)
        console.log("cavalo 1001");
      } catch (e) {
        console.error("Erro ao buscar previsões:", e);
      }
    })();
  }, [userId, authorizedRequest]);

  const chamarViacep = async () => {
    // fazer tipo um debouncer, que espera 5 seg sem atualização em campo cep, e aí fazer chamada para viacep
    const viacepRes = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (viacepRes.status !== 200 || viacepRes.data.erro) {
      ToastAndroid.show("CEP inválido", ToastAndroid.SHORT);
      return;
    }
    const viaCepData: ViacepData = viacepRes.data;
    setEstado(viaCepData.estado);
    setCidade(viaCepData.localidade);
    setBairro(viaCepData.bairro);
    setLogradouro(viaCepData.logradouro);
    setDisable(false);
  };

  useEffect(() => {
    setDisable(true);
    if (cep.length !== 8) return;
    const handler = setTimeout(() => {
      ToastAndroid.show(
        "Preenchendo informações de endereço adicionais",
        ToastAndroid.LONG
      );
      chamarViacep();
    }, 5000);
    return () => clearTimeout(handler);
  }, [cep]);

  const handleSubmit = async () => {
    const form = { nome, email, senha, cep, pais: "Brasil", estado, cidade };
    
    const enderecoUpdateObj : EnderecoInput = {
      numLogradouro : parseFloat(numLogradouro),
      bairro,
      cep,
      nomeLogradouro: logradouro,
      cidade,
      estado,
      pais : "Brasil"
    }

   
  
  console.log(enderecoUpdateObj)
  console.log("Cheguei aqui")  
  const enderecoResponse = await authorizedRequest<enderecoInterface>("POST", `/endereco/todo/`, enderecoUpdateObj);
  console.log(enderecoResponse)  
  
  const grupoLocalizacaoUpdateObj : GrupoLocalizacaoInput = {
      idUsuario: userId!,
      idEndereco: enderecoResponse.idEndereco,
      nome: nomeGrupo
    }
    
    await authorizedRequest<GrupoLocalizacaoInterface>(
      "PUT",
      `grupo-localizacao/${idGrupoLocalizacao}`,
      grupoLocalizacaoUpdateObj
    ) 

    ToastAndroid.show("Dados atualizados com sucesso!", ToastAndroid.LONG)
     navigation.navigate("Perfil")

     console.log("Dados do formulário:", form);
  };

  const salvarNaApi = async () => {
    try {
      await handleSubmit();
    } catch (error) {
      console.error("Erro ao salvar", error)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: 50 }]}>
      <Header />
      <View style={styles.container_center}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={150}
          color="white"
        />
        <Text style={{ color: "white", fontSize: 36 }}>Gustavo</Text>
        <ScrollView style={{ width: "100%" }}>
          <View style={[{ width: "100%", gap: 10, marginVertical: 30 }]}>
            <InputLabel title="Nome completo" value={nome} setValue={setNome} />
            <InputLabel title="Email" value={email} setValue={setEmail} />
            <InputLabel title="Senha" value={senha} setValue={setSenha} />
            <InputLabel
              title="Cep"
              value={cep}
              setValue={setCep}
              keyboardType="numeric"
            />
            <InputLabel
              title="Número do logradouro"
              value={numLogradouro}
              setValue={setNumLogradouro}
              inputDisabled={disable}
              keyboardType="numeric"
            />
            <InputLabel
              title="Logradouro"
              value={logradouro}
              setValue={setLogradouro}
              inputDisabled={true}
            />
            <InputLabel
              title="Bairro"
              value={bairro}
              setValue={setBairro}
              inputDisabled={true}
            />
            <InputLabel
              title="Cidade"
              value={cidade}
              setValue={setCidade}
              inputDisabled={true}
            />
            <InputLabel
              title="Estado"
              value={estado}
              setValue={setEstado}
              inputDisabled={true}
            />
          </View>
          <Botao title="Salvar" size="medium" action={salvarNaApi} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AlterarPerfil;
