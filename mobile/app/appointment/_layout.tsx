// app/appointment/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function AppointmentStackLayout() {
    const isDark = useColorScheme() === "dark";

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                title: "Appointment",
                headerShadowVisible: false,
                // Header colors
                headerStyle: { backgroundColor: isDark ? "#000000" : "#FFFFFF" },
                headerTitleStyle: { color: isDark ? "#FFFFFF" : "#000000" },
                headerTintColor: isDark ? "#FFFFFF" : "#000000", // back arrow & icons
                // Page background (prevents white flash)
                contentStyle: { backgroundColor: isDark ? "#000000" : "#FFFFFF" },
                // Status bar icons color (Expo Router supports this)
                statusBarStyle: isDark ? "light" : "dark",
            }}
        />
    );
}
