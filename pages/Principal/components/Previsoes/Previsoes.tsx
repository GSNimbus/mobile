import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Pressable, FlatList, Text, View } from "react-native";
import { previsaoResponse } from "../../../../util/interfaces";
import { AuthContext } from "../../../../Service/ProfileContext";
import AuthorizedCaller from "../../../../Service/AuthorizedCaller";


export default function Previsoes() {
    
    const { userId } =  useContext(AuthContext)
    const authorizedRequest = AuthorizedCaller()
    const [previsoes, setPrevisoes] = useState<previsaoResponse[]>([])

    useEffect(() => {
        if (!userId) return;
    
        (async () => {
          try {
            const previsoes = await authorizedRequest<previsaoResponse[]>(
              "GET",
              `/previsao/usuario/${userId}`
            );
            setPrevisoes(previsoes);
          } catch (e: any) {
            console.log("Erro ao buscar previsões")
          }
        })();
      }, [userId, authorizedRequest]);


    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

   
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#5C7FA2', borderRadius: 10, padding: 20, width: '100%', position: 'relative', marginBottom: 30, paddingTop: show ? 50 : 20, paddingBottom: show ? 60 : 20 }}>
            <Pressable onPress={toggleShow}>
                <FontAwesome name="arrow-up" size={28} color="#fff" />
            </Pressable>
            <View style={{ display: show ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20, width: '100%' }}>
                <Text style={{ color: '#fff', fontSize: 24 }}>Previsões</Text>
                <FlatList
                    data={previsoes}
                    style={{ width: '100%' }}
                    contentContainerStyle={previsoes.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : { alignItems: 'center', paddingBottom: 20 }}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            backgroundColor: "#7C94AC",
                            borderRadius: 8,
                            padding: 16,
                            gap: 5,
                            alignSelf: 'center',
                            minWidth: 250,
                            maxWidth: 250, 
                            width: '100%'
                        }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.idBairro.nome}</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{item.temperature2M}º</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{item.precipitation === 0 ? 'Sem chuva' : item.precipitation}</Text>
                            <Text style={{ color: '#fff', fontSize: 18 }}>{item.time}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: "center" }}>Nenhum grupo de localização encontrado</Text>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{height: 20}} /> 
                    )}
                />

            </View>
        </View>
    )
}
