import { setCustomText } from "react-native-global-props";
import { Text } from "react-native";
import { useAppFonts } from "./fonts";
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
    const fontsLoaded = useAppFonts();
    if (!fontsLoaded) return null;

    setCustomText({
        style: {
            fontFamily: "NunitoSans_400Regular",
        },
    });

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
