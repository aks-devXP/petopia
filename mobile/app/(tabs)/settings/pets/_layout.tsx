import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function PetsLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <Stack
      screenOptions={{
        headerShown: false,                 
        contentStyle: { backgroundColor: isDark ? "#000" : "#fff" },
      }}
    >
      {/* headers are hidden for both; parent header "My Pets" stays */}
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
