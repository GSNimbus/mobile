import * as Location from 'expo-location';



export default async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      return location;
    }