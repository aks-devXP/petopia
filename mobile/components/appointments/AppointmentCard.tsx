import React from "react";
import { Image, Pressable, Text, View, useColorScheme } from "react-native";
import { Calendar, PawPrint, MapPin } from "lucide-react-native";
import { router } from "expo-router";
import { Appointment } from "@app/(tabs)/settings/appointments";
import { formatDateTime } from "@app/(tabs)/settings/appointments";

type StatusKey = Appointment["status"];

const STATUS_COLORS: Record<
    StatusKey,
    { lightBg: string; lightText: string; darkBg: string; darkText: string }
> = {
    pending: {
        lightBg: "#FEF3C7", // amber-100
        lightText: "#92400E", // amber-800
        darkBg: "#3A2F00", // deep amber-ish
        darkText: "#FDE68A", // amber-300
    },
    confirmed: {
        lightBg: "#DCFCE7", // green-100
        lightText: "#166534", // green-800
        darkBg: "#07351D", // deep green
        darkText: "#86EFAC", // green-300
    },
    completed: {
        lightBg: "#DBEAFE", // blue-100
        lightText: "#1E40AF", // blue-800
        darkBg: "#0A2647", // deep blue
        darkText: "#93C5FD", // blue-300
    },
    cancelled: {
        lightBg: "#FEE2E2", // red-100
        lightText: "#991B1B", // red-800
        darkBg: "#3C0D0D", // deep red
        darkText: "#FCA5A5", // red-300
    },
};

function StatusPill({ status }: { status: StatusKey }) {
    const isDark = useColorScheme() === "dark";
    const color = STATUS_COLORS[status];
    const bg = isDark ? color.darkBg : color.lightBg;
    const fg = isDark ? color.darkText : color.lightText;

    const label =
        status.charAt(0).toUpperCase() + status.slice(1); // Pending / Confirmed / ...

    return (
        <View
            style={{
                backgroundColor: bg,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
            }}
        >
            <Text
                className="font-nunitoSemiBold"
                style={{ fontSize: 12, color: fg }}
                numberOfLines={1}
            >
                {label}
            </Text>
        </View>
    );
}

export function AppointmentCard({ item }: { item: Appointment }) {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    // Build separate date/time chips (and keep your original "when" for accessibility/announce)
    const when = formatDateTime(item.date, item.time);
    const d = new Date(item.date);
    const dateLabel = d.toLocaleDateString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "short",
    }); // e.g., "Fri, 24 Oct"
    const [hh, mm] = item.time.split(":");
    const dt = new Date(d);
    dt.setHours(Number(hh || 0), Number(mm || 0));
    const timeLabel = dt.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });

    const chipBg = isDark ? "#2A2A2C" : "#FFFFFF"; // slightly different bg from the card
    const chipBorder = isDark ? "#3A3A3C" : "#E5E7EB"; // subtle border for readability
    const iconColor = isDark ? "#D1D5DB" : "#6B7280"; // neutral-300 / 500ish

    return (
        <Pressable
            accessibilityLabel={when}
            onPress={() =>
                router.push({
                    pathname: "/(tabs)/settings/appointments/[id]",
                    params: { id: item._id },
                })
            }
            className="rounded-2xl bg-light-gray dark:bg-dark-gray p-4 mb-4 active:opacity-90"
            style={{
                // make the card breathe a bit more
                shadowColor: "#000",
                shadowOpacity: isDark ? 0.2 : 0.08,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 10,
                elevation: 2,
            }}
        >
            {/* Row 1: Avatar, Name, Sub-label (service), Status on far right */}
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-center flex-shrink">
                    <Image
                        source={{
                            uri:
                                item.provider.avatar ||
                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
                        }}
                        className="h-14 w-14 rounded-full mr-3"
                    />
                    <View className="flex-shrink">
                        <Text className="text-lg font-nunitoBold text-black dark:text-white">
                            {item.provider.name}
                        </Text>
                        <Text className="text-sm font-nunito text-neutral-700 dark:text-neutral-300" numberOfLines={1}>
                            {item.serviceName}
                        </Text>
                    </View>
                </View>

                <StatusPill status={item.status} />
            </View>

            {/* Row 2: Date (left chip) and Time (right chip) */}
            <View className="flex-row items-center justify-between mt-4 rounded-full" style={{ backgroundColor: chipBg, borderWidth: 1, borderColor: chipBorder }}>
                <View className="flex-row items-center px-3 py-2" >
                    <Calendar size={18} color={iconColor} />
                    <Text className="ml-2 text-sm font-nunito text-black dark:text-white">
                        {dateLabel}
                    </Text>
                </View>

                <View className="flex-row items-center px-3 py-2">
                    <Calendar size={18} color={iconColor} />
                    <Text className="ml-2 text-sm font-nunito text-black dark:text-white">
                        {timeLabel}
                    </Text>
                </View>
            </View>

            {/* Row 3: Pet + Address */}
            <View className="flex-row items-center justify-between mt-4 px-3">
                <View className="flex-row items-center mr-4">
                    <PawPrint size={18} color={iconColor} />
                    <Text className="ml-2 text-sm font-nunito text-neutral-800 dark:text-neutral-200">
                        {item.pet.name}
                    </Text>
                </View>

                {item.provider.location ? (
                    <View className="flex-row items-center flex-shrink">
                        <MapPin size={18} color={iconColor} />
                        <Text
                            className="ml-2 text-sm font-nunito text-neutral-800 dark:text-neutral-200"
                            numberOfLines={1}
                        >
                            {item.provider.location}
                        </Text>
                    </View>
                ) : null}
            </View>

        </Pressable>
    );
}
