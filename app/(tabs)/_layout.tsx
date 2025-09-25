import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { router } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="saudefisica"
        options={{
          title: "Saúde Física",
          tabBarIcon: ({ size }) => <Ionicons name="barbell" size={size} />,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ paddingHorizontal: 12 }}>
              <Ionicons name="arrow-back" size={24} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
