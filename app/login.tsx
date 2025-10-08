import { router } from "expo-router";
import { useState } from "react";
import { Button, Card, Input, Screen, Spacer, Title } from "../components/ui";

export default function Login() {
  const [email, setEmail] = useState(""); const [senha, setSenha] = useState("");
  function handleLogin() { router.push("/(tabs)/saudefisica"); }
  return (
    <Screen>
      <Title>Entrar</Title><Spacer />
      <Card>
        <Input placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Spacer /><Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <Spacer /><Button onPress={handleLogin}>Entrar</Button>
      </Card>
    </Screen>
  );
}
