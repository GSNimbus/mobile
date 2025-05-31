import axios from "axios";
import { ToastAndroid } from "react-native";
import * as Location from 'expo-location';


export default async function postToLocalizacao(cords : Location.LocationObjectCoords | undefined){
    try{
        const { latitude, longitude } = cords || {};
        if (latitude === undefined || longitude === undefined) {
            ToastAndroid.show("Coordenadas inválidas.", ToastAndroid.SHORT);
            return;
        }
        const res = await axios.post('https://api.example.com/Localizacao', {
            nr_longitude: longitude,
            nr_latitude: latitude
        } )
        if (res.status === 200) {
            ToastAndroid.show("Localização postada com sucesso!", ToastAndroid.SHORT);
            return res.data; 
        } else {
            ToastAndroid.show("Erro ao postar localização.", ToastAndroid.SHORT);
        }
    }catch(error) {
        ToastAndroid.show("Erro ao postar localização:", ToastAndroid.SHORT);
        throw error; // Re-throw the error for further handling if needed
    }
}