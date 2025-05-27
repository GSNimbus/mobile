import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Inicio from './pages/Inicio/Inicio';

import { RootStackParamList } from './util/types';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';

const {Navigator,Screen} = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName='Inicio' screenOptions={{
        headerShown:false,
      }}>
        <Screen name='Inicio' component={Inicio} />
        <Screen name='Login' component={Login} />
        <Screen name='Cadastro' component={Cadastro} />
      </Navigator>
    </NavigationContainer>
  );
}


