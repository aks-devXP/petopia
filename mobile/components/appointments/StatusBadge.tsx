import React from "react";
import { View, Text } from "react-native";
import { AppointmentStatus } from "@app/(tabs)/settings/appointments";

export function StatusBadge({ status }: { status: AppointmentStatus }) {
    const map: Record<AppointmentStatus, { label: string; bg: string; fg: string }> = {
        pending:    { label: "Pending",   bg: "bg-yellow-100 dark:bg-yellow-900/30", fg: "text-yellow-700 dark:text-yellow-300" },
        confirmed:  { label: "Confirmed", bg: "bg-green-100 dark:bg-green-900/30",   fg: "text-green-700 dark:text-green-300" },
        completed:  { label: "Completed", bg: "bg-blue-100 dark:bg-blue-900/30",     fg: "text-blue-700 dark:text-blue-300" },
        cancelled:  { label: "Cancelled", bg: "bg-red-100 dark:bg-red-900/30",       fg: "text-red-700 dark:text-red-300" },
    };
    const s = map[status];

    return (
        <View className={`px-2 py-1 rounded-full ${s.bg}`}>
            <Text className={`text-xs font-nunitoSemiBold ${s.fg}`}>{s.label}</Text>
        </View>
    );
}
