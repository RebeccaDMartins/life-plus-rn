import { Link, router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { Button, Card, Input, Screen, Spacer, Title } from "../components/ui";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

function handleLogin() {
  router.push("/saudefisica");
}


  return (
    <Screen>
      <Title>Entrar</Title>
      <Spacer />
      <Card>
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Spacer />
        <Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <Spacer />
        <Button onPress={handleLogin}>Entrar</Button>
        <Spacer />
        <Link href="/cadastro">
          <Text style={{ textAlign: "center" }}>Criar conta</Text>
        </Link>
      </Card>
    </Screen>
  );
}
