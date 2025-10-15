import { Alert, Text } from "react-native";
import { Button, Card, Screen, Spacer, Title } from "../../components/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Perfil() {
    async function limpar() {
        await AsyncStorage.clear();
        Alert.alert("Suas informações foram apagadas!");
    }
    function sair() {
        router.dismissAll(); 
        router.replace("/"); 
    }

    return (
        <Screen>
            <Title>Perfil</Title><Spacer />
            <Card>
                <Text style={{ marginBottom: 12 }}>Ações</Text>
                <Button variant="ghost" onPress={limpar}>Limpar dados locais</Button>
                <Spacer />
                <Button variant="accent" onPress={sair}>Sair</Button>
            </Card>
        </Screen>
    );
}
