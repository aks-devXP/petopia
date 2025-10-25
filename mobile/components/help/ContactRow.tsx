import React from "react";
import { Pressable, View, Text } from "react-native";

type ContactRowProps = {
    icon: React.ReactNode;
    label?: string;
    value: string;
    onPress?: () => void;
};

export default function ContactRow({ icon, label, value, onPress }: ContactRowProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center rounded-2xl px-4 py-3 mb-3 bg-light-gray dark:bg-dark-gray"
            style={{
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 8,
                elevation: 4,
            }}
        >
            <View className="mr-3">{icon}</View>
            <View className="flex-1">
                {label && (
                    <Text className="text-xs font-nunito text-neutral-500 dark:text-neutral-400">
                        {label}
                    </Text>
                )}
                <Text className="text-base font-nunitoSemiBold text-black dark:text-white">
                    {value}
                </Text>
            </View>
        </Pressable>
    );
}
