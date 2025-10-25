// app/(tabs)/(breed)/index.tsx
import React, { useMemo, useState } from "react";
import slugify from "slugify";
import { router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    Pressable,
    useColorScheme,
    FlatList,
    Image,
} from "react-native";
import { Search, SlidersHorizontal } from "lucide-react-native";

// assets
import cat from "@assets/category/cat.png";
import dog from "@assets/category/dog.png";
import bird from "@assets/category/bird.png";
import fish from "@assets/category/fish.png";
import cattleImg from "@assets/category/cow.png";

// card
import CategoryCard from "@components/breed/CategoryCard";

export default function BreedHomeScreen() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";
    const iconOnFilter = isDark ? "#000000" : "#FFFFFF";
    const placeholder = isDark ? "#A1A1AA" : "#6B7280";

    const [searchTerm, setSearchTerm] = useState("");

    const COLORS = {
        light: {
            pink: "#F6E8EC",
            yellow: "#F2F1D0",
            blue: "#D5ECF1",
            lavender: "#D4D5DC",
            cream: "#FFE9D6",
        },
        dark: {
            pink: "#E8BBC7",
            yellow: "#E0DFAF",
            blue: "#A7D7E4",
            lavender: "#BDBDCA",
            cream: "#E8CDB3",
        },
    } as const;

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
        new Set(["cats"])
    );

    const categories = useMemo(
        () => [
            {
                key: "cats",
                label: "Cats",
                image: cat,
                accent: isDark ? COLORS.light.pink : COLORS.dark.pink,
            },
            {
                key: "dogs",
                label: "Dogs",
                image: dog,
                accent: isDark ? COLORS.light.yellow : COLORS.dark.yellow,
            },
            {
                key: "birds",
                label: "Birds",
                image: bird,
                accent: isDark ? COLORS.light.blue : COLORS.dark.blue,
            },
            {
                key: "fish",
                label: "Fish",
                image: fish,
                accent: isDark ? COLORS.light.lavender : COLORS.dark.lavender,
            },
            {
                key: "cattle",
                label: "Cattle",
                image: cattleImg,
                accent: isDark ? COLORS.light.cream : COLORS.dark.cream,
            },
        ],
        [isDark]
    );

    const toggleKey = (key: string) => {
        setSelectedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                if (next.size > 1) next.delete(key); // keep at least one selected
            } else {
                next.add(key);
            }
            return next;
        });
    };

    // ----- DATA (now with slug) -----
    const ALL_ITEMS = useMemo(
        () =>
            [
                { name: "Persian", species: "cats", image: cat },
                { name: "Maine Coon", species: "cats", image: cat },
                { name: "German Shepherd", species: "dogs", image: dog },
                { name: "Golden Retriever", species: "dogs", image: dog },
                { name: "Budgerigar", species: "birds", image: bird },
                { name: "Cockatiel", species: "birds", image: bird },
                { name: "Betta", species: "fish", image: fish },
                { name: "Goldfish", species: "fish", image: fish },
                { name: "Holstein", species: "cattle", image: cattleImg },
                { name: "Jersey", species: "cattle", image: cattleImg },
            ].map((it, i) => ({
                ...it,
                id: String(i + 1),
                // include species in slug to avoid collisions across species
                slug: slugify(`${it.name}-${it.species}`, { lower: true, strict: true }),
            })),
        []
    );

    const filteredItems = useMemo(() => {
        const active = selectedKeys;
        const q = searchTerm.trim().toLowerCase();
        return ALL_ITEMS.filter((it) => {
            const inCategory = active.has(it.species);
            const matchesSearch =
                q === "" ||
                it.name.toLowerCase().includes(q) ||
                it.species.toLowerCase().includes(q);
            return inCategory && matchesSearch;
        });
    }, [ALL_ITEMS, selectedKeys, searchTerm]);

    const Header = (
        <View className="p-4 pt-24">
            <Text className="text-4xl text-ink dark:text-ink-on-dark mb-4 font-quicksandBold pl-1">
                Know Them Better
            </Text>

            <View className="flex-row items-center w-full gap-3 h-12 mt-4">
                <View className="flex-1 flex-row items-center rounded-full h-full px-5 py-4 bg-light-gray dark:bg-dark-gray">
                    <Search size={20} color={placeholder} />
                    <TextInput
                        placeholder="Search here..."
                        placeholderTextColor={placeholder}
                        className="flex-1 ml-2 text-ink dark:text-ink-on-dark"
                        selectionColor={isDark ? "#FFFFFF" : "#000000"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="while-editing"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
                <Pressable className="w-12 h-12 rounded-full items-center justify-center bg-dark dark:bg-light">
                    <SlidersHorizontal size={22} color={iconOnFilter} strokeWidth={2} />
                </Pressable>
            </View>

            <Text className="mt-8 mb-3 text-2xl text-ink dark:text-ink-on-dark font-nunitoLight">
                Category
            </Text>

            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.key}
                showsHorizontalScrollIndicator={false}
                style={{ height: 140 }}
                contentContainerStyle={{ paddingRight: 8, alignItems: "center" }}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                renderItem={({ item }) => (
                    <CategoryCard
                        image={item.image}
                        label={item.label}
                        selected={selectedKeys.has(item.key)}
                        onPress={() => toggleKey(item.key)}
                        borderColor={item.accent}
                    />
                )}
            />

            <Text className="mt-8 mb-3 text-2xl text-ink dark:text-ink-on-dark font-nunitoLight">
                Popular Picks
            </Text>
        </View>
    );

    return (
        <FlatList
            className="flex-1 bg-light dark:bg-dark"
            data={filteredItems}
            keyExtractor={(item) => item.slug} // use slug as key
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={Header}
            renderItem={({ item }) => (
                <View className="px-4 pb-4">
                    <Pressable
                        onPress={() => router.push(`/breed/${item.slug}`)} // <- navigate by slug
                        className="rounded-2xl bg-light-gray dark:bg-dark-gray p-3 active:opacity-80"
                    >
                        <View className="w-full aspect-[16/9] rounded-xl bg-white items-center justify-center overflow-hidden">
                            <Image
                                source={item.image}
                                style={{ width: "70%", height: "70%" }}
                                resizeMode="contain"
                            />
                        </View>

                        <Text className="mt-2 text-left text-ink dark:text-ink-on-dark font-quicksandSemiBold text-base">
                            {item.name}
                        </Text>
                    </Pressable>
                </View>
            )}
            ListEmptyComponent={
                <View className="py-16 items-center">
                    <Text className="text-ink dark:text-ink-on-dark">No results found.</Text>
                </View>
            }
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 24 }}
        />
    );
}
