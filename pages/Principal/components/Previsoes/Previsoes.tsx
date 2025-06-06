import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { previsaoResponse } from "../../../../util/interfaces";



interface PrevisoesProps {
    previsoes: previsaoResponse[];
}


export default function Previsoes({previsoes} : PrevisoesProps) {


    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

   
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#5C7FA2', borderRadius: 10, padding: 20, width: '100%', position: 'relative', marginBottom: 30 }}>
            <Pressable onPress={toggleShow}>
                <FontAwesome name="arrow-up" size={28} color="#fff" />
            </Pressable>
            <View style={{ display: show ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20, width: '100%' }}>
                <Text style={{ color: '#fff', fontSize: 24 }}>Previsões</Text>
                <ScrollView style={{width: '100%'}}>
                {previsoes.length === 0 ? (
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: "center" }}>Nenhum grupo de localização encontrado</Text>
                ) : 
                previsoes.map((previsao, index) => (
                    <View key={index} style={{
                        backgroundColor: "#7C94AC",
                        borderRadius: 8, 
                        padding: 16,
                        gap: 5,
                        alignSelf: 'center',
                        width: '80%'
                    }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{previsao.idBairro.nome}</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{previsao.temperature2M}º</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{previsao.precipitation === 0 ? 'Sem chuva' : previsao.precipitation}</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{previsao.time}</Text>

                        </View>
                    ))
                    
                }

                </ScrollView>
            </View>
        </View>
    )
}
