import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { Button, Card, Input, Row, Screen, Spacer, Title } from "../../components/ui";
import { save, load } from "../../lib/storage";

type SaudeFisicaData = { agua: number; atividade: string; };
const STORAGE_KEY = "saudeFisica:hoje";

export default function SaudeFisica() {
  const [agua, setAgua] = useState(0);
  const [atividade, setAtividade] = useState("");

  useEffect(() => { (async () => {
    const data = await load<SaudeFisicaData>(STORAGE_KEY);
    if (data) { setAgua(data.agua); setAtividade(data.atividade); }
  })(); }, []);

  async function handleSalvar() {
    await save(STORAGE_KEY, { agua, atividade });
    Alert.alert("Pronto!", "Seus dados foram salvos no dispositivo.");
  }

  return (
    <Screen>
      <Title>Saúde Física</Title><Spacer />
      <Card>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Ingestão de água (copos)</Text>
        <Row wrap gap={8}>
          {[1,2,3,4,5,6,7,8].map(n => (
            <Button key={n} variant={agua >= n ? "primary" : "ghost"} onPress={() => setAgua(n)}>{String(n)}</Button>
          ))}
        </Row>

        <Spacer />
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Atividade de hoje</Text>
        <Input placeholder="Ex.: Caminhada 30min" value={atividade} onChangeText={setAtividade} />
        <Spacer /><Button variant="accent" onPress={handleSalvar}>Salvar</Button>
      </Card>
    </Screen>
  );
}
