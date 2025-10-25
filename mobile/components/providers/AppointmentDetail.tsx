// components/providers/AppointmentDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    Alert, Image, Pressable, ScrollView, Text, View, useColorScheme,
} from "react-native";
import { Calendar, Clock, MapPin, Star, BadgeDollarSign, ChevronLeft, ChevronRight } from "lucide-react-native";
import { Linking, Platform } from "react-native";
export type Kind = "vet" | "trainer" | "groomer";

type BaseProvider = {
    _id: string;
    name: string;
    email: string;
    rating?: number;
    profilePic?: string;
    image?: string[];
    about?: string;
    city?: string;
    location?: string;
    address?: string;
    specialization?: string;
    experience?: string;
    price?: number[];
    timings?: string[][];
};

type Review = {
    _id: string;
    rating: number;
    review: string;
    created_at: string;
    author?: string;
};

// ---- mock data fetchers (swap with API calls) ----
async function fetchProvider(kind: Kind, id: string): Promise<BaseProvider> {
    await new Promise((r) => setTimeout(r, 150));
    return {
        _id: id,
        name: "Dr. William James",
        email: "doc@example.com",
        rating: 4.8,
        profilePic: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
        about: "Neurologist with 7+ years of experience. Passionate about preventive care.",
        city: "HSR Layout",
        address: "Paws & Care Clinic, HSR Layout",
        specialization: kind === "trainer" ? undefined : "Neurologist",
        experience: kind === "trainer" ? "5+ years" : undefined,
        price: [1200, 1500, 2000],
        timings: [
            ["Mon", "09:00", "09:30", "10:30", "11:00", "13:00"],
            ["Tue", "09:30", "11:30", "12:00", "15:30"],
            ["Wed", "09:00", "10:30", "12:30", "13:00", "15:00"],
            ["Thu", "10:00", "11:00", "12:00"],
            ["Fri", "09:00", "11:00", "13:00", "16:00"],
            ["Sat", "10:30", "11:30", "12:30", "14:30"],
            ["Sun"],
        ],
    };
}

async function fetchReviewsForProvider(kind: Kind, id: string): Promise<Review[]> {
    await new Promise((r) => setTimeout(r, 110));
    return [
        { _id: "r1", rating: 5, review: "Very professional and kind.", created_at: "2025-10-04T10:00:00.000Z", author: "Priya K." },
        { _id: "r2", rating: 4, review: "Good diagnosis, minimal waiting time.", created_at: "2025-09-15T08:00:00.000Z", author: "Rahul S." },
    ];
}

// ---- utils ----
const formatINR = (n: number) =>
    Intl.NumberFormat(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function weekFrom(base: Date) {
    const start = new Date(base);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day; // move to Monday
    start.setDate(start.getDate() + diff);
    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return { date: d, label: dayNames[d.getDay()], num: d.getDate() };
    });
}

