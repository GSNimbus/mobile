import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { previsaoResponse } from "../../../../util/interfaces";


interface PrevisoesProps {
    previsoes: previsaoResponse[];
}


export default function Previsoes() {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };



    return (
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#5C7FA2', borderRadius: 10, padding: 20, width: '100%', position: 'relative' }}>
            <Pressable onPress={toggleShow}>
                <FontAwesome name="arrow-up" size={28} color="#fff" />
            </Pressable>
            <View style={{ display: show ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20 }}>
                <Text style={{ color: '#fff', fontSize: 24 }}>Previsões</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Previsão 1: Ensolarado, 25°C</Text>
            </View>
        </View>
    )
}
