import React, { useEffect } from "react";
import { View, Pressable, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Tabs } from "expo-router";
import {
    PawPrint,
    HeartPlus,
    Home,
    BookOpen,
    Settings,
} from "lucide-react-native";

type TabBarProps = React.ComponentProps<typeof Tabs>["tabBar"];

const ICONS: Record<string, React.ComponentType<any>> = {
    more: PawPrint,
    vet: HeartPlus,
    home: Home,
    guide: BookOpen,
    settings: Settings,
};

export default function FloatingTabBar({
                                           state,
                                           descriptors,
                                           navigation,
                                       }: Parameters<NonNullable<TabBarProps>>[0]) {
    const scheme = useColorScheme();

    // Base stroke color for *inactive* icons (no “color” look, just outline)
    const base = scheme === "dark" ? "#000000" : "#FFFFFF";
    // Active icon color (inside the opposite circle)
    const active = scheme === "dark" ? "#FFFFFF" : "#000000";

    return (
        <View
            // thicker bar, rounded, floating (no shadow)
            className="absolute left-4 right-4 bottom-8 rounded-full bg-dark dark:bg-light flex-row items-center justify-between px-5 py-5"
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name as never);
                };

                const onLongPress = () => navigation.emit({ type: "tabLongPress", target: route.key });

                // subtle pop animation for the active circle
                const scale = useSharedValue(isFocused ? 1 : 0);
                useEffect(() => {
                    scale.value = withTiming(isFocused ? 1 : 0, { duration: 140 });
                }, [isFocused]);
                const circleStyle = useAnimatedStyle(() => ({
                    transform: [{ scale: 0.9 + 0.1 * scale.value }],
                }));

                // route name normalization (if you keep Guide as a (breed) group)
                const raw = route.name.split("/")[0];           // e.g. 'more', 'vet', 'home', 'guide' OR '(breed)'
                const id = raw.includes("breed") ? "guide" : raw;
                const Icon = ICONS[id] ?? PawPrint;

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
                                style={[{ position: "absolute" }, !isFocused && { transform: [{ scale: 0.9 }] }, circleStyle, !isFocused && { opacity: 0 }]}
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
