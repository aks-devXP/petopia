import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export const unstable_settings = {
    initialRouteName: "index",
};

export default function SettingsLayout() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDark ? "#000" : "#fff",
                },
                headerShadowVisible: false,
                headerTintColor: isDark ? "#fff" : "#000",
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "600",
                },
                contentStyle: {
                    backgroundColor: isDark ? "#000" : "#fff",
                },
                headerBackTitle: "",
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Settings",
                    headerShown: false,
                }}
            />
            <Stack.Screen name="about" options={{ title: "About Us" }} />
            <Stack.Screen name="help" options={{ title: "Help & Support" }} />
            <Stack.Screen name="privacy" options={{ title: "Privacy & Security" }} />
            <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />

            {/* ✅ Let appointments handle its own header */}
            <Stack.Screen name="appointments" options={{ headerShown: false }} />

            <Stack.Screen name="pets" options={{ title: "My Pets" }} />
            <Stack.Screen
                name="medical-history"
                options={{ title: "Medical History" }}
            />
        </Stack>
    );
}