export default function AppointmentDetail({ kind, id }: { kind: Kind; id: string }) {
    const isDark = useColorScheme() === "dark";

    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState<BaseProvider | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [err, setErr] = useState("");

    const [weekBase, setWeekBase] = useState(new Date());
    const week = useMemo(() => weekFrom(weekBase), [weekBase]);
    const [selectedDayIdx, setSelectedDayIdx] = useState<number>(() => (new Date().getDay() + 6) % 7);
    const [selectedTime, setSelectedTime] = useState<string>("");

    const services = useMemo(() => {
        if (kind === "trainer") return ["Home session", "Obedience", "Puppy basics"];
        if (kind === "groomer") return ["Bath & Brush", "Full Groom", "Nail Trim"];
        return ["Consultation", "Follow-up", "Video consult"];
    }, [kind]);
    const [serviceIdx, setServiceIdx] = useState(0);

    useEffect(() => {
        let cancel = false;
        (async () => {
            try {
                setLoading(true); setErr("");
                const p = await fetchProvider(kind, id);
                const r = await fetchReviewsForProvider(kind, id);
                if (!cancel) { setProvider(p); setReviews(r); }
            } catch {
                if (!cancel) setErr("Failed to load provider.");
            } finally {
                if (!cancel) setLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, [kind, id]);

    const iconMuted = isDark ? "#D1D5DB" : "#6B7280";
    const avatar = provider?.profilePic || provider?.image?.[0] || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200";
    const roleTitle = kind === "vet" ? "Veterinarian" : kind === "trainer" ? "Trainer" : "Groomer";
    const subLine = (kind === "trainer" && provider?.experience) || provider?.specialization || "";
    const minPrice = useMemo(() => {
        const arr = provider?.price || [];
        if (!arr.length) return undefined;
        const min = Math.min(...arr);
        return isFinite(min) ? formatINR(min) : undefined;
    }, [provider]);

    const slotsForSelectedDay = useMemo(() => {
        if (!provider?.timings?.length) return [];
        const dayLabel = week[selectedDayIdx]?.label;
        const row =
            provider.timings.find((r) => r?.[0]?.slice(0, 3).toLowerCase() === dayLabel.toLowerCase()) ||
            provider.timings[selectedDayIdx] || [];
        return row.slice(1);
    }, [provider, selectedDayIdx, week]);

    const book = () => {
        if (!selectedTime) {
            Alert.alert("Select a time", "Please choose a time slot before booking.");
            return;
        }
        const d = week[selectedDayIdx]?.date.toDateString();
        Alert.alert(
            "Appointment requested",
            `Service: ${services[serviceIdx]}\nDate: ${d}\nTime: ${selectedTime}\nCost (tentative): ${minPrice ?? "—"}\n\nThe provider will confirm the final time & cost.`
        );
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-black">
                <Text className="text-base font-nunito text-neutral-700 dark:text-neutral-300">Loading…</Text>
            </View>
        );
    }
    if (err || !provider) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-black p-6">
                <Text className="text-base font-nunitoBold text-red-600">{err || "Not found."}</Text>
            </View>
        );
    }

    const addressLabel = provider.address || provider.city || "";
    const openMaps = () => {
        if (!addressLabel) return;
        const q = encodeURIComponent(addressLabel);
        const url = Platform.select({
            ios: `http://maps.apple.com/?q=${q}`,
            android: `geo:0,0?q=${q}`,
            default: `https://www.google.com/maps/search/?api=1&query=${q}`,
        }) as string;
        Linking.openURL(url);
    };

    return (
        <View className="flex-1 bg-white dark:bg-black">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 112, paddingHorizontal: 16, paddingTop: 12 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Provider header */}
                <View
                    className="rounded-3xl bg-light-gray dark:bg-dark-gray p-6"
                    style={{
                        shadowColor: "#000",
                        shadowOpacity: isDark ? 0.18 : 0.08,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 12,
                        elevation: 4,
                        borderWidth: isDark ? 1 : 0,
                        borderColor: isDark ? "#2F2F31" : "transparent",
                    }}
                >
                    {/* Top row: avatar + name/specialty + rating */}
                    <View className="items-center">
                        {/* Avatar */}
                        <View className="relative mb-4">
                            <View
                                className="h-36 w-36 rounded-full items-center justify-center"
                                style={{ backgroundColor: isDark ? "#0E1A18" : "#E7F3EF" }}
                            >
                                <Image source={{ uri: avatar }} className="h-32 w-32 rounded-full" />
                            </View>
                            {/* crisp ring */}
                            <View className="absolute inset-0 rounded-full border-2 border-white dark:border-neutral-900" />
                            {/* online dot */}
                            <View className="h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-neutral-900 absolute right-1 bottom-1" />
                        </View>

                        {/* Name */}
                        <Text className="text-[26px] leading-8 font-nunitoBlack text-black dark:text-white text-center">
                            {provider.name}
                        </Text>

                        {/* Role + specialization in SAME row */}
                        <View className="mt-2 flex-row items-center">
                            <Text className="text-[16px] font-nunitoSemiBold text-neutral-800 dark:text-neutral-200">
                                {roleTitle}
                            </Text>
                            {subLine ? (
                                <>
                                    <Text className="mx-2 text-neutral-500 dark:text-neutral-400">•</Text>
                                    <Text className="text-[16px] font-nunito text-neutral-700 dark:text-neutral-300">
                                        {subLine}
                                    </Text>
                                </>
                            ) : null}
                        </View>

                        {/* Address (pressable → Maps) */}
                        {addressLabel ? (
                            <Pressable
                                onPress={openMaps}
                                className="mt-3 flex-row items-center"
                                hitSlop={8}
                            >
                                <MapPin size={18} color={iconMuted} />
                                <Text className="ml-1 text-[15px] font-nunito text-neutral-700 dark:text-neutral-300 underline">
                                    {addressLabel}
                                </Text>
                            </Pressable>
                        ) : null}
                    </View>


                    {/* Info pills */}
                    <View className="flex-row gap-3 mt-5">
                        <View className="flex-1 flex-col rounded-2xl px-4 py-3 bg-white dark:bg-black"
                              style={{ borderWidth: 1, borderColor: isDark ? "#2F2F31" : "#E5E7EB" }}>
                            <Text className="text-[13px] font-nunito text-neutral-600 dark:text-neutral-300">
                                Experience
                            </Text>
                            <Text className="text-[15px] font-nunitoBold text-neutral-900 dark:text-white">
                                05+ Years
                            </Text>
                        </View>

                        <View className="flex-1 flex-col rounded-2xl px-4 py-3 bg-white dark:bg-black"
                              style={{ borderWidth: 1, borderColor: isDark ? "#2F2F31" : "#E5E7EB" }}>
                            <Text className="text-[13px] font-nunito text-neutral-600 dark:text-neutral-300">
                                Rating
                            </Text>
                            <View className="flex flex-row flex-1">
                                <Star size={16} color={isDark ? "#FDE68A" : "#B45309"}/>
                                <Text
                                    className="ml-1 text-[15px] font-nunitoSemiBold"
                                    style={{color: isDark ? "#FDE68A" : "#92400E"}}
                                >
                                    {(provider.rating ?? 4).toFixed(1)}
                                </Text>
                                <Text className="text-[11px] font-nunito text-neutral-500 dark:text-neutral-400"> (500)</Text>
                            </View>
                        </View>
                    </View>

                    {/* Fee row */}
                    {minPrice ? (
                        <View
                            className="mt-4 flex-row items-center justify-between rounded-2xl px-4 py-4 bg-white dark:bg-black"
                            style={{ borderWidth: 1, borderColor: isDark ? "#2F2F31" : "#E5E7EB" }}
                        >
                            <View className="flex-row items-center">
                                <BadgeDollarSign size={18} color={iconMuted} />
                                <Text className="ml-2 text-[18px] font-nunitoBold text-neutral-900 dark:text-white">
                                    {minPrice}
                                </Text>
                            </View>
                            <Text className="text-[13px] font-nunito text-neutral-600 dark:text-neutral-300">
                                Consultation fee
                            </Text>
                        </View>
                    ) : null}

                    {/* About */}
                    {provider.about ? (
                        <Text className="mt-5 text-[15px] leading-6 font-nunito text-neutral-800 dark:text-neutral-200">
                            {provider.about}
                        </Text>
                    ) : null}
                </View>


                {/* Booking */}
                <View className="mt-5 rounded-2xl bg-light-gray dark:bg-dark-gray p-5">
                    <Text className="text-2xl font-nunitoBold text-black dark:text-white mb-3">Book a Session</Text>


                    {/* Week navigator */}
                    <View className="mt-4 flex-row items-center justify-between">
                        <Pressable onPress={() => { const d = new Date(weekBase); d.setDate(d.getDate() - 7); setWeekBase(d); }}
                                   className="h-8 w-8 rounded-full items-center justify-center bg-white dark:bg-black">
                            <ChevronLeft size={18} color={iconMuted} />
                        </Pressable>

                        <View className="flex-1 mx-3 flex-row justify-between">
                            {week.map((w, idx) => {
                                const active = idx === selectedDayIdx;
                                return (
                                    <Pressable
                                        key={`${w.label}-${w.num}`}
                                        onPress={() => { setSelectedDayIdx(idx); setSelectedTime(""); }}
                                        className={`items-center rounded-xl px-2 py-2 ${active ? "bg-black dark:bg-white" : "bg-white dark:bg-black"}`}
                                        style={{ borderWidth: 1, borderColor: isDark ? "#2F2F31" : "#E5E7EB" }}
                                    >
                                        <Text className={`text-sm font-nunito ${active ? "text-white dark:text-black" : "text-black dark:text-white"}`}>{w.label}</Text>
                                        <Text className={`text-base font-nunitoSemiBold ${active ? "text-white dark:text-black" : "text-black dark:text-white"}`}>{w.num}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        <Pressable onPress={() => { const d = new Date(weekBase); d.setDate(d.getDate() + 7); setWeekBase(d); }}
                                   className="h-8 w-8 rounded-full items-center justify-center bg-white dark:bg-black">
                            <ChevronRight size={18} color={iconMuted} />
                        </Pressable>
                    </View>

                    {/* Availability */}
                    <Text className="mt-5 mb-2 text-base font-nunitoSemiBold text-black dark:text-white">Availability</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {slotsForSelectedDay.length === 0 ? (
                            <Text className="text-sm font-nunito text-neutral-600 dark:text-neutral-400">No slots available for this day.</Text>
                        ) : (
                            slotsForSelectedDay.map((t) => {
                                const active = selectedTime === t;
                                return (
                                    <Pressable
                                        key={t}
                                        onPress={() => setSelectedTime(t)}
                                        className={`px-3 py-2 rounded-xl ${active ? "bg-black dark:bg-white" : "bg-white dark:bg-black"}`}
                                        style={{ borderWidth: 1, borderColor: isDark ? "#2F2F31" : "#E5E7EB" }}
                                    >
                                        <Text className={`text-lg font-nunitoSemiBold ${active ? "text-white dark:text-black" : "text-black dark:text-white"}`}>{t}</Text>
                                    </Pressable>
                                );
                            })
                        )}
                    </View>

                    {/* Tentative cost + CTA */}
                    <View className="mt-4 flex-row items-center">
                        <BadgeDollarSign size={24} color={iconMuted} />
                        <Text className="ml-2 text-lg font-nunito text-neutral-800 dark:text-neutral-200">
                            Tentative cost: {minPrice ?? "—"}
                        </Text>
                    </View>

                    <Pressable onPress={book} className="mt-5 h-16 rounded-full items-center justify-center bg-black dark:bg-white">
                        <Text className="text-lg font-nunitoBold text-white dark:text-black">Book Appointment</Text>
                    </Pressable>
                </View>

                {/* Reviews */}
                <View className="mt-5 rounded-2xl bg-light-gray dark:bg-dark-gray p-5">
                    <Text className="text-lg font-nunitoBold text-black dark:text-white mb-3">Reviews</Text>
                    {reviews.length === 0 ? (
                        <Text className="text-sm font-nunito text-neutral-700 dark:text-neutral-300">No reviews yet.</Text>
                    ) : (
                        reviews.map((r) => (
                            <View key={r._id} className="mb-3 rounded-xl p-3 bg-white dark:bg-black" style={{ borderWidth: 1, borderColor: isDark ? "#2F2F31" : "#E5E7EB" }}>
                                <View className="flex-row items-center mb-1">
                                    <Star size={14} color={isDark ? "#FDE68A" : "#92400E"} />
                                    <Text className="ml-1 text-sm font-nunitoSemiBold" style={{ color: isDark ? "#FDE68A" : "#92400E" }}>{r.rating.toFixed(1)}</Text>
                                    {r.author ? (<Text className="ml-2 text-xs font-nunito text-neutral-600 dark:text-neutral-400">• {r.author}</Text>) : null}
                                </View>
                                <Text className="text-base font-nunito text-neutral-800 dark:text-neutral-200">{r.review}</Text>
                                <Text className="mt-1 text-xs font-nunito text-neutral-600 dark:text-neutral-400">{new Date(r.created_at).toLocaleDateString()}</Text>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
