// components/pets/PetCard.tsx
import React from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { PawPrint, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import type { Pet } from "@app/(tabs)/settings/pets";

interface Props {
  item: Pet;
}

export function PetCard({ item }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const iconColor = isDark ? "#9CA3AF" : "#6B7280";
  const subtleBorder = isDark ? "#1F2933" : "#E5E7EB";

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(tabs)/settings/pets/[id]",
          params: { id: item._id },
        })
      }
      className="rounded-3xl bg-light-gray dark:bg-dark-gray px-4 py-3 mb-4 active:opacity-90"
      style={{
        shadowColor: "#000",
        shadowOpacity: isDark ? 0.18 : 0.06,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 1,
        borderWidth: 1,
        borderColor: subtleBorder,
      }}
    >
      {/* Top row: avatar + name + age + chevron */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-shrink">
          {item.photo ? (
            <Image
              source={{ uri: item.photo }}
              className="h-16 w-16 rounded-2xl mr-3"
            />
          ) : (
            <View className="h-16 w-16 rounded-2xl mr-3 bg-amber-100 items-center justify-center">
              <PawPrint size={26} color="#92400E" />
            </View>
          )}

          <View className="flex-shrink">
            <Text
              className="text-base font-nunitoBold text-black dark:text-white"
              numberOfLines={1}
            >
              {item.name}
            </Text>

            {/* Category pill */}
            <View className="mt-1 flex-row items-center">
              <View className="px-2 py-1 rounded-full bg-white/80 dark:bg-black/40">
                <Text className="text-xs font-nunitoSemiBold text-neutral-700 dark:text-neutral-200">
                  {item.category}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Age badge + chevron */}
        <View className="items-end ml-2">
          <View className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/40">
            <Text className="text-xs font-nunitoSemiBold text-neutral-700 dark:text-neutral-200">
              {item.age} year{item.age !== 1 ? "s" : ""}
            </Text>
          </View>
          <ChevronRight
            size={18}
            color={iconColor}
            style={{ marginTop: 8 }}
          />
        </View>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: subtleBorder,
          marginTop: 10,
          marginBottom: 8,
        }}
      />

      {/* Bottom row: breed, maybe more info later */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className="text-xs font-nunito text-neutral-600 dark:text-neutral-300"
            numberOfLines={1}
          >
            Breed:{" "}
            <Text className="font-nunitoSemiBold">
              {item.breed || "—"}
            </Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
