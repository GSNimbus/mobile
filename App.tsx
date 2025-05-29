import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Inicio from './pages/Inicio/Inicio';

import { RootStackParamList } from './util/types';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Principal from './pages/Principal/Principal';
import Previsoes from './pages/Principal/components/Previsoes/Previsoes';
import Alertas from './pages/Alertas/Alertas';

const {Navigator,Screen} = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  // fazer a verificação de token para encaminhamento de rotas


  return (
    <NavigationContainer>
      <Navigator initialRouteName='Principal' screenOptions={{
        headerShown:false,
      }}>
        <Screen name='Inicio' component={Inicio} />
        <Screen name='Login' component={Login} />
        <Screen name='Cadastro' component={Cadastro} />
        <Screen name='Principal' component={Principal} />
        <Screen name='Alertas' component={Alertas}/>
        <Screen name='LocalizacoesSalvas' component={Previsoes}/>
      </Navigator>
    </NavigationContainer>
  );
}


