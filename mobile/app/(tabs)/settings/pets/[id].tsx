// app/(tabs)/settings/pets/[id].tsx
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image as ImageIcon, PawPrint, Save, Trash2 } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import type { Pet } from "@app/(tabs)/settings/pets";

// Same dummy list; in real app replace with API
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

async function mockFetchPetById(id: string): Promise<Pet | null> {
  await new Promise((r) => setTimeout(r, 250));
  return DUMMY_PETS.find((p) => p._id === id) ?? null;
}

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const isCreate = id === "new";

  const [loading, setLoading] = useState(!isCreate);
  const [err, setErr] = useState("");
  const [form, setForm] = useState<Pet>({
    _id: "",
    name: "",
    age: 0,
    category: "",
    breed: "",
    photo: "",
  });

  useEffect(() => {
    if (isCreate) return;

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await mockFetchPetById(String(id));
        if (!cancelled) {
          if (!res) {
            setErr("Pet not found.");
          } else {
            setForm(res);
          }
        }
      } catch {
        if (!cancelled) setErr("Failed to load pet.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, isCreate]);

  const isValid =
    form.name.trim().length > 0 &&
    !Number.isNaN(Number(form.age)) &&
    Number(form.age) >= 0 &&
    form.category.trim().length > 0 &&
    form.breed.trim().length > 0;

  const onSave = () => {
    if (!isValid) {
      Alert.alert("Missing info", "Please fill all required fields correctly.");
      return;
    }

    // TODO: hook to real CreatePet / UpdatePet + image upload
    if (isCreate) {
      Alert.alert("Saved", "New pet created (dummy mode).");
    } else {
      Alert.alert("Updated", "Pet updated (dummy mode).");
    }
    router.back();
  };

  const onDelete = () => {
    if (isCreate) {
      router.back();
      return;
    }
    Alert.alert(
      "Remove pet?",
      "This would remove the pet in a real app.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            Alert.alert("Removed", "Pet removed (dummy mode).");
            router.back();
          },
        },
      ]
    );
  };

  const handlePickImage = async () => {
    // Ask permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need access to your photos to select a pet picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    // Store the local file URI
    setForm((f) => ({ ...f, photo: asset.uri }));
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator />
        <Text className="mt-3 text-base font-nunito text-neutral-700 dark:text-neutral-300">
          Loading…
        </Text>
      </View>
    );
  }

  if (err && !isCreate) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black p-6">
        <Text className="text-base font-nunitoBold text-red-600">{err}</Text>
      </View>
    );
  }

  const iconMuted = isDark ? "#D1D5DB" : "#6B7280";

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / photo card */}
        <View
          className="mt-5 mx-4 rounded-2xl bg-light-gray dark:bg-dark-gray p-4"
          style={{
            shadowColor: "#000",
            shadowOpacity: isDark ? 0.22 : 0.1,
            shadowOffset: { width: 0, height: 6 },
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          {form.photo ? (
            <Image
              source={{ uri: form.photo }}
              className="w-full h-44 rounded-2xl mb-3"
            />
          ) : (
            <View className="w-full h-44 rounded-2xl mb-3 bg-amber-100 items-center justify-center">
              <PawPrint size={40} color="#92400E" />
              <Text className="mt-2 text-sm text-neutral-700 dark:text-neutral-200 font-nunito">
                No photo yet
              </Text>
            </View>
          )}

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={handlePickImage}
              className="flex-row items-center px-3 py-2 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700"
            >
              <ImageIcon size={18} color={iconMuted} />
              <Text className="ml-2 text-sm font-nunito text-neutral-800 dark:text-neutral-100">
                {form.photo ? "Change photo" : "Add photo from gallery"}
              </Text>
            </TouchableOpacity>

            {form.photo ? (
              <TouchableOpacity
                onPress={() => setForm((f) => ({ ...f, photo: "" }))}
                className="flex-row items-center px-3 py-2 rounded-full bg-red-50 border border-red-200"
              >
                <Trash2 size={18} color="#DC2626" />
                <Text className="ml-2 text-sm font-nunito text-red-700">
                  Remove
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Form */}
        <View className="mt-6 mx-4 space-y-4">
          {/* Name */}
          <View>
            <Text className="mb-1 text-sm font-nunitoBold text-neutral-800 dark:text-neutral-100">
              Name *
            </Text>
            <TextInput
              value={form.name}
              onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Eg. Milo"
              placeholderTextColor={iconMuted}
              className="px-4 py-3 rounded-2xl bg-light-gray dark:bg-dark-gray text-base text-black dark:text-white font-nunito"
            />
          </View>

          {/* Age + Category */}
          <View className="flex-row space-x-12 gap-4">
            <View className="flex-1">
              <Text className="mb-1 text-sm font-nunitoBold text-neutral-800 dark:text-neutral-100">
                Age (years) *
              </Text>
              <TextInput
                value={String(form.age || "")}
                onChangeText={(v) =>
                  setForm((f) => ({ ...f, age: Number(v) || 0 }))
                }
                placeholder="Eg. 3"
                keyboardType="numeric"
                placeholderTextColor={iconMuted}
                className="px-4 py-3 rounded-2xl bg-light-gray dark:bg-dark-gray text-base text-black dark:text-white font-nunito"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-sm font-nunitoBold text-neutral-800 dark:text-neutral-100">
                Category *
              </Text>
              <TextInput
                value={form.category}
                onChangeText={(v) => setForm((f) => ({ ...f, category: v }))}
                placeholder="Dog / Cat"
                placeholderTextColor={iconMuted}
                className="px-4 py-3 rounded-2xl bg-light-gray dark:bg-dark-gray text-base text-black dark:text-white font-nunito"
              />
            </View>
          </View>

          {/* Breed */}
          <View>
            <Text className="mb-1 text-sm font-nunitoBold text-neutral-800 dark:text-neutral-100">
              Breed *
            </Text>
            <TextInput
              value={form.breed}
              onChangeText={(v) => setForm((f) => ({ ...f, breed: v }))}
              placeholder="Eg. Beagle"
              placeholderTextColor={iconMuted}
              className="px-4 py-3 rounded-2xl bg-light-gray dark:bg-dark-gray text-base text-black dark:text-white font-nunito"
            />
          </View>
        </View>
      </ScrollView>

      {/* Action bar */}
      <View className="absolute bottom-0 left-0 right-0 flex-row px-6 py-4 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700">
        {!isCreate && (
          <TouchableOpacity
            onPress={onDelete}
            className="flex-1 mr-3 py-3 rounded-full border-4 border-red-600"
          >
            <Text className="text-center text-red-700 font-nunitoBold text-base">
              Remove
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onSave}
          disabled={!isValid}
          className={`flex-1 py-3 rounded-full border-4 ${
            isValid ? "border-black bg-black" : "border-neutral-400 bg-neutral-400"
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Save size={20} color="#fff" />
            <Text className="ml-2 text-center text-white font-nunitoBold text-base">
              {isCreate ? "Save Pet" : "Save Changes"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
