import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Card, Screen, Spacer, Subtitle, Title } from "../components/ui";

export default function Home() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Title>Life Plus</Title>
        <Spacer h={6} />
        <Subtitle>Evoluir com leveza e propósito.</Subtitle>

        <Spacer h={20} />
        <Card>
          <Link href="/login" asChild>
            <Button variant="primary" full>Entrar</Button>
          </Link>

          <Spacer />
          <Link href="/cadastro" asChild>
            <Button variant="ghost" full>Criar conta</Button>
          </Link>
        </Card>
      </View>
    </Screen>
  );
}
