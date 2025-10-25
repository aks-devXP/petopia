import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AppointmentsLayout() {
    const isDark = useColorScheme() === "dark";

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: isDark ? "#000" : "#fff" },
                headerShadowVisible: false,
                headerTintColor: isDark ? "#fff" : "#000",
                headerTitleStyle: { fontSize: 18, fontWeight: "600" },
                contentStyle: { backgroundColor: isDark ? "#000" : "#fff" },
                headerBackTitle: "",
            }}
        >
            <Stack.Screen name="index" options={{ title: "Appointments" }} />
            <Stack.Screen name="[id]" options={{ title: "Appointment Details" }} />
        </Stack>
    );
}
