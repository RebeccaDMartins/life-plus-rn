import { useEffect, useState, useRef } from "react";
import { Alert, Text, Keyboard, TextInput } from "react-native";
import { Button, Card, Input, Screen, Spacer, Title } from "../../components/ui";
import { load, save } from "../../lib/storage";

const STORAGE_KEY = "sono:hoje";

export default function Sono() {
    const [horas, setHoras] = useState<string>("");
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        (async () => {
            const d = await load<string>(STORAGE_KEY);
            if (d) setHoras(d);
        })();
    }, []);

    async function handleSalvar() {
        // 1) Tira o foco do TextInput e fecha o teclado
        inputRef.current?.blur();
        Keyboard.dismiss();

        // 2) Salva
        await save(STORAGE_KEY, horas);

        // 3) Feedback
        Alert.alert("Pronto!", "Registro salvo.");
    }

    return (
        <Screen>
            <Title>Sono</Title>
            <Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Horas dormidas</Text>
                <Input
                    ref={inputRef}
                    placeholder="Ex.: 7.5"
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={horas}
                    onChangeText={setHoras}
                />
                <Spacer />
                <Button onPress={handleSalvar}>Salvar</Button>
            </Card>
        </Screen>
    );
}
