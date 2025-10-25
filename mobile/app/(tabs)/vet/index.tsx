import React, { useMemo, useState } from "react";
import { router } from "expo-router";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
    useColorScheme,
} from "react-native";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { ProviderCard, VetModel } from "@components/providers/ProviderCard";

const VETS: VetModel[] = [
    {
        _id: "v1",
        name: "Dr. Jenny Teem",
        email: "jenny@example.com",
        rating: 4.8,
        city: "HSR Layout",
        specialization: "MBBS, FCPS",
        profilePic:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
    },
    {
        _id: "v2",
        name: "Dr. Jacob Jones",
        email: "jacob@example.com",
        rating: 4.7,
        city: "Indiranagar",
        specialization: "Neurosurgeon",
        profilePic:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
    },
    {
        _id: "v3",
        name: "Dr. Jenny Nick",
        email: "nick@example.com",
        rating: 4.8,
        city: "Koramangala",
        specialization: "Dermatology",
        profilePic:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=400",
    },
    {
        _id: "v4",
        name: "Dr. Arlene Mccoy",
        email: "arlene@example.com",
        rating: 4.8,
        city: "Whitefield",
        specialization: "Gynecologist (5 yrs)",
        profilePic:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
    },
];

export default function VetListScreen() {
    const isDark = useColorScheme() === "dark";
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [specialization, setSpecialization] = useState<string>("All");

    const placeholder = isDark ? "#9CA3AF" : "#6B7280";
    const iconOnFilter = isDark ? "#000000" : "#FFFFFF";

    const specOptions = useMemo(() => {
        const set = new Set<string>();
        VETS.forEach((v) => v.specialization && set.add(v.specialization));
        return ["All", ...Array.from(set)];
    }, []);

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        return VETS.filter((v) => {
            const bySpec =
                specialization === "All"
                    ? true
                    : (v.specialization || "").toLowerCase() ===
                    specialization.toLowerCase();

            const byQuery =
                q.length === 0 ||
                v.name.toLowerCase().includes(q) ||
                (v.specialization || "").toLowerCase().includes(q) ||
                (v.city || "").toLowerCase().includes(q);

            return bySpec && byQuery;
        });
    }, [searchTerm, specialization]);

    const header = (
        <View>
            <View className="flex-row items-center w-full gap-4 h-12 mb-8 mt-4">
                <View className="flex-1 flex-row items-center rounded-full h-full px-5 bg-light-gray dark:bg-dark-gray">
                    <Search size={20} color={placeholder} />
                    <TextInput
                        placeholder="Search by name or specialization"
                        placeholderTextColor={placeholder}
                        className="flex-1 ml-2 text-black dark:text-white font-nunito"
                        selectionColor={isDark ? "#FFFFFF" : "#000000"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="while-editing"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <Pressable
                    onPress={() => setFilterOpen(true)}
                    className="w-12 h-12 rounded-full items-center justify-center bg-black dark:bg-white"
                >
                    <SlidersHorizontal size={22} color={iconOnFilter} strokeWidth={2} />
                </Pressable>
            </View>

            {specialization !== "All" && (
                <View className="mt-2">
                    <Text className="text-xs font-nunito text-neutral-600 dark:text-neutral-400">
                        Filter: <Text className="font-nunitoSemiBold">{specialization}</Text>
                    </Text>
                </View>
            )}
        </View>
    );

    return (
        <View className="flex-1 bg-white dark:bg-black px-4 pt-20">
            <Text className="text-4xl text-ink dark:text-ink-on-dark mb-3 font-quicksandBold pl-1">
                Veterinary Near You
            </Text>

            <FlatList
                data={filtered}
                keyExtractor={(it) => it._id}
                ListHeaderComponent={header}
                renderItem={({ item }) => (
                    <ProviderCard
                        kind="vet"
                        data={item}
                        onPress={(id: string) => {
                            router.push({ pathname: "/appointment/[kind]/[id]", params: { kind: "vet", id } });
                        }}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                // ✅ Removed FlatList padding to avoid double spacing
                contentContainerStyle={{ paddingBottom: 32 }}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                transparent
                visible={filterOpen}
                animationType="fade"
                onRequestClose={() => setFilterOpen(false)}
            >
                <Pressable
                    onPress={() => setFilterOpen(false)}
                    className="flex-1 bg-black/40"
                />
                <View className="absolute left-4 right-4 bottom-6 rounded-2xl p-4 bg-light-gray dark:bg-dark-gray">
                    <Text className="text-base font-nunitoBold text-black dark:text-white mb-2">
                        Specialization
                    </Text>

                    {specOptions.map((opt) => {
                        const active = opt === specialization;
                        return (
                            <Pressable
                                key={opt}
                                onPress={() => {
                                    setSpecialization(opt);
                                    setFilterOpen(false);
                                }}
                                className={`px-3 py-3 rounded-xl ${
                                    active ? "bg-black/90 dark:bg-white/90" : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-sm font-nunito ${
                                        active
                                            ? "text-white dark:text-black"
                                            : "text-black dark:text-white"
                                    }`}
                                >
                                    {opt}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </Modal>
        </View>
    );
}
