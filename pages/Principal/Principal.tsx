import { View, ActivityIndicator } from "react-native";
import { styles } from "../../styles/styles";
import Header from "../../components/Header/Header";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  bairroInterface,
  GrupoLocalizacaoInterface,
  previsaoResponse,
} from "../../util/interfaces";
import { AuthContext } from "../../Service/ProfileContext";
import PrevisãoPrincipal from "./components/PrevisaoPrincipal/PrevisaoPrincipal";
import Previsoes from "./components/Previsoes/Previsoes";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../util/types";
import Navegacoes from "./components/Navegacoes/Navegacoes";
import getCurrentLocation from "../../Service/getLocation";
import type { LocationObject } from "expo-location";
import postToLocalizacao from "../../Service/postToLocalizacao";
import AuthorizedCaller from "../../Service/AuthorizedCaller";
import usePostToLocalizacao from "../../Service/postToLocalizacao";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Principal() {
  

  const { userId, setUserId, setToken } = useContext(AuthContext)
  const [previsao, setPrevisao] = useState<previsaoResponse | null>(null)
  const [loadingPrevisao, setLoadingPrevisao] = useState(false)
  const [location, setLocation] = useState<LocationObject | null>(null)

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Inicio">>();
  const authorizedRequest = AuthorizedCaller();
  const postToLocalizacao = usePostToLocalizacao();

  useEffect(() => {
    const clean = async () => {
      try {
        await AsyncStorage.clear()
        setUserId(null)
        setToken(null)
        navigation.navigate('Inicio')
      } catch (error) {
        console.log("erro: ", error)
      }
    }

    const loadLocation = async () => {
      try {
        const loc = await getCurrentLocation();
        if (loc) {
          setLocation(loc);
        } else {
          console.warn("Permissão de localização negada ou indisponível");
        }
      } catch (e) {
        console.error("Erro ao obter localização:", e);
      }
    };
    // clean();
    loadLocation();
  }, []);

  useEffect(() => {
    if (!location || userId === null) return;

    (async () => {
      setLoadingPrevisao(true)
      try {
        const bairro: bairroInterface | null = await postToLocalizacao(location.coords);
        console.log(bairro)

        if (!bairro) return;
        const previsao = await authorizedRequest<previsaoResponse>(
          "GET",
          `/previsao/bairro/${bairro.id}`
        );
        setPrevisao(previsao);
      } catch (e: any) {
        console.error("Erro ao buscar previsões:", e);
      } finally {
        setLoadingPrevisao(false)
      }
    })();
  }, [location, userId, postToLocalizacao, authorizedRequest]);

 
  return (
    <View style={[styles.container, { paddingTop: 30, gap: 10 }]}> 
      <Header />
      <View style={{ width: "100%", flex: 1 }}>
        <Navegacoes />
        { (loadingPrevisao || !previsao) ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <PrevisãoPrincipal previsao={previsao} />
        )}
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Previsoes  />
      </View>
    </View>
  );
}
