import { router } from "expo-router";
import { useState } from "react";
import { Button, Card, Input, Screen, Spacer, Title } from "../../components/ui";

export default function Cadastro() {
  const [nome, setNome] = useState(""); const [email, setEmail] = useState(""); const [senha, setSenha] = useState("");
  function handleCadastro() {
  alert("Cadastro realizado com sucesso! Faça login para continuar.");
  router.replace("/(auth)/login");
}

  return (
    <Screen>
      <Title>Criar conta</Title><Spacer />
      <Card>
        <Input placeholder="Nome" value={nome} onChangeText={setNome} />
        <Spacer /><Input placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Spacer /><Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <Spacer /><Button onPress={handleCadastro}>Cadastrar e entrar</Button>
      </Card>
    </Screen>
  );
}
