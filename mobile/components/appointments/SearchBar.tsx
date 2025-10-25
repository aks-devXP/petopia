import React from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { Search } from "lucide-react-native";

export function SearchBar({
                              value,
                              onChange,
                          }: {
    value: string;
    onChange: (v: string) => void;
}) {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";
    const placeholder = isDark ? "#A1A1AA" : "#9CA3AF";

    return (
        <View className="flex-row items-center rounded-full h-12 px-5 py-4 bg-light-gray dark:bg-dark-gray mt-4">
            <Search size={20} color={placeholder} />
            <TextInput
                placeholder="Search by provider, pet, or service…"
                placeholderTextColor={placeholder}
                className="flex-1 ml-2 text-ink dark:text-ink-on-dark font-nunito"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
            />
        </View>
    );
}
