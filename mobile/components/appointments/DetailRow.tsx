import React from "react";
import { View, Text, Pressable } from "react-native";

type DetailRowProps = {
    icon?: React.ReactNode;
    label: string;
    value: string;
    onPress?: () => void; // makes the whole row tappable when provided
};

export function DetailRow({ icon, label, value, onPress }: DetailRowProps) {
    const Row = onPress ? Pressable : View;

    return (
        <Row
            onPress={onPress}
            className="flex-row items-start justify-between py-3"
            {...(onPress ? { hitSlop: { top: 6, bottom: 6, left: 6, right: 6 } } : {})}
        >
            <View className="flex-row items-center flex-shrink">
                {icon ? <View className="mr-3">{icon}</View> : null}
                <Text className="text-base font-nunitoSemiBold text-black dark:text-white">
                    {label}
                </Text>
            </View>

            <Text
                numberOfLines={2}
                className={`max-w-[70%] text-lg leading-6 font-nunito text-neutral-800 dark:text-neutral-200 text-right ${
                    onPress ? "underline decoration-neutral-400/40 dark:decoration-neutral-500/40" : ""
                }`}
            >
                {value}
            </Text>
        </Row>
    );
}
