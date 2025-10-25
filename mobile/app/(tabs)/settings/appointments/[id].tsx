import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    View,
    useColorScheme,
    Linking,
    Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Calendar, Clock, MapPin, PawPrint, Tag, Phone } from "lucide-react-native";

import { StatusBadge } from "@components/appointments/StatusBadge";
import { Section } from "@components/appointments/Section";
import { DetailRow } from "@components/appointments/DetailRow";

// ---- Types ----
type AppointmentType = "vet" | "groomer" | "trainer" | "daycare";
type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

type Appointment = {
    _id: string;
    serviceName: string;
    type: AppointmentType;
    date: string; // ISO day
    time: string; // HH:mm
    status: AppointmentStatus;
    serviceCost: number;
    description: string;
    pet: { name: string };
    provider: {
        name: string;
        avatar?: string;
        location?: string; // address
        phone?: string;
    };
};

// ---- Helpers ----
const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

const formatTime = (iso: string, t: string) => {
    const d = new Date(iso);
    const [h, m] = t.split(":");
    d.setHours(Number(h || 0), Number(m || 0));
    return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};

const currency = (n: number) =>
    Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);

// ---- Mock fetch (replace with API call) ----
async function fetchAppointmentById(id: string): Promise<Appointment> {
    await new Promise((r) => setTimeout(r, 300));
    return {
        _id: id,
        serviceName: "General Check-up",
        type: "vet",
        date: "2025-10-24T00:00:00.000Z",
        time: "10:30",
        status: "confirmed",
        serviceCost: 800,
        description: "Annual wellness exam and vaccination review.",
        pet: { name: "Milo" },
        provider: {
            name: "Dr. Kavya Sharma",
            avatar:
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
            location: "Paws & Care Clinic, HSR Layout",
            phone: "+91 98765 43210",
        },
    };
}

export default function AppointmentDetailPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const isDark = useColorScheme() === "dark";

    const [data, setData] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setErr("");
                const res = await fetchAppointmentById(String(id));
                if (!cancelled) setData(res);
            } catch {
                if (!cancelled) setErr("Failed to load appointment.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const onCancel = () => {
        Alert.alert(
            "Cancel appointment?",
            "This will notify the provider. You can book again later.",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes, cancel",
                    style: "destructive",
                    onPress: () => Alert.alert("Cancelled", "Your appointment was cancelled."),
                },
            ]
        );
    };

    const onReschedule = () => {
        Alert.alert("Reschedule", "Open reschedule flow here.");
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <ActivityIndicator />
                <Text className="mt-3 text-base font-nunito text-neutral-700 dark:text-neutral-300">
                    Loading…
                </Text>
            </View>
        );
    }

    if (err || !data) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black p-6">
                <Text className="text-base font-nunitoBold text-red-600">
                    {err || "Not found."}
                </Text>
            </View>
        );
    }

    const dateStr = formatDate(data.date);
    const timeStr = formatTime(data.date, data.time);
    const iconMuted = isDark ? "#D1D5DB" : "#6B7280";

    // Dial / Maps helpers
    const dial = (phone: string) => Linking.openURL(`tel:${phone}`);
    const openMaps = (address: string) => {
        const q = encodeURIComponent(address);
        const url =
            Platform.select({
                ios: `http://maps.apple.com/?q=${q}`,
                android: `geo:0,0?q=${q}`,
                default: `https://www.google.com/maps/search/?api=1&query=${q}`,
            }) || `https://www.google.com/maps/search/?api=1&query=${q}`;
        Linking.openURL(url);
    };

    return (
        <View className="flex-1 bg-white dark:bg-black">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 112 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Provider card — larger, clearer, status visible */}
                <View
                    className="mt-5 mx-4 rounded-2xl bg-light-gray dark:bg-dark-gray p-5"
                    style={{
                        shadowColor: "#000",
                        shadowOpacity: isDark ? 0.22 : 0.1,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 12,
                        elevation: 3,
                    }}
                >
                    <View className="flex-row items-start justify-between">
                        <View className="flex-row items-center flex-shrink">
                            <Image
                                source={{
                                    uri:
                                        data.provider.avatar ||
                                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
                                }}
                                className="h-20 w-20 rounded-full mr-4"
                            />
                            <View className="flex-shrink">
                                <Text className="text-xl font-nunitoBold text-black dark:text-white">
                                    {data.provider.name}
                                </Text>
                                <Text
                                    className="mt-1 text-base font-nunito text-neutral-700 dark:text-neutral-300"
                                    numberOfLines={1}
                                >
                                    {data.serviceName} • {data.type}
                                </Text>
                            </View>
                        </View>
                        <StatusBadge status={data.status} />
                    </View>
                </View>

                {/* Schedule */}
                <Section title="Schedule">
                    <DetailRow icon={<Calendar size={20} color={iconMuted} />} label="Date" value={dateStr} />
                    <DetailRow icon={<Clock size={20} color={iconMuted} />} label="Time" value={timeStr} />
                    {data.provider.location ? (
                        <DetailRow
                            icon={<MapPin size={20} color={iconMuted} />}
                            label="Location"
                            value={data.provider.location}
                            onPress={() => openMaps(data.provider.location!)}
                        />
                    ) : null}

                    {data.provider.phone ? (
                        <DetailRow
                            icon={<Phone size={20} color={iconMuted} />}
                            label="Phone"
                            value={data.provider.phone}
                            onPress={() => dial(data.provider.phone!)}
                        />
                    ) : null}

                </Section>

                {/* Details */}
                <Section title="Details">
                    <DetailRow
                        icon={<PawPrint size={20} color={iconMuted} />}
                        label="Pet"
                        value={data.pet.name}
                    />
                    <DetailRow
                        icon={<Tag size={20} color={iconMuted} />}
                        label="Cost"
                        value={currency(data.serviceCost)}
                    />
                </Section>



                {/* Notes */}
                <Section title="Notes">
                    <Text className="text-lg leading-6 font-nunito text-neutral-800 dark:text-neutral-200">
                        {data.description || "—"}
                    </Text>
                </Section>
            </ScrollView>

            {/* If you have ActionBar, keep it here (not modified) */}
            {/* <ActionBar status={data.status} onCancel={onCancel} onReschedule={onReschedule} /> */}
        </View>
    );
}
