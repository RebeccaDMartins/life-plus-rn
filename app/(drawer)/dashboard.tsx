// app/(drawer)/dashboard.tsx
import { Text } from "react-native";
import { Screen, Title, Card, Spacer, Button, Row } from "../../components/ui";
import { Link } from "expo-router";

export default function Dashboard() {
    return (
        <Screen>
            <Title>Bem-vinda ao Life Plus</Title>
            <Spacer />
            <Card>
                <Text style={{ marginBottom: 12 }}>
                    Resumo rápido e atalhos:
                </Text>
                <Row gap={12} wrap>
                    <Link href="/(drawer)/saudefisica" asChild><Button variant="ghost">Saúde Física</Button></Link>
                    <Link href="/(drawer)/saudemental" asChild><Button variant="ghost">Saúde Mental</Button></Link>
                    <Link href="/(drawer)/sono" asChild><Button variant="ghost">Sono</Button></Link>
                    <Link href="/(drawer)/ciclomenstrual" asChild><Button variant="ghost">Ciclo</Button></Link>
                    <Link href="/(drawer)/tabagismo" asChild><Button variant="ghost">Tabagismo</Button></Link>
                    <Link href="/(drawer)/relatorios" asChild><Button variant="ghost">Relatórios</Button></Link>
                </Row>
            </Card>
        </Screen>
    );
}
