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
import {
    GroomerModel,
    ProviderCard,
    TrainerModel,
} from "@components/providers/ProviderCard";

const GROOMERS: GroomerModel[] = [
    {
        _id: "g1",
        name: "Olivia Stone",
        email: "olivia@example.com",
        rating: 4.8,
        city: "HSR Layout",
        specialization: "Full-service grooming",
        profilePic:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
    },
    {
        _id: "g2",
        name: "Marcus Reed",
        email: "marcus@example.com",
        rating: 4.7,
        city: "Indiranagar",
        specialization: "Bath & coat care",
        profilePic:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
    },
    {
        _id: "g3",
        name: "Priya Nair",
        email: "priya@example.com",
        rating: 4.9,
        city: "Koramangala",
        specialization: "Cat specialist",
        profilePic:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=400",
    },
    {
        _id: "g4",
        name: "Arjun Malhotra",
        email: "arjun@example.com",
        rating: 4.8,
        city: "Whitefield",
        specialization: "Puppy grooming",
        profilePic:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
    },
];

const TRAINERS: TrainerModel[] = [
    {
        _id: "t1",
        name: "Sanya Kapoor",
        email: "sanya@example.com",
        rating: 4.8,
        city: "HSR Layout",
        specialization: "Obedience training",
        profilePic:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=400",
    },
    {
        _id: "t2",
        name: "Ethan Wells",
        email: "ethan@example.com",
        rating: 4.7,
        city: "Indiranagar",
        specialization: "Behavior correction",
        profilePic:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400",
    },
    {
        _id: "t3",
        name: "Mira Shah",
        email: "mira@example.com",
        rating: 4.9,
        city: "Koramangala",
        specialization: "Puppy training",
        profilePic:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
    },
    {
        _id: "t4",
        name: "David Lee",
        email: "david@example.com",
        rating: 4.8,
        city: "Whitefield",
        specialization: "Agility & sport",
        profilePic:
            "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=400",
    },
];

type ProviderKind = "groomer" | "trainer";

export default function ProvidersScreen() {
    const isDark = useColorScheme() === "dark";
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [specialization, setSpecialization] = useState<string>("All");
    const [activeKind, setActiveKind] = useState<ProviderKind>("groomer");

    const placeholder = isDark ? "#9CA3AF" : "#6B7280";
    const iconOnFilter = isDark ? "#000000" : "#FFFFFF";

    const source = activeKind === "groomer" ? GROOMERS : TRAINERS;

    const specOptions = useMemo(() => {
        const set = new Set<string>();
        source.forEach((p) => p.specialization && set.add(p.specialization));
        return ["All", ...Array.from(set)];
    }, [source]);

    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        return source.filter((p) => {
            const bySpec =
                specialization === "All"
                    ? true
                    : (p.specialization || "").toLowerCase() ===
                    specialization.toLowerCase();

            const byQuery =
                q.length === 0 ||
                p.name.toLowerCase().includes(q) ||
                (p.specialization || "").toLowerCase().includes(q) ||
                (p.city || "").toLowerCase().includes(q);

            return bySpec && byQuery;
        });
    }, [searchTerm, specialization, source]);

    const header = (
        <View>
            <View className="flex-row items-center w-full gap-3 h-12 mb-6 mt-4">
                <Pressable
                    onPress={() => {
                        setActiveKind("groomer");
                        setSpecialization("All");
                    }}
                    className={`flex-1 h-full rounded-full items-center justify-center ${
                        activeKind === "groomer" ? "bg-black dark:bg-white" : "bg-light-gray dark:bg-dark-gray"
                    }`}
                >
                    <Text className={`text-sm font-nunitoSemiBold ${activeKind === "groomer" ? "text-white dark:text-black" : "text-black dark:text-white"}`}>
                        Groomer
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setActiveKind("trainer");
                        setSpecialization("All");
                    }}
                    className={`flex-1 h-full rounded-full items-center justify-center ${
                        activeKind === "trainer" ? "bg-black dark:bg-white" : "bg-light-gray dark:bg-dark-gray"
                    }`}
                >
                    <Text className={`text-sm font-nunitoSemiBold ${activeKind === "trainer" ? "text-white dark:text-black" : "text-black dark:text-white"}`}>
                        Trainer
                    </Text>
                </Pressable>
            </View>

            <View className="flex-row items-center w-full gap-4 h-12 mb-8">
                <View className="flex-1 flex-row items-center rounded-full h-full px-5 bg-light-gray dark:bg-dark-gray">
                    <Search size={20} color={placeholder} />
                    <TextInput
                        placeholder={`Search ${activeKind === "groomer" ? "groomers" : "trainers"}`}
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
                Providers Near You
            </Text>

            <FlatList
                data={filtered}
                keyExtractor={(it) => it._id}
                ListHeaderComponent={header}
                renderItem={({ item }) => (
                    <ProviderCard
                        kind={activeKind}
                        data={item}
                        onPress={(id: string) => {
                            router.push({
                                pathname: "/appointment/[kind]/[id]",
                                params: { kind: activeKind, id },
                            });
                        }}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
