import { Image, Pressable, View, Text, Switch } from "react-native";
import { router, Href } from "expo-router";
import { useColorScheme } from "nativewind";
import SettingsItem from "@components/settingcard/SettingsItem";
import {
    Calendar,
    Shield,
    LifeBuoy,
    Info,
    PawPrint,
    PencilLine,
} from "lucide-react-native";

export default function ProfileScreen() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    // dummy profile data for now
    const name = "Aditya";
    const avatarUri = "https://i.pravatar.cc/200?img=12";
    const bannerUri =
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop";

    return (
        <View className="flex-1 bg-white dark:bg-black px-4 py-16">
            {/* Title */}
            <Text className="text-4xl text-ink dark:text-ink-on-dark mb-4 font-quicksandBold pl-1">
                Settings
            </Text>

            {/* Banner + avatar + name */}
            <View className="mb-4 pt-4">
                {/* Banner image with full rounded corners */}
                <View className="rounded-3xl overflow-hidden">
                    <Image
                        source={{ uri: bannerUri }}
                        className="h-28 w-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Avatar & name row */}
                <View className="-mt-10 items-center">
                    <View className="h-20 w-20 rounded-full border-[4px] border-white dark:border-black bg-stone-200 overflow-hidden">
                        <Image
                            source={{ uri: avatarUri }}
                            className="h-full w-full"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="mt-3 flex-row items-center">
                        <Text className="text-xl font-nunitoBold text-black dark:text-white">
                            {name}
                        </Text>

                        {/* Edit icon next to name */}
                        <Pressable
                            onPress={() => router.push("/(tabs)/settings/edit" as Href)}
                            className="ml-3 h-8 w-8 rounded-full bg-black/5 dark:bg-white/10 items-center justify-center"
                        >
                            <PencilLine
                                size={18}
                                color={isDark ? "#FFFFFF" : "#111827"}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Dark Mode Toggle */}
            <View className="mt-1 px-4 py-4 border-t border-b border-neutral-200 dark:border-neutral-800 flex-row items-center rounded-2xl bg-white/60 dark:bg-black/40">
                <Text className="flex-1 font-nunitoSemiBold text-black dark:text-white">
                    Dark Mode
                </Text>
                <Switch
                    value={isDark}
                    onValueChange={toggleColorScheme}
                    thumbColor="#ffffff"
                    trackColor={{ false: "#d1d5db", true: "#4b5563" }}
                />
            </View>

            {/* Settings list */}
            <View className="mt-4 flex-col space-y-3">
                <SettingsItem
                    label="My Pets"
                    icon={PawPrint}
                    href={"/(tabs)/settings/pets" as Href}
                />
                <SettingsItem
                    label="Appointments"
                    icon={Calendar}
                    href={"/(tabs)/settings/appointments" as Href}
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
