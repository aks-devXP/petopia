import { Stack } from "expo-router";

export default function BreedStackLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // no top header
            }}
        />
    );
}
