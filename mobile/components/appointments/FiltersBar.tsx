// components/appointments/FiltersBar.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    FlatList,
    useColorScheme,
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import type {
    AppointmentStatus,
    AppointmentType,
} from "@app/(tabs)/settings/appointments";

// Reusable dropdown (Modal-based)
function Dropdown<T extends string>({
                                        label,
                                        value,
                                        options,
                                        onChange,
                                    }: {
    label: string;
    value: T | "all";
    options: readonly (T | "all")[];
    onChange: (v: T | "all") => void;
}) {
    const isDark = useColorScheme() === "dark";
    const [open, setOpen] = useState(false);
    const display = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

    return (
        <View className="flex-1">
            <Text className="mb-2 text-xs font-nunitoSemiBold text-neutral-600 dark:text-neutral-400">
                {label}
            </Text>

            <Pressable
                onPress={() => setOpen(true)}
                className="h-12 px-4 rounded-full flex-row items-center justify-between bg-light-gray dark:bg-dark-gray"
            >
                <Text className="text-sm font-nunito text-black dark:text-white">
                    {display(String(value))}
                </Text>
                <ChevronDown size={18} color={isDark ? "#fff" : "#000"} />
            </Pressable>

            <Modal
                visible={open}
                transparent
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                {/* backdrop */}
                <Pressable onPress={() => setOpen(false)} className="flex-1 bg-black/40" />

                {/* menu */}
                <View className="absolute left-4 right-4 top-1/3 rounded-2xl p-2 bg-light-gray dark:bg-dark-gray border border-neutral-200 dark:border-neutral-800">
                    <FlatList
                        data={options as string[]}
                        keyExtractor={(it) => it}
                        renderItem={({ item }) => {
                            const active = item === value;
                            return (
                                <Pressable
                                    onPress={() => {
                                        onChange(item as T | "all");
                                        setOpen(false);
                                    }}
                                    className={`px-4 py-3 rounded-lg ${
                                        active ? "bg-black/90 dark:bg-white/90" : "bg-transparent"
                                    }`}
                                >
                                    <Text
                                        className={`text-sm font-nunito ${
                                            active ? "text-white dark:text-black" : "text-black dark:text-white"
                                        }`}
                                    >
                                        {display(item)}
                                    </Text>
                                </Pressable>
                            );
                        }}
                        ItemSeparatorComponent={() => (
                            <View className="h-px bg-neutral-200 dark:bg-neutral-800 mx-2" />
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
}

export function FiltersBar({
                               typeValue,
                               statusValue,
                               onTypeChange,
                               onStatusChange,
                           }: {
    typeValue: AppointmentType | "all";
    statusValue: AppointmentStatus | "all";
    onTypeChange: (v: AppointmentType | "all") => void;
    onStatusChange: (v: AppointmentStatus | "all") => void;
}) {
    return (
        <View className="mt-4">
            <View className="flex-row gap-3">
                <Dropdown<AppointmentType>
                    label="Type"
                    value={typeValue}
                    options={["all", "vet", "groomer", "trainer", "daycare"] as const}
                    onChange={onTypeChange}
                />
                <Dropdown<AppointmentStatus>
                    label="Status"
                    value={statusValue}
                    options={
                        ["all", "pending", "confirmed", "completed", "cancelled"] as const
                    }
                    onChange={onStatusChange}
                />
            </View>
        </View>
    );
}
