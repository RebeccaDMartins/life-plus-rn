import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Card, Screen, Spacer, Title } from "../../components/ui";
import { load } from "../../lib/storage";
import { colors } from "../../theme/colors";
// opcional (se instalou chart-kit):
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function Relatorios() {
    const [agua, setAgua] = useState<number>(0);
    const [humor, setHumor] = useState<string>("-");
    const [sono, setSono] = useState<string>("-");

    useEffect(() => {
        (async () => {
            const f = await load<{ agua: number; atividade: string }>("saudeFisica:hoje");
            const m = await load<{ mood: string; note: string }>("saudeMental:hoje");
            const s = await load<string>("sono:hoje");
            setAgua(f?.agua ?? 0);
            setHumor(m?.mood ?? "-");
            setSono(s ?? "-");
        })();
    }, []);

    const width = Dimensions.get("window").width - 32; // margem aproximada

    return (
        <Screen>
            <Title>Relatórios</Title><Spacer />
            <Card>
                <Text style={{ fontWeight: "700" }}>Resumo de hoje</Text>
                <Spacer />
                <View style={{ gap: 8 }}>
                    <Text>Água: {agua} copos</Text>
                    <Text>Humor: {humor}</Text>
                    <Text>Sono: {sono} h</Text>
                </View>
            </Card>

            <Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Tendência (exemplo)</Text>
                <LineChart
                    data={{ labels: ["Seg", "Ter", "Qua", "Qui", "Sex"], datasets: [{ data: [2, 4, 6, 5, 7] }] }}
                    width={width}
                    height={180}
                    chartConfig={{
                        backgroundGradientFrom: colors.surface,
                        backgroundGradientTo: colors.surface,
                        decimalPlaces: 0,
                        color: (o = 1) => `rgba(78,175,228,${o})`,
                        labelColor: () => colors.subtext,
                    }}
                    bezier
                    style={{ borderRadius: 12 }}
                />
            </Card>
        </Screen>
    );
}
