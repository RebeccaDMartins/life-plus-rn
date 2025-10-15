import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { Button, Card, Input, Row, Screen, Spacer, Title } from "../../components/ui";
import { save, load } from "../../lib/storage";

type Mood = "😞" | "😐" | "🙂" | "😄" | "🤩";
type MentalData = { mood: Mood | null; note: string; };
const STORAGE_KEY = "saudeMental:hoje";

export default function SaudeMental() {
    const [mood, setMood] = useState<Mood | null>(null);
    const [note, setNote] = useState("");

    useEffect(() => {
        (async () => {
            const data = await load<MentalData>(STORAGE_KEY);
            if (data) { setMood(data.mood); setNote(data.note); }
        })();
    }, []);

    async function handleSalvar() {
        await save(STORAGE_KEY, { mood, note });
        Alert.alert("Tudo certo!", "Seu registro foi salvo.");
    }

    const emojis: Mood[] = ["😞", "😐", "🙂", "😄", "🤩"];

    return (
        <Screen>
            <Title>Saúde Mental</Title><Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Como você se sente hoje?</Text>
                <Row gap={10} wrap>
                    {emojis.map(e => (
                        <Button key={e} variant={mood === e ? "accent" : "ghost"} onPress={() => setMood(e)}>{e}</Button>
                    ))}
                </Row>
                <Spacer />
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Observações</Text>
                <Input placeholder="Escreva algo que queira registrar" value={note} onChangeText={setNote} />
                <Spacer /><Button onPress={handleSalvar}>Salvar</Button>
            </Card>
        </Screen>
    );
}
