import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="saudefisica"   options={{ title: "Física",   tabBarIcon: ({size,color}) => <Ionicons name="barbell" size={size} color={color} /> }} />
      <Tabs.Screen name="saudemental"   options={{ title: "Mental",   tabBarIcon: ({size,color}) => <Ionicons name="happy"   size={size} color={color} /> }} />
      <Tabs.Screen name="alimentacao"   options={{ title: "Aliment.", tabBarIcon: ({size,color}) => <Ionicons name="nutrition"size={size} color={color} /> }} />
      <Tabs.Screen name="sono"          options={{ title: "Sono",     tabBarIcon: ({size,color}) => <Ionicons name="moon"    size={size} color={color} /> }} />
      <Tabs.Screen name="relatorios"    options={{ title: "Relat.",   tabBarIcon: ({size,color}) => <Ionicons name="stats-chart" size={size} color={color} /> }} />
      <Tabs.Screen name="perfil"        options={{ title: "Perfil",   tabBarIcon: ({size,color}) => <Ionicons name="person"  size={size} color={color} /> }} />
    </Tabs>
  );
}
