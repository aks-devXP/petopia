// app/(tabs)/settings/index.tsx
import { Image, Pressable, View, Text, Switch } from "react-native";
import { router, Href } from "expo-router";
import { useColorScheme } from "nativewind";            // ✅ theme toggle (NativeWind)
import SettingsItem from "@components/settingcard/SettingsItem";
import { Calendar, FileText, Shield, LifeBuoy, Info, PawPrint } from "lucide-react-native";

export default function ProfileScreen() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <View className="pt-24 p-4">
            {/* Title */}
            <Text className="text-4xl text-ink dark:text-ink-on-dark mb-4 font-quicksandBold pl-1">
                Settings
            </Text>

            {/* Header */}
            <View className="px-4 py-4 bg-light-gray dark:bg-dark-gray rounded-3xl">
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: "https://i.pravatar.cc/200?img=12" }}
                        className="h-16 w-16 rounded-full border border-black/10 dark:border-white/10"
                    />
                    <View className="flex-1 ml-4">
                        <Text className="text-xl font-semibold text-black dark:text-white">
                            Aditya
                        </Text>
                        <Text className="text-md text-neutral-500 dark:text-neutral-400">
                            @petopia.user
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => router.push("/(tabs)/settings/edit" as Href)}
                        className="px-4 py-2 rounded-xl bg-black/10 dark:bg-white/10 mr-4"
                    >
                        <Text className="text-black dark:text-white font-medium">Edit</Text>
                    </Pressable>
                </View>
            </View>

            {/* Dark Mode Toggle */}
            <View className="mt-4 px-4 py-4 border-t border-b border-neutral-200 dark:border-neutral-800 flex-row items-center">
                <Text className="flex-1 font-nunitoSemiBold text-black dark:text-white"> Dark Mode </Text>
                <Switch
                    value={isDark}
                    onValueChange={toggleColorScheme}
                    thumbColor={isDark ? "#fff" : "#fff"}
                    trackColor={{ false: "#d1d5db", true: "#4b5563" }}
                />
            </View>

            {/* Settings list */}
            <View className="mt-3 flex-col space-y-3">
                <SettingsItem
                    label="My Pets"                                   // chosen label
                    icon={PawPrint}
                    href={"/(tabs)/settings/pets" as Href}
                />
                <SettingsItem
                    label="Appointments"
                    icon={Calendar}
                    href={"/(tabs)/settings/appointments" as Href}
                />
                <SettingsItem
                    label="Medical History"
                    icon={FileText}
                    href={"/(tabs)/settings/medical-history" as Href}
                />
                <SettingsItem
                    label="Privacy & Security"
                    icon={Shield}
                    href={"/(tabs)/settings/privacy" as Href}
                />
                <SettingsItem
                    label="Help & Support"
                    icon={LifeBuoy}
                    href={"/(tabs)/settings/help" as Href}
                />
                <SettingsItem
                    label="About Us"
                    icon={Info}
                    href={"/(tabs)/settings/about" as Href}
                />
            </View>
        </View>
    );
}
