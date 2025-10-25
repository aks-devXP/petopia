// components/settingcard/SettingsItem.tsx
import React from "react";
import { Pressable, View, Text, useColorScheme } from "react-native";
import { router, Href } from "expo-router";
import {ChevronRight} from "lucide-react-native";

// Minimal icon prop contract (works with lucide-react-native & most RN icon libs)
type IconProps = { color?: string; size?: number };

type SettingsItemProps = {
    label: string;                 // single-line label
    href: Href;                    // absolute or relative route
    icon: React.ComponentType<IconProps>; // pass the component, e.g. icon={Calendar}
};

export default function SettingsItem({ label, href, icon: Icon }: SettingsItemProps) {
    const isDark = useColorScheme() === "dark";
    const tint = isDark ? "#ffffff" : "#111111";

    return (
        <Pressable
            onPress={() => router.push(href)}
            accessibilityRole="button"
            accessibilityLabel={label}
            className="px-3 py-4 my-2 rounded-2xl"
            style={({ pressed }) => ({
                backgroundColor: pressed
                    ? isDark
                        ? "rgba(255, 255, 255, 0.1)" //  white/10 in dark
                        : "rgba(0, 0, 0, 0.1)"       // ✅ black/10 in light
                    : "transparent",
            })}
        >
            <View className="flex-row items-center">
                {/* Left Icon */}
                <View
                    className="w-9 h-9 rounded-xl items-center justify-center mr-3
                     bg-neutral-200 dark:bg-neutral-800"
                >
                    <Icon color={tint} size={22} />
                </View>

                {/* Label */}
                <Text
                    className="flex-1 text-lg font-semibold text-black dark:text-white"
                    numberOfLines={1}
                >
                    {label}
                </Text>

                <ChevronRight color={isDark ? "#9ca3af" : "#6b7280"} size={24} />

            </View>

        </Pressable>
    );
}
