// app/(tabs)/settings/<PAGE>.tsx
import { View, Text } from "react-native";

export default function Page() {
    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-black px-6">
            <Text className="text-xl font-semibold text-black dark:text-white">
                Coming Soon
            </Text>
            <Text className="mt-2 text-neutral-600 dark:text-neutral-400 text-center">
                This is a placeholder for the <Text className="font-semibold">PAGE</Text> settings screen.
            </Text>
        </View>
    );
}
