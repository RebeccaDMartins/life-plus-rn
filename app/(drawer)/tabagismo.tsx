import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Keyboard, Text, TextInput } from "react-native";
import { Button, Card, Input, Row, Screen, Spacer, Title } from "../../components/ui";
import { load, save } from "../../lib/storage";

type TabagismoData = {
    fumando: boolean;
    /** maços por dia (não cigarros) */
    cigsDia?: number;          // opcional
    /** preço do maço em R$ */
    precoMaco?: number;        // opcional
    /** cigarros por maço (ex.: 20) */
    cigsPorMaco?: number;      // opcional
    /** ISO date YYYY-MM-DD */
    dataParada?: string;
};

const STORAGE_KEY = "tabagismo:settings";

export default function Tabagismo() {
    const [data, setData] = useState<TabagismoData>({
        fumando: true,
        cigsDia: undefined,
        precoMaco: undefined,
        cigsPorMaco: undefined,
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

    // transforma string em número OU undefined quando vazio
    function parseOptionalNumber(v: string): number | undefined {
        const raw = v.trim();
        if (!raw) return undefined;
        const n = Number(raw.replace(",", "."));
        return Number.isFinite(n) ? n : undefined;
    }

    // gasto diário = maços/dia * preço do maço
    const dailyCost = useMemo(() => {
        if (!data.fumando) return 0;
        if (data.cigsDia == null || data.precoMaco == null) return 0;
        return data.cigsDia * data.precoMaco;
    }, [data.fumando, data.cigsDia, data.precoMaco]);

    // estatísticas quando PAROU de fumar
    const quitStats = useMemo(() => {
        if (data.fumando || !data.dataParada) return null;
        const start = new Date(data.dataParada);
        if (isNaN(start.getTime())) return null;

        const today = new Date();
        const days = Math.max(0, Math.floor((+today - +start) / 86400000));

        const macosDia = data.cigsDia ?? 0;               // maços/dia
        const cigsPorMaco = data.cigsPorMaco ?? 20;       // default 20
        const preco = data.precoMaco ?? 0;

        const cigsAvoided = days * macosDia * cigsPorMaco;
        const saved = days * macosDia * preco;

        return { days, cigsAvoided, saved };
    }, [data.fumando, data.dataParada, data.cigsDia, data.cigsPorMaco, data.precoMaco]);

    async function handleSalvar() {
        cigsDiaRef.current?.blur();
        precoRef.current?.blur();
        cigsMacoRef.current?.blur();
        dataParadaRef.current?.blur();
        Keyboard.dismiss();

        await save(STORAGE_KEY, {
            fumando: data.fumando,
            cigsDia: data.cigsDia,               
            precoMaco: data.precoMaco,
            cigsPorMaco: data.cigsPorMaco,
            dataParada: (data.dataParada || "").trim() || undefined,
        });

        Alert.alert("Pronto!", "Preferências salvas.");
    }

    function toggleFumando() {
        setData((d) => ({ ...d, fumando: !d.fumando }));
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
                    placeholder="Quantos maços por dia? (ex.: 0.5, 1, 2)"
                    keyboardType="decimal-pad"
                    value={data.cigsDia?.toString() ?? ""}
                    onChangeText={(v) => setData((d) => ({ ...d, cigsDia: parseOptionalNumber(v) }))}
                />

                <Spacer />
                <Input
                    ref={precoRef}
                    placeholder="Valor de cada maço (R$)"
                    keyboardType="decimal-pad"
                    value={data.precoMaco?.toString() ?? ""}
                    onChangeText={(v) => setData((d) => ({ ...d, precoMaco: parseOptionalNumber(v) }))}
                />

                <Spacer />
                <Input
                    ref={cigsMacoRef}
                    placeholder="Quantos cigarros há em cada maço? (ex.: 20)"
                    keyboardType="number-pad"
                    value={data.cigsPorMaco?.toString() ?? ""}
                    onChangeText={(v) => setData((d) => ({ ...d, cigsPorMaco: parseOptionalNumber(v) }))}
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
                            onChangeText={(v) => setData((d) => ({ ...d, dataParada: v }))}
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
                        <Text>Gasto diário estimado: {dailyCost > 0 ? `R$ ${dailyCost.toFixed(2)}` : "—"}</Text>
                        <Text>Gasto mensal (≈30 dias): {dailyCost > 0 ? `R$ ${(dailyCost * 30).toFixed(2)}` : "—"}</Text>
                    </>
                ) : quitStats ? (
                    <>
                        <Text>Dias sem fumar: {quitStats.days}</Text>
                        <Text>Cigarros evitados: {quitStats.cigsAvoided}</Text>
                        <Text>Economia estimada: R$ {quitStats.saved.toFixed(2)}</Text>
                    </>
                ) : (
                    <Text>Informe a data em que parou (e os parâmetros) para ver o progresso.</Text>
                )}
            </Card>
        </Screen>
    );
}
