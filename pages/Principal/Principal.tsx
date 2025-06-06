import { View } from 'react-native'
import { styles } from '../../styles/styles'
import Header from '../../components/Header/Header'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { bairroInterface, GrupoLocalizacaoInterface, previsaoResponse } from '../../util/interfaces'
import { AuthContext } from '../../Service/ProfileContext'
import PrevisãoPrincipal from './components/PrevisaoPrincipal/PrevisaoPrincipal'
import Previsoes from './components/Previsoes/Previsoes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../util/types'
import Navegacoes from './components/Navegacoes/Navegacoes'
import getCurrentLocation from '../../Service/getLocation'
import type { LocationObject } from 'expo-location'
import postToLocalizacao from '../../Service/postToLocalizacao'
import AuthorizedCaller from '../../Service/AuthorizedCaller'
import usePostToLocalizacao from '../../Service/postToLocalizacao'

export default function Principal() {
  const { userId } = useContext(AuthContext)
  const [previsao, setPrevisao] = useState<previsaoResponse | null>(null)
  const [location, setLocation] = useState<LocationObject | null>(null)
  const [previsoes, setPrevisoes] = useState<previsaoResponse[]>([])

  const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()
  const authorizedRequest = AuthorizedCaller();
  const postToLocalizacao = usePostToLocalizacao();

  // pega a localização atual do usuário
  useEffect(() => {
    const loadLocation = async () => {
      try {
        const loc = await getCurrentLocation()
        if (loc) {
          setLocation(loc)
        } else {
          console.warn('Permissão de localização negada ou indisponível')
        }
      } catch (e) {
        console.error('Erro ao obter localização:', e)
      }
    }
    loadLocation()
  }, [])

  useEffect(() => {
    if (!location || userId === null) return;

    (async () => {
      try {
        const bairro : bairroInterface | null = await postToLocalizacao(location.coords);
        console.log(bairro)
        if (!bairro) return;
        const previsao = await authorizedRequest<previsaoResponse>(
          "GET",
          `/previsao/bairro/${bairro.id}`
        );
        setPrevisao(previsao);
      } catch (e) {
        console.error("Erro ao buscar previsões:", e);
      }
    })();
  }, [location, userId, postToLocalizacao, authorizedRequest]);

 useEffect(() => {
  if (userId === null) return;

  (async () => {
    try {
      const gruposLocalizacao = await authorizedRequest<GrupoLocalizacaoInterface[]>(
        "GET",
        `/grupo-localizacao/usuario/${userId}`
      );

      const previsoesArray = await Promise.all(
        gruposLocalizacao.map(async (grupo) => {
          const idBairro = grupo.endereco.idBairro?.id;
          console.log("debug idBairro:", idBairro);

          if (!idBairro) {
            // retry até encontrar um id válido (cuidado com loops infinitos)
            let tentativas = 0;
            while (!idBairro && tentativas < 3) {
              tentativas++;
              await new Promise((r) => setTimeout(r, 500));
              console.log(`retry #${tentativas}`);
              // supondo que você pudesse atualizar `grupo` aqui...
            }
          }

          if (!idBairro) {
            console.warn("idBairro continua indefinido, pulando...");
            return null;
          }

          return await authorizedRequest<previsaoResponse>(
            "GET",
            `/previsao/bairro/${idBairro}`
          );
        })
      );

      setPrevisoes(previsoesArray.filter((p): p is previsaoResponse => Boolean(p)));
    } catch (error) {
      console.error("Erro ao buscar previsões:", error);
    }
  })();
}, [userId, authorizedRequest]);

  return (
    <View style={[styles.container, { paddingTop: 30, gap: 10 }]}>
      <Header />
      <View style={{ width: '100%', flex: 1 }}>
        <Navegacoes />
        {previsao && <PrevisãoPrincipal previsao={previsao} />}
      </View>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Previsoes previsoes={previsoes} />
      </View>
    </View>
  )
}