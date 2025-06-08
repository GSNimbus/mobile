import { useCallback } from "react";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Method } from "axios";
import AuthorizedCaller from "./AuthorizedCaller";
import { bairroInterface } from "../util/interfaces";
import { RootStackParamList } from "../util/types";
import type { LocationObjectCoords } from "expo-location";

export default function usePostToLocalizacao() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Inicio">>();
  const authorizedRequest = AuthorizedCaller();

  return useCallback(
    async (coords?: LocationObjectCoords): Promise<bairroInterface | null> => {
      if (!coords?.latitude || !coords?.longitude) {
        ToastAndroid.show("Coordenadas inválidas.", ToastAndroid.SHORT);
        return null;
      }

      console.log(coords.latitude, coords.longitude)

      try {
        // faz POST /localizacao via AuthorizedCaller
        return await authorizedRequest<bairroInterface>(
          "POST" as Method,
          `/localizacao`,
          {
            latitude: coords.latitude.toFixed(3),
            longitude: coords.longitude.toFixed(3),
          }
        );
      } catch (error: any) {
        console.log("Erro no post to localização!")
        return null;
      }
    },
    [authorizedRequest, navigation]
  );
}