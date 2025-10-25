// app/breed/components/RatingSection.tsx
import { View, Text, useColorScheme } from "react-native";
import { PawPrint } from "lucide-react-native";

export default function RatingSection({ data }: any) {
    const { ratings = {} } = data || {};
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    // ✅ Theme-aware paw colors
    const ACTIVE_PAW = isDark ? "#FFFFFF" : "#000000";   // white on dark, black on light
    const INACTIVE_PAW = isDark ? "#D1D5DB" : "#4B5563"; // light gray on dark, dark gray on light

    const formatKey = (k: string) =>
        k
            .replace(/([A-Z])/g, " $1")
            .trim()
            .replace(/^./, (s) => s.toUpperCase());

    return (
        <View className="mt-2">
            {Object.keys(ratings).map((key) => (
                <View
                    key={key}
                    className="flex-row justify-between items-center mb-4"
                >
                    {/* Label: bigger, Nunito */}
                    <Text className="text-lg font-nunitoSemiBold text-black dark:text-white">
                        {formatKey(key)}
                    </Text>

                    {/* Paw rating */}
                    <View className="flex-row">
                        {[1, 2, 3, 4, 5].map((paw) => {
                            const filled = paw <= (ratings as any)[key];
                            return (
                                <PawPrint
                                    key={paw}
                                    size={22}
                                    color={filled ? ACTIVE_PAW : INACTIVE_PAW}
                                    fill={filled ? ACTIVE_PAW : "transparent"}
                                    style={{ marginLeft: 6 }}
                                    accessibilityLabel={`${formatKey(key)}: ${ratings[key]} out of 5`}
                                    accessibilityRole="image"
                                />
                            );
                        })}
                    </View>
                </View>
            ))}
        </View>
    );
}
