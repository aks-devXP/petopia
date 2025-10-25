import React, { useMemo } from "react";
import { Image, Pressable, Text, View, useColorScheme } from "react-native";
import { Heart, ArrowUpRight, MapPin, Star } from "lucide-react-native";

/**
 * SCHEMAS (shape subset used by UI)
 * Keep the types minimal and aligned with your DB fields.
 */

export type VetModel = {
    _id: string;
    name: string;
    email: string;
    rating?: number;            // default: 4
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string | number;
    profilePic?: string;
    image?: string[];
    about?: string;
    tenure?: number;            // years
    timings?: string[][];
    specialization?: string;
    verified?: boolean;
};

export type TrainerModel = {
    _id: string;
    name: string;
    email: string;
    rating?: number;
    phone?: string;
    location?: string;
    city?: string;
    zip?: string | number;
    profilePic?: string;
    image?: string[];
    services?: string[];
    about?: string;
    price?: number[];           // array; we’ll display min
    verified?: boolean;
    timings?: string[][];
    experience?: string;        // “5 years” (string in your schema)
    specialization?: string;
};

export type GroomerModel = {
    _id: string;
    name: string;
    email: string;
    rating?: number;
    phone?: string;
    location?: string;
    city?: string;
    zip?: string | number;
    profilePic?: string;
    image?: string[];
    services?: string[];
    price?: number[];
    verified?: boolean;
    about?: string;
    cv?: string;
    tenure?: number;
    timings?: string[][];
    specialization?: string;
};

type Kind = "vet" | "trainer" | "groomer";
type AnyProvider = VetModel | TrainerModel | GroomerModel;

export type ProviderCardProps = {
    kind: Kind;
    data: AnyProvider;
    onPress?: (id: string) => void;
    onToggleFavorite?: (id: string) => void;
    isFavorite?: boolean;
};

/** Small internal components */

function RatingPill({ value }: { value?: number }) {
    const isDark = useColorScheme() === "dark";
    const bg = isDark ? "#1F2937" : "#F3F4F6";  // gray-800 / gray-100
    const fg = isDark ? "#FDE68A" : "#92400E";  // amber-300 / amber-800

    if (!value) return null;
    return (
        <View
            className="flex-row items-center rounded-full px-2.5 py-1"
            style={{ backgroundColor: bg }}
        >
            <Star size={14} color={fg} />
            <Text
                className="ml-1 text-xs font-nunitoSemiBold"
                style={{ color: fg }}
            >
                {value.toFixed(1)}
            </Text>
        </View>
    );
}

function Chip({
                  icon,
                  text,
              }: {
    icon?: React.ReactNode;
    text: string;
}) {
    const isDark = useColorScheme() === "dark";
    const bg = isDark ? "#2A2A2C" : "#FFFFFF";
    const border = isDark ? "#3A3A3C" : "#E5E7EB";
    return (
        <View
            className="flex-row items-center rounded-xl px-2.5 py-1"
            style={{ backgroundColor: bg, borderWidth: 1, borderColor: border }}
        >
            {icon ? <View className="mr-1.5">{icon}</View> : null}
            <Text className="text-xs font-nunito text-black dark:text-white">
                {text}
            </Text>
        </View>
    );
}

/** Utilities to normalize data across models */

function getAvatar(d: AnyProvider) {
    return (
        d.profilePic ||
        d.image?.[0] ||
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
    );
}

function getCityOrLocation(d: AnyProvider) {
    return (d as any).city || (d as any).location || (d as any).address || "";
}

function getSpecialization(kind: Kind, d: AnyProvider) {
    const spec =
        (d as any).specialization ||
        (kind === "trainer" ? (d as TrainerModel).experience : null) ||
        "";
    return spec;
}

function getPrice(kind: Kind, d: AnyProvider) {
    const arr = (d as any).price as number[] | undefined;
    if (!arr || arr.length === 0) return undefined;
    const min = Math.min(...arr.filter((n) => typeof n === "number"));
    if (!isFinite(min)) return undefined;
    return Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(min);
}

/** Main card */

export function ProviderCard({
                                 kind,
                                 data,
                                 onPress,
                                 onToggleFavorite,
                                 isFavorite,
                             }: ProviderCardProps) {
    const isDark = useColorScheme() === "dark";
    const roleTitle = useMemo(() => {
        if (kind === "vet") return "Veterinarian";
        if (kind === "trainer") return "Trainer";
        return "Groomer";
    }, [kind]);

    const cityOrLoc = getCityOrLocation(data);
    const price = getPrice(kind, data);
    const spec = getSpecialization(kind, data);
    const rating = (data as any).rating ?? 4;

    const iconMuted = isDark ? "#D1D5DB" : "#6B7280";

    return (
        <Pressable
            onPress={() => onPress?.((data as any)._id)}
            className="rounded-2xl bg-light-gray dark:bg-dark-gray p-4"
            style={{
                shadowColor: "#000",
                shadowOpacity: isDark ? 0.18 : 0.08,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 10,
                elevation: 2,
            }}
        >
            {/* Row 1: avatar + name/role + rating pill */}
            <View className="flex-row items-start justify-between">
                <View className="flex-row items-center flex-shrink">
                    <Image
                        source={{ uri: getAvatar(data) }}
                        className="h-16 w-16 rounded-2xl mr-3"
                    />
                    <View className="flex-shrink">
                        <Text className="text-lg font-nunitoBold text-black dark:text-white">
                            {data.name}
                        </Text>
                        <Text className="text-sm font-nunito text-neutral-700 dark:text-neutral-300">
                            {roleTitle}
                            {spec ? ` • ${spec}` : ""}
                        </Text>
                    </View>
                </View>

                <RatingPill value={rating} />
            </View>

            {/* Row 2: chips (city/location + price if present) */}
            <View className="flex-row items-center justify-between mt-3">
                {cityOrLoc ? (
                    <Chip
                        icon={<MapPin size={14} color={iconMuted} />}
                        text={cityOrLoc}
                    />
                ) : <View />}

                {price ? (
                    <Text className="text-base font-nunitoSemiBold text-black dark:text-white">
                        {price}
                        <Text className="text-xs font-nunito text-neutral-600 dark:text-neutral-300">
                            {"  "}per session
                        </Text>
                    </Text>
                ) : (
                    <View />
                )}
            </View>

            {/* Row 3: actions */}
            <View className="flex-row items-center justify-end mt-3">
                <Pressable
                    onPress={() => onToggleFavorite?.((data as any)._id)}
                    className="h-10 w-10 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: isDark ? "#1F2937" : "#FFFFFF" }}
                    hitSlop={8}
                >
                    <Heart
                        size={18}
                        color={isFavorite ? "#EF4444" : iconMuted}
                        fill={isFavorite ? "#EF4444" : "transparent"}
                    />
                </Pressable>
                <Pressable
                    onPress={() => onPress?.((data as any)._id)}
                    className="h-10 w-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: isDark ? "#1F2937" : "#FFFFFF" }}
                    hitSlop={8}
                >
                    <ArrowUpRight size={18} color={iconMuted} />
                </Pressable>
            </View>
        </Pressable>
    );
}
