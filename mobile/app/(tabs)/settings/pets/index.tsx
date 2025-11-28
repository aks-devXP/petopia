// app/(tabs)/settings/pets/index.tsx
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { PetCard } from "@components/pets/PetCard";

export type Pet = {
  _id: string;
  name: string;
  age: number;
  category: string;
  breed: string;
  photo?: string;
};

// Dummy data – schema aligned with web PetBanner
const DUMMY_PETS: Pet[] = [
  {
    _id: "p1",
    name: "Milo",
    age: 2,
    category: "Dog",
    breed: "Beagle",
    photo:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop",
  },
  {
    _id: "p2",
    name: "Luna",
    age: 3,
    category: "Cat",
    breed: "Siamese",
    photo:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=600&auto=format&fit=crop",
  },
  {
    _id: "p3",
    name: "Buddy",
    age: 4,
    category: "Dog",
    breed: "Golden Retriever",
    photo:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=600&auto=format&fit=crop",
  },
  {
    _id: "p4",
    name: "Coco",
    age: 1,
    category: "Cat",
    breed: "British Shorthair",
    photo:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=600&auto=format&fit=crop",
  },
];

export default function PetsListScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const router = useRouter();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DUMMY_PETS;
    return DUMMY_PETS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const onAdd = () => {
    router.push({
      pathname: "/(tabs)/settings/pets/[id]",
      params: { id: "new" },
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Search header */}
      <View className="px-4 pt-3 pb-2">
        <Text className="text-lg font-nunitoBold text-black dark:text-white mb-2">
          Manage Your Pets
        </Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name, breed or type"
          placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
          className="px-4 py-2.5 rounded-full bg-light-gray dark:bg-dark-gray text-sm text-black dark:text-white font-nunito"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PetCard item={item} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-24">
            <Text className="text-neutral-600 dark:text-neutral-400 font-nunito">
              No pets yet. Add your first buddy!
            </Text>
          </View>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={onAdd}
        activeOpacity={0.9}
        className="absolute bottom-8 right-6 h-14 w-14 rounded-full bg-amber-500 items-center justify-center shadow-lg"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Plus size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
