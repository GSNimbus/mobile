import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../styles/styles';

interface UserFieldProps {
    titulo: string;
    valor : string;
    isPassword? : boolean
}

const UserField = ({titulo, valor} : UserFieldProps) => {
  return (
    <View style={{gap: 2}}>
      <Text style={[styles.paragraph, {fontWeight: 'bold', fontSize: 20}]}>{titulo}</Text>
      <Text style={[styles.paragraph, {}]}>{valor}</Text>
    </View>
  )
}

export default UserField