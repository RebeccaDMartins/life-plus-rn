import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Card, Screen, Spacer, Title } from "../../components/ui";
import { load } from "../../lib/storage";

export default function Relatorios() {
    const [saudeFisica, setSaudeFisica] = useState<any>(null);
    const [sono, setSono] = useState<any>(null);
    const [tabagismo, setTabagismo] = useState<any>(null);
    const [ciclo, setCiclo] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const sf = await load("saudefisica:hoje");
            const s = await load("sono:hoje");
            const t = await load("tabagismo:settings");
            const c = await load("ciclo:settings");
            setSaudeFisica(sf);
            setSono(s);
            setTabagismo(t);
            setCiclo(c);
        })();
    }, []);

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Relatórios gerais</Title>
                <Spacer />

                {/* SAÚDE FÍSICA */}
                <Card>
                    <Text style={{ fontWeight: "700", marginBottom: 6 }}>Saúde física</Text>
                    {saudeFisica ? (
                        <>
                            <Text>Atividade de hoje: {saudeFisica?.atividade || "—"}</Text>
                            <Text>Minutos: {saudeFisica?.minutos || "—"}</Text>
                            <Text>Intensidade: {saudeFisica?.intensidade || "—"}</Text>
                        </>
                    ) : (
                        <Text>Nenhum registro de atividade física encontrado.</Text>
                    )}
                </Card>

                <Spacer />

                {/* SONO */}
                <Card>
                    <Text style={{ fontWeight: "700", marginBottom: 6 }}>Sono</Text>
                    {sono ? (
                        <>
                            <Text>Horas dormidas: {sono || "—"}</Text>
                        </>
                    ) : (
                        <Text>Nenhum registro de sono encontrado.</Text>
                    )}
                </Card>

                <Spacer />

                {/* TABAGISMO */}
                <Card>
                    <Text style={{ fontWeight: "700", marginBottom: 6 }}>Tabagismo</Text>
                    {tabagismo ? (
                        <>
                            <Text>Status: {tabagismo.fumando ? "Fumando" : "Parou"}</Text>
                            <Text>Maços por dia: {tabagismo.cigsDia}</Text>
                            <Text>Preço por maço: R$ {tabagismo.precoMaco}</Text>
                            <Text>Cigarros por maço: {tabagismo.cigsPorMaco}</Text>
                            {tabagismo.dataParada ? <Text>Data de parada: {tabagismo.dataParada}</Text> : null}
                        </>
                    ) : (
                        <Text>Nenhuma informação de tabagismo registrada.</Text>
                    )}
                </Card>

                <Spacer />

                {/* CICLO MENSTRUAL */}
                <Card>
                    <Text style={{ fontWeight: "700", marginBottom: 6 }}>Ciclo menstrual</Text>
                    {ciclo ? (
                        <>
                            <Text>Última menstruação: {ciclo.ultimaMenstruacao}</Text>
                            <Text>Duração do ciclo: {ciclo.duracaoCiclo} dias</Text>
                            <Text>Duração do fluxo: {ciclo.duracaoFluxo} dias</Text>
                        </>
                    ) : (
                        <Text>Nenhuma informação de ciclo registrada.</Text>
                    )}
                </Card>

                <Spacer />
            </ScrollView>
        </Screen>
    );
}
