// app/breed/components/BasicInfo.tsx
import { View, Text, Image, Pressable, SafeAreaView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import ResponsiveImage from "@components/ResponsiveImage";
import { useColorScheme } from "react-native";

export default function BasicInfo({ data }: any) {
    const router = useRouter();
    const { breed, general_info = {}, images } = data || {};
    const imageSrc = images?.primary || images?.secondary || "";
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return (
        <View className="mx-4">
            {/* Header (safe-area + notch padding) */}
            <SafeAreaView>
                <View
                    className="flex-row items-center justify-between"
                    style={{ paddingTop: Platform.OS === "android" ? 16 : 0 }}
                >
                    <Pressable
                        onPress={() => router.back()}
                        hitSlop={8}
                        className="h-10 w-10 rounded-full items-center justify-center bg-black/5 dark:bg-white/10"
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <ArrowLeft
                            size={20}
                            color={isDark ? "#fff" : "#000"}
                        />
                    </Pressable>

                    <Text
                        numberOfLines={1}
                        className="flex-1 ml-3 text-2xl font-nunitoBold text-black dark:text-white"
                    >
                        {breed}
                    </Text>

                    {/* spacer to balance back button */}
                    <View className="h-10 w-10" />
                </View>
            </SafeAreaView>

            {/* Image */}
            <View className="w-full mt-4 mb-4">
                <ResponsiveImage uri={imageSrc} horizontalPadding={32} />
            </View>

            {/* Basic info table */}
            <View className="pb-2 px-2">
                {Object.entries(general_info).map(([key, value]) => (
                    <View key={key} className="flex-row items-start py-2">
                        <Text
                            className="w-2/5 pr-2 text-lg font-nunitoSemiBold text-black dark:text-white"
                        >
                            {key
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                                .replace(/^./, (s) => s.toUpperCase())}
                        </Text>
                        <Text
                            className="w-3/5 text-lg font-nunito text-black dark:text-white"
                        >
                            {String(value ?? "N/A")}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
