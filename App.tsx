import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './pages/Inicio/Inicio';
import { RootStackParamList } from './util/types';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Principal from './pages/Principal/Principal';
import Alertas from './pages/Alertas/Alertas';
import LocalizacoesSalvas from './pages/LocalizacoesSalvas/LocalizacoesSalvas';
import Perfil from './pages/Perfil/Perfil';
import AlterarPerfil from './pages/AlterarPerfil/AlterarPerfil';
import { useContext, useEffect, useState } from 'react'; // Adicionado
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicionado
import { AuthContext, ProfileContext } from './Service/ProfileContext'; // Adicionado ProfileContext (Provider)
import { ActivityIndicator, View } from 'react-native'; // Adicionado

const {Navigator,Screen} = createNativeStackNavigator<RootStackParamList>();

// Envolve o App com o ProfileContext Provider
export default function AppWrapper() {
  return (
    <ProfileContext>
      <App />
    </ProfileContext>
  );
}

function App() {
  const { token, setToken, setUserId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserIdString = await AsyncStorage.getItem('userId');
        
        if (storedToken && storedUserIdString) {
          setToken(storedToken);
          setUserId(parseInt(storedUserIdString, 10));
        }
      } catch (e) {
        console.error("Falha ao carregar o token do armazenamento", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, [setToken, setUserId]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Navigator initialRouteName={token ? 'Principal' : 'Inicio'} screenOptions={{
        headerShown:false,
      }}>
        <Screen name='Inicio' component={Inicio} />
        <Screen name='Login' component={Login} />
        <Screen name='Cadastro' component={Cadastro} />
        <Screen name='Principal' component={Principal} />
        <Screen name='Alertas' component={Alertas}/>
        <Screen name='LocalizacoesSalvas' component={LocalizacoesSalvas}/>
        <Screen name='Perfil' component={Perfil} />
        <Screen name='AlterarPerfil' component={AlterarPerfil} />
      </Navigator>
    </NavigationContainer>
  );
}


