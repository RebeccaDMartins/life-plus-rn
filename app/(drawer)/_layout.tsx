import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
    return (
        <Drawer
            initialRouteName="dashboard" 
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: "#6B4EFF",
                drawerLabelStyle: { fontSize: 15 },
            }}
        >
            <Drawer.Screen
                name="dashboard"
                options={{
                    drawerLabel: "Início",
                    title: "Início",
                    drawerIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />

            <Drawer.Screen name="saudefisica" options={{ drawerLabel: "Saúde física", title: "Saúde física", drawerIcon: ({ size, color }) => <Ionicons name="barbell" size={size} color={color} /> }} />
            <Drawer.Screen name="saudemental" options={{ drawerLabel: "Saúde mental", title: "Saúde mental", drawerIcon: ({ size, color }) => <Ionicons name="happy" size={size} color={color} /> }} />
            <Drawer.Screen name="alimentacao" options={{ drawerLabel: "Alimentação", title: "Alimentação", drawerIcon: ({ size, color }) => <Ionicons name="nutrition" size={size} color={color} /> }} />
            <Drawer.Screen name="sono" options={{ drawerLabel: "Sono", title: "Sono", drawerIcon: ({ size, color }) => <Ionicons name="moon" size={size} color={color} /> }} />
            <Drawer.Screen name="ciclomenstrual" options={{ drawerLabel: "Ciclo menstrual", title: "Ciclo menstrual", drawerIcon: ({ size, color }) => <Ionicons name="calendar" size={size} color={color} /> }} />
            <Drawer.Screen name="tabagismo" options={{ drawerLabel: "Tabagismo", title: "Tabagismo", drawerIcon: ({ size, color }) => <Ionicons name="leaf" size={size} color={color} /> }} />
            <Drawer.Screen name="relatorios" options={{ drawerLabel: "Relatórios", title: "Relatórios", drawerIcon: ({ size, color }) => <Ionicons name="stats-chart" size={size} color={color} /> }} />
            <Drawer.Screen name="perfil" options={{ drawerLabel: "Perfil", title: "Perfil", drawerIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} /> }} />
        </Drawer>
    );
}
