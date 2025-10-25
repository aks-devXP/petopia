// app/(tabs)/settings/edit.tsx
import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function EditProfile() {
    const [name, setName] = useState("Aks • Petopia");
    const [handle, setHandle] = useState("@petopia.user");

    return (
        <View className="flex-1 bg-white dark:bg-black px-5 py-6">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Display Name
            </Text>
            <TextInput
                value={name}
                onChangeText={setName}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-black dark:text-white"
                placeholder="Your name"
                placeholderTextColor="#9ca3af"
            />

            <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-5 mb-2">
                Handle
            </Text>
            <TextInput
                value={handle}
                onChangeText={setHandle}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-black dark:text-white"
                placeholder="@username"
                autoCapitalize="none"
                placeholderTextColor="#9ca3af"
            />

            <Pressable
                onPress={() => router.back()}
                className="mt-6 bg-black dark:bg-white/10 rounded-xl px-4 py-3"
            >
                <Text className="text-center text-white dark:text-white font-semibold">
                    Save
                </Text>
            </Pressable>
        </View>
    );
}
