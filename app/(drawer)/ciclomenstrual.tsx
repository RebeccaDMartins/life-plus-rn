import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Keyboard, Text, TextInput } from "react-native";
import { Button, Card, Input, Screen, Spacer, Title } from "../../components/ui";
import { load, save } from "../../lib/storage";

type CicloData = {
    ultimaMenstruacao: string; 
    duracaoCiclo: number;      
    duracaoFluxo: number;     
};

const STORAGE_KEY = "ciclo:settings";

function parseISO(s?: string) {
    if (!s) return null;
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
}

function addDays(d: Date, days: number) {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

function format(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
}

export default function CicloMenstrual() {
    const [data, setData] = useState<CicloData>({
        ultimaMenstruacao: "",
        duracaoCiclo: 28,
        duracaoFluxo: 5,
    });

    const umRef = useRef<TextInput>(null);
    const cicloRef = useRef<TextInput>(null);
    const fluxoRef = useRef<TextInput>(null);

    useEffect(() => {
        (async () => {
            const saved = await load<CicloData>(STORAGE_KEY);
            if (saved) setData(saved);
        })();
    }, []);

    function parseNum(v: string) {
        const n = Number(String(v).replace(",", "."));
        return Number.isFinite(n) ? n : 0;
    }

    const calculos = useMemo(() => {
        const start = parseISO(data.ultimaMenstruacao);
        const ciclo = data.duracaoCiclo || 28;
        if (!start) return null;


        const proxima = addDays(start, ciclo);


        const ovulacao = addDays(proxima, -14);


        const fertilIni = addDays(ovulacao, -5);
        const fertilFim = addDays(ovulacao, +1);

        const hoje = new Date();
        const diasAteProx = Math.max(0, Math.ceil((+proxima - +hoje) / 86400000));

        return {
            proxima: format(proxima),
            ovulacao: format(ovulacao),
            fertilIni: format(fertilIni),
            fertilFim: format(fertilFim),
            diasAteProx,
        };
    }, [data]);

    async function handleSalvar() {
        umRef.current?.blur();
        cicloRef.current?.blur();
        fluxoRef.current?.blur();
        Keyboard.dismiss();

        await save(STORAGE_KEY, {
            ultimaMenstruacao: data.ultimaMenstruacao.trim(),
            duracaoCiclo: Number(data.duracaoCiclo) || 28,
            duracaoFluxo: Number(data.duracaoFluxo) || 5,
        });

        Alert.alert("Pronto!", "Informações salvas.");
    }

    return (
        <Screen>
            <Title>Ciclo menstrual</Title>
            <Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Informações básicas</Text>
                <Input
                    ref={umRef}
                    placeholder="Última menstruação (YYYY-MM-DD)"
                    autoCapitalize="none"
                    keyboardType="numbers-and-punctuation"
                    value={data.ultimaMenstruacao}
                    onChangeText={v => setData(d => ({ ...d, ultimaMenstruacao: v }))}
                />
                <Spacer />
                <Input
                    ref={cicloRef}
                    placeholder="Duração do ciclo (ex.: 28)"
                    keyboardType="number-pad"
                    value={String(data.duracaoCiclo ?? "")}
                    onChangeText={v => setData(d => ({ ...d, duracaoCiclo: parseNum(v) }))}
                />
                <Spacer />
                <Input
                    ref={fluxoRef}
                    placeholder="Duração do fluxo (ex.: 5)"
                    keyboardType="number-pad"
                    value={String(data.duracaoFluxo ?? "")}
                    onChangeText={v => setData(d => ({ ...d, duracaoFluxo: parseNum(v) }))}
                />
                <Spacer />
                <Button variant="accent" onPress={handleSalvar}>Salvar</Button>
            </Card>

            <Spacer />
            <Card>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Previsões (estimativa)</Text>
                {calculos ? (
                    <>
                        <Text>Próxima menstruação: {calculos.proxima} (em {calculos.diasAteProx} dias)</Text>
                        <Text>Ovulação estimada: {calculos.ovulacao}</Text>
                        <Text>Janela fértil: {calculos.fertilIni} até {calculos.fertilFim}</Text>
                        <Spacer />
                        <Text style={{ fontSize: 12, color: "#555" }}>
                            Aviso: estimativas simples com base na média informada. Não substitui orientação médica.
                        </Text>
                    </>
                ) : (
                    <Text>Preencha a data da última menstruação para ver as estimativas.</Text>
                )}
            </Card>
        </Screen>
    );
}
