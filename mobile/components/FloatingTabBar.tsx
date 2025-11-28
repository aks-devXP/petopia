import React, { useEffect } from "react";
import { Pressable, useColorScheme, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Tabs } from "expo-router";
import { BookOpen, HeartHandshake, HeartPlus, Scissors, Settings } from "lucide-react-native";

type TabBarProps = React.ComponentProps<typeof Tabs>["tabBar"];

const ICONS = {
    ngo: HeartHandshake,
    providers: Scissors,
    vet: HeartPlus,
    breed: BookOpen,
    settings: Settings,
} satisfies Record<string, React.ComponentType<any>>;

type TabKey = keyof typeof ICONS;

const ORDER: TabKey[] = ["ngo", "providers", "breed", "vet", "settings"];

const isTabKey = (key: string): key is TabKey => ORDER.includes(key as TabKey);

const normalizeRouteName = (name: string): TabKey => {
    const first = name.split("/")[0];
    if (first.includes("breed")) return "breed";
    return isTabKey(first) ? first : "ngo";
};

export default function FloatingTabBar({
    state,
    navigation,
}: Parameters<NonNullable<TabBarProps>>[0]) {
    const scheme = useColorScheme();

    // Base stroke color for inactive icons (outline only)
    const base = scheme === "dark" ? "#000000" : "#FFFFFF";
    // Active icon color (inside the opposite circle)
    const active = scheme === "dark" ? "#FFFFFF" : "#000000";

    const orderedRoutes = ORDER.map((slot) =>
        state.routes.find((route) => normalizeRouteName(route.name) === slot)
    ).filter((route): route is typeof state.routes[number] => Boolean(route));

    return (
        <View className="absolute left-4 right-4 bottom-8 rounded-full bg-dark dark:bg-light flex-row items-center justify-between px-5 py-5">
            {orderedRoutes.map((route) => {
                const routeIndex = state.routes.findIndex((r) => r.key === route.key);
                const isFocused = state.index === routeIndex;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name as never);
                };

                const onLongPress = () =>
                    navigation.emit({ type: "tabLongPress", target: route.key });

                // subtle pop animation for the active circle
                const scale = useSharedValue(isFocused ? 1 : 0);
                useEffect(() => {
                    scale.value = withTiming(isFocused ? 1 : 0, { duration: 140 });
                }, [isFocused]);

                const circleStyle = useAnimatedStyle(() => ({
                    transform: [{ scale: 0.9 + 0.1 * scale.value }],
                }));

                const iconKey = normalizeRouteName(route.name);
                const Icon = ICONS[iconKey] ?? HeartHandshake;

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        className="flex-1 items-center justify-center"
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                    >
                        <View className="items-center justify-center">
                            {/* active circle (white on dark bar, black on light bar) */}
                            <Animated.View
                                className="w-16 h-16 rounded-full bg-white dark:bg-black items-center justify-center"
                                style={[
                                    { position: "absolute" },
                                    !isFocused && { transform: [{ scale: 0.9 }] },
                                    circleStyle,
                                    !isFocused && { opacity: 0 },
                                ]}
                            />
                            {/* larger, thinner, friendly icons; inactive uses base stroke only */}
                            <Icon size={32} strokeWidth={1.5} color={isFocused ? active : base} />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
