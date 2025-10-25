import React, { useMemo, useState } from "react";
import { FlatList, Text, View, useColorScheme } from "react-native";
import { SearchBar } from "@components/appointments/SearchBar";
import { FiltersBar } from "@components/appointments/FiltersBar";
import { AppointmentCard } from "@components/appointments/AppointmentCard";

// ===== Types =====
export type AppointmentType = "vet" | "groomer" | "trainer" | "daycare";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Appointment = {
    _id: string;
    serviceName: string;
    type: AppointmentType;
    date: string; // ISO day
    time: string; // "HH:mm"
    status: AppointmentStatus;
    serviceCost: number;
    description: string;
    pet: { name: string };
    provider: { name: string; avatar?: string; location?: string };
};

// ===== Dummy Data (schema-aligned) =====
const DUMMY: Appointment[] = [
    {
        _id: "a1",
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
            avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
            location: "Paws & Care Clinic",
        },
    },
    {
        _id: "a2",
        serviceName: "Full Grooming",
        type: "groomer",
        date: "2025-10-26T00:00:00.000Z",
        time: "14:00",
        status: "pending",
        serviceCost: 1200,
        description: "Bath, nail trim, ear cleaning, and coat styling.",
        pet: { name: "Zara" },
        provider: {
            name: "Furry Styles",
            avatar: "https://images.unsplash.com/photo-1601582585289-b6154fe3625b?q=80&w=400",
            location: "Sector 21, City",
        },
    },
    {
        _id: "a3",
        serviceName: "Obedience Session",
        type: "trainer",
        date: "2025-10-28T00:00:00.000Z",
        time: "18:00",
        status: "completed",
        serviceCost: 900,
        description: "Intro to leash walking and recall.",
        pet: { name: "Rocky" },
        provider: {
            name: "Training with Arjun",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
            location: "Home Visit",
        },
    },
    {
        _id: "a4",
        serviceName: "Daycare Slot",
        type: "daycare",
        date: "2025-11-02T00:00:00.000Z",
        time: "09:00",
        status: "cancelled",
        serviceCost: 700,
        description: "Half-day supervised play.",
        pet: { name: "Coco" },
        provider: {
            name: "Happy Tails Daycare",
            avatar: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=400",
            location: "HSR Layout",
        },
    },
];

// ===== Helpers (local) =====
export const formatDateTime = (isoDate: string, time: string) => {
    const d = new Date(isoDate);
    const dateStr = d.toLocaleDateString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "short",
    });
    const [hh, mm] = time.split(":");
    const dt = new Date(d);
    dt.setHours(Number(hh || 0), Number(mm || 0));
    const timeStr = dt.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });
    return `${dateStr} • ${timeStr}`;
};

export const currency = (n: number) =>
    Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);

// ===== Screen =====
export default function AppointmentsListScreen() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    const [query, setQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<AppointmentType | "all">("all");
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return DUMMY.filter((a) => {
            const byType = typeFilter === "all" ? true : a.type === typeFilter;
            const byStatus = statusFilter === "all" ? true : a.status === statusFilter;
            const byQuery =
                q.length === 0 ||
                a.serviceName.toLowerCase().includes(q) ||
                a.provider.name.toLowerCase().includes(q) ||
                a.pet.name.toLowerCase().includes(q);
            return byType && byStatus && byQuery;
        });
    }, [typeFilter, statusFilter, query]);

    const header = (
        <View className="pb-2 mb-6">
            <SearchBar value={query} onChange={setQuery} />
            <FiltersBar
                typeValue={typeFilter}
                statusValue={statusFilter}
                onTypeChange={setTypeFilter}
                onStatusChange={setStatusFilter}
            />
        </View>
    );

    return (
        <FlatList
            className="flex-1 bg-white dark:bg-black "
            data={filtered}
            keyExtractor={(it) => it._id}
            ListHeaderComponent={header}
            renderItem={({ item }) => <AppointmentCard item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />} //  spacing between cards
            contentContainerStyle={{
                paddingBottom: 24,
                paddingHorizontal: 16,
                paddingTop: 12,
            }}
            ListEmptyComponent={
                <View className="items-center py-24">
                    <Text className="text-neutral-600 dark:text-neutral-400 font-nunito">
                        No appointments match your filters.
                    </Text>
                </View>
            }
            showsVerticalScrollIndicator={false}
        />

    );
}
