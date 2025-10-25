import React from "react";
import { View, Text, useColorScheme } from "react-native";

export function Section({
                            title,
                            children,
                        }: {
    title: string;
    children: React.ReactNode;
}) {
    const isDark = useColorScheme() === "dark";

    return (
        <View className="mt-6 mx-4">
            {/* Title uses your header font; swap to font-nunitoBold if you prefer */}
            <Text className="mb-4 text-2xl font-quicksand text-black dark:text-white">
                {title}
            </Text>

            <View
                className="rounded-2xl bg-light-gray dark:bg-dark-gray p-5"
                style={{
                    shadowColor: "#000",
                    shadowOpacity: isDark ? 0.25 : 0.1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 8,
                    elevation: 2,
                }}
            >
                {children}
            </View>
        </View>
    );
}
