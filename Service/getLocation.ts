import * as Location from 'expo-location';

export default async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Permissão de localização não concedida');
    return null;
  }
  try {
    return await Location.getCurrentPositionAsync({});
  } catch (error) {
    console.warn('Falha ao obter localização:', error);
    return null;
  }
}