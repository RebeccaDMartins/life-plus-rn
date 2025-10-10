import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Keyboard, Text, TextInput } from "react-native";
import { Button, Card, Input, Row, Screen, Spacer, Title } from "../../components/ui";
import { load, save } from "../../lib/storage";

type TabagismoData = {
    fumando: boolean;       
    cigsDia: number;         
    precoMaco: number;      
    cigsPorMaco: number;     
    dataParada?: string;     
};

const STORAGE_KEY = "tabagismo:settings";

export default function Tabagismo() {
    const [data, setData] = useState<TabagismoData>({
        fumando: true,
        cigsDia: 10,
        precoMaco: 12,
        cigsPorMaco: 20,
        dataParada: "",
    });

    const cigsDiaRef = useRef<TextInput>(null);
    const precoRef = useRef<TextInput>(null);
    const cigsMacoRef = useRef<TextInput>(null);
    const dataParadaRef = useRef<TextInput>(null);

    useEffect(() => {
        (async () => {
            const saved = await load<TabagismoData>(STORAGE_KEY);
            if (saved) setData(saved);
        })();
    }, []);

    function parseNum(v: string) {
        const n = Number(String(v).replace(",", "."));
        return Number.isFinite(n) ? n : 0;
    }

    // Cálculos
    const dailyCost = useMemo(() => {
        if (!data.fumando) return 0;
        return (data.cigsDia / (data.cigsPorMaco || 20)) * (data.precoMaco || 0);
    }, [data]);

    const quitStats = useMemo(() => {
        if (data.fumando || !data.dataParada) return null;
        const start = new Date(data.dataParada);
        if (isNaN(start.getTime())) return null;
        const today = new Date();
        const days = Math.max(0, Math.floor((+today - +start) / 86400000));
        const cigsAvoided = days * (data.cigsDia || 0);
        const saved = (cigsAvoided / (data.cigsPorMaco || 20)) * (data.precoMaco || 0);
        return { days, cigsAvoided, saved };
    }, [data]);

    async function handleSalvar() {
        cigsDiaRef.current?.blur();
        precoRef.current?.blur();
        cigsMacoRef.current?.blur();
        dataParadaRef.current?.blur();
        Keyboard.dismiss();

        await save(STORAGE_KEY, {
            ...data,
            cigsDia: Number(data.cigsDia) || 0,
            precoMaco: Number(data.precoMaco) || 0,
            cigsPorMaco: Number(data.cigsPorMaco) || 20,
            dataParada: data.dataParada?.trim() || "",
        });

        Alert.alert("Pronto!", "Preferências salvas.");
    }

    function toggleFumando() {
        setData(d => ({ ...d, fumando: !d.fumando }));
    }

    return (
        <Screen>
            <Title>Tabagismo</Title>
            <Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Status</Text>
                <Row gap={10}>
                    <Button variant={data.fumando ? "accent" : "ghost"} onPress={toggleFumando}>Fumando</Button>
                    <Button variant={!data.fumando ? "accent" : "ghost"} onPress={toggleFumando}>Parei</Button>
                </Row>

                <Spacer />
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Parâmetros</Text>
                <Input
                    ref={cigsDiaRef}
                    placeholder="Cigarros por dia (ex.: 10)"
                    keyboardType="number-pad"
                    value={String(data.cigsDia ?? "")}
                    onChangeText={v => setData(d => ({ ...d, cigsDia: parseNum(v) }))}
                />
                <Spacer />
                <Input
                    ref={precoRef}
                    placeholder="Preço do maço (R$)"
                    keyboardType="decimal-pad"
                    value={String(data.precoMaco ?? "")}
                    onChangeText={v => setData(d => ({ ...d, precoMaco: parseNum(v) }))}
                />
                <Spacer />
                <Input
                    ref={cigsMacoRef}
                    placeholder="Cigarros por maço (geralmente 20)"
                    keyboardType="number-pad"
                    value={String(data.cigsPorMaco ?? "")}
                    onChangeText={v => setData(d => ({ ...d, cigsPorMaco: parseNum(v) }))}
                />

                {!data.fumando && (
                    <>
                        <Spacer />
                        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Data em que parou (YYYY-MM-DD)</Text>
                        <Input
                            ref={dataParadaRef}
                            placeholder="Ex.: 2025-10-01"
                            autoCapitalize="none"
                            keyboardType="numbers-and-punctuation"
                            value={data.dataParada ?? ""}
                            onChangeText={v => setData(d => ({ ...d, dataParada: v }))}
                        />
                    </>
                )}

                <Spacer />
                <Button variant="accent" onPress={handleSalvar}>Salvar</Button>
            </Card>

            <Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Resumo</Text>
                {data.fumando ? (
                    <>
                        <Text>Gasto diário estimado: R$ {dailyCost.toFixed(2)}</Text>
                        <Text>Gasto mensal (≈30 dias): R$ {(dailyCost * 30).toFixed(2)}</Text>
                    </>
                ) : quitStats ? (
                    <>
                        <Text>Dias sem fumar: {quitStats.days}</Text>
                        <Text>Cigarros evitados: {quitStats.cigsAvoided}</Text>
                        <Text>Economia estimada: R$ {quitStats.saved.toFixed(2)}</Text>
                    </>
                ) : (
                    <Text>Informe a data em que parou para ver seu progresso.</Text>
                )}
            </Card>
        </Screen>
    );
}
