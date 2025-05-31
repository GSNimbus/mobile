import { View, Text, ScrollView } from "react-native";
import React, { useReducer } from "react";
import { RootStackParamList } from "../../util/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import UserField from "../Perfil/components/UserField";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header/Header";
import { styles } from "../../styles/styles";
import Botao from "../../components/Botao/Botao";
import InputLabel from "../../components/InputArea/InputLabel";

type FormState = {
  nome: string;
  email: string;
  senha: string;
  cep: string;
  pais: string;
  estado: string;
  cidade: string;
};

type Action = { field: keyof FormState; value: string };

const initialState: FormState = {
  nome: "",
  email: "",
  senha: "",
  cep: "",
  pais: "",
  estado: "",
  cidade: "",
};

function formReducer(state: FormState, action: Action): FormState {
  return { ...state, [action.field]: action.value };
}

const AlterarPerfil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "AlterarPerfil">>();
   const [form, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field: keyof FormState) => (value: string) =>
    dispatch({ field, value });

  const handleSubmit = () => {
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
                <InputLabel title="Nome completo" value={form.nome} setValue={handleChange('nome')}  />
                <InputLabel title="Email" value={form.email} setValue={handleChange('email')}   />
                <InputLabel title="Senha" value={form.senha} setValue={handleChange('senha') } />
                <InputLabel title="Cep" value={form.cep} setValue={handleChange('cep')}  />
                <InputLabel title="Pais" value={form.pais} setValue={handleChange('pais')}  />
                <InputLabel title="Estado" value={form.estado} setValue={handleChange('estado')}  />
                <InputLabel title="Cidade" value={form.cidade} setValue={handleChange('cidade')}  />
            </View>
            <Botao title="Salvar" size="medium" action={handleSubmit} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AlterarPerfil;
