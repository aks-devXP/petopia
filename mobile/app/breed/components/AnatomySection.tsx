// app/breed/components/AnatomySection.tsx
import { View, Text } from "react-native";
import ResponsiveImage from "@components/ResponsiveImage";

export default function AnatomySection({ data }: any) {
    const { physical_characteristics = {}, images } = data || {};
    const imageSrc = images?.secondary || images?.primary || "";

    const formatKey = (k: string) =>
        k.replace(/([A-Z])/g, " $1").trim().replace(/^./, (s) => s.toUpperCase());

    return (
        <View className="mt-12">
            <Text className="text-2xl font-nunitoBold mb-1 text-black dark:text-white">
                Head to Tail
            </Text>

            {/* Image (no cropping, responsive to padding) */}
            <View className="w-full items-center mb-3">
                <ResponsiveImage uri={imageSrc} horizontalPadding={32} />
            </View>

            {/* Traits card */}
            <View className="rounded-2xl bg-light-gray dark:bg-dark-gray">
                {Object.entries(physical_characteristics).map(([key, value], idx, arr) => (
                    <View key={key}>
                        <View className="flex-row items-start">
                            <View className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 mr-2">
                                <Text className="text-sm font-nunitoSemiBold text-black dark:text-white">
                                    {formatKey(key)}
                                </Text>
                            </View>
                            <Text className="flex-1 text-base font-nunito text-black dark:text-white">
                                {String(value ?? "N/A")}
                            </Text>
                        </View>

                        {idx < arr.length - 1 && (
                            <View className="h-px bg-neutral-200 dark:bg-neutral-800 my-3" />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}
