import React from "react";
import { View, Pressable, Text } from "react-native";

type Props = {
    status: "pending" | "confirmed" | "completed" | "cancelled";
    onCancel: () => void;
    onReschedule: () => void;
};

export function ActionBar({ status, onCancel, onReschedule }: Props) {
    const disabled = status === "completed" || status === "cancelled";

    return (
        <View className="absolute left-0 right-0 bottom-0 px-4 pb-6 pt-3 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
            <View className="flex-row gap-3">
                <Pressable
                    onPress={onReschedule}
                    disabled={disabled}
                    className={`flex-1 rounded-xl items-center justify-center h-12 ${
                        disabled ? "bg-neutral-300 dark:bg-neutral-700" : "bg-black dark:bg-white"
                    }`}
                >
                    <Text
                        className={`font-nunitoSemiBold ${
                            disabled ? "text-white dark:text-black/60" : "text-white dark:text-black"
                        }`}
                    >
                        Reschedule
                    </Text>
                </Pressable>

                <Pressable
                    onPress={onCancel}
                    disabled={disabled}
                    className={`flex-1 rounded-xl items-center justify-center h-12 ${
                        disabled ? "bg-neutral-200 dark:bg-neutral-800" : "bg-red-600"
                    }`}
                >
                    <Text
                        className={`font-nunitoSemiBold ${
                            disabled ? "text-neutral-600 dark:text-neutral-300" : "text-white"
                        }`}
                    >
                        Cancel
                    </Text>
                </Pressable>
            </View>

            {disabled ? (
                <Text className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 text-center">
                    Actions are disabled for completed or cancelled appointments.
                </Text>
            ) : null}
        </View>
    );
}
