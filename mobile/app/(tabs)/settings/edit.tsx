// app/(tabs)/settings/edit.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    Image,
    Alert,
    useColorScheme,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Camera, User2 } from "lucide-react-native";

type Profile = {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    address: string;
    profilePic: string;
    banner: string;
};

// dummy initial data (matches web structure)
const INITIAL_PROFILE: Profile = {
    name: "Aks • Petopia",
    email: "aks@example.com",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    state: "Karnataka",
    address: "HSR Layout, 5th Sector",
    profilePic:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
    banner: "",
};

export default function EditProfile() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);

    const iconMuted = isDark ? "#D1D5DB" : "#6B7280";

    async function pickImage(kind: "banner" | "avatar") {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission needed",
                "We need access to your photos to update your profile images."
            );
            return;
        }

        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.9,
            allowsEditing: true,
            aspect: kind === "banner" ? [16, 9] : [1, 1],
        });

        if (res.canceled) return;
        const asset = res.assets?.[0];
        if (!asset?.uri) return;

        setProfile((p) =>
            kind === "banner"
                ? { ...p, banner: asset.uri }
                : { ...p, profilePic: asset.uri }
        );
    }

    const onCancel = () => {
        setProfile(INITIAL_PROFILE);
        router.back();
    };

    const onSave = () => {
        // later: call backend with `profile`
        console.log("Saving profile:", profile);
        router.back();
    };

    const isValid =
        profile.name.trim() &&
        profile.email.trim() &&
        /^\S+@\S+\.\S+$/.test(profile.email);

    const fieldContainerCls = "mt-4";
    const labelCls =
        "text-xs font-nunitoSemiBold text-neutral-600 dark:text-neutral-300 mb-1.5";
    const inputCls =
        "rounded-2xl bg-white dark:bg-black/30 border border-neutral-200 dark:border-neutral-700 px-4 py-3 text-base text-black dark:text-white font-nunito";

    return (
        <View className="flex-1 bg-white dark:bg-black">
            <ScrollView
                className="flex-1 px-5 pt-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >

                {/* Card */}
                <View
                    className="mt-5 rounded-3xl bg-light-gray dark:bg-dark-gray pb-6"
                    style={{
                        shadowColor: "#000",
                        shadowOpacity: isDark ? 0.2 : 0.06,
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 10,
                        elevation: 2,
                    }}
                >
                    {/* Banner */}
                    <Pressable
                        onPress={() => pickImage("banner")}
                        className="h-24 w-full rounded-t-3xl overflow-hidden"
                    >
                        {profile.banner ? (
                            <Image
                                source={{ uri: profile.banner }}
                                className="h-full w-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="h-full w-full bg-[#E9DDD5] dark:bg-[#1F2933] items-center justify-center">
                                <Camera size={22} color={iconMuted} />
                                <Text className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">
                                    Tap to add banner
                                </Text>
                            </View>
                        )}
                    </Pressable>

                    {/* Avatar */}
                    <View className="items-center">
                        <Pressable
                            onPress={() => pickImage("avatar")}
                            className="-mt-10 h-20 w-20 rounded-full border-[4px] border-white dark:border-black bg-stone-200 overflow-hidden items-center justify-center"
                        >
                            {profile.profilePic ? (
                                <Image
                                    source={{ uri: profile.profilePic }}
                                    className="h-full w-full"
                                    resizeMode="cover"
                                />
                            ) : (
                                <User2 size={32} color={iconMuted} />
                            )}
                        </Pressable>
                    </View>

                    {/* Fields */}
                    <View className="px-4 mt-4">
                        {/* Name */}
                        <View className={fieldContainerCls}>
                            <Text className={labelCls}>Name</Text>
                            <TextInput
                                value={profile.name}
                                onChangeText={(v) =>
                                    setProfile((p) => ({ ...p, name: v }))
                                }
                                placeholder="Your name"
                                placeholderTextColor={iconMuted}
                                className={inputCls}
                            />
                        </View>

                        {/* Email */}
                        <View className={fieldContainerCls}>
                            <Text className={labelCls}>Email</Text>
                            <TextInput
                                value={profile.email}
                                onChangeText={(v) =>
                                    setProfile((p) => ({ ...p, email: v }))
                                }
                                placeholder="you@example.com"
                                placeholderTextColor={iconMuted}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                className={inputCls}
                            />
                        </View>

                        {/* Phone */}
                        <View className={fieldContainerCls}>
                            <Text className={labelCls}>Phone</Text>
                            <TextInput
                                value={profile.phone}
                                onChangeText={(v) =>
                                    setProfile((p) => ({ ...p, phone: v }))
                                }
                                placeholder="+91 ..."
                                placeholderTextColor={iconMuted}
                                keyboardType="phone-pad"
                                className={inputCls}
                            />
                        </View>

                        {/* City + State */}
                        <View className="mt-4 flex-row space-x-3">
                            <View className="flex-1">
                                <Text className={labelCls}>City</Text>
                                <TextInput
                                    value={profile.city}
                                    onChangeText={(v) =>
                                        setProfile((p) => ({ ...p, city: v }))
                                    }
                                    placeholder="City"
                                    placeholderTextColor={iconMuted}
                                    className={inputCls}
                                />
                            </View>
                            <View className="flex-1">
                                <Text className={labelCls}>State</Text>
                                <TextInput
                                    value={profile.state}
                                    onChangeText={(v) =>
                                        setProfile((p) => ({ ...p, state: v }))
                                    }
                                    placeholder="State"
                                    placeholderTextColor={iconMuted}
                                    className={inputCls}
                                />
                            </View>
                        </View>

                        {/* Address */}
                        <View className={fieldContainerCls}>
                            <Text className={labelCls}>Address</Text>
                            <TextInput
                                value={profile.address}
                                onChangeText={(v) =>
                                    setProfile((p) => ({ ...p, address: v }))
                                }
                                placeholder="Full address"
                                placeholderTextColor={iconMuted}
                                multiline
                                className={`${inputCls} min-h-[60px]`}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom actions */}
            <View className="absolute bottom-0 left-0 right-0 flex-row px-5 py-4 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
                <Pressable
                    onPress={onCancel}
                    className="flex-1 mr-3 rounded-full border border-neutral-300 dark:border-neutral-700 py-3"
                >
                    <Text className="text-center text-neutral-800 dark:text-neutral-200 font-nunitoSemiBold">
                        Cancel
                    </Text>
                </Pressable>
                <Pressable
                    onPress={onSave}
                    disabled={!isValid}
                    className={`flex-1 ml-3 rounded-full py-3 ${
                        isValid
                            ? "bg-black dark:bg-white"
                            : "bg-neutral-300 dark:bg-neutral-700"
                    }`}
                >
                    <Text
                        className={`text-center font-nunitoBold text-base ${
                            isValid ? "text-white dark:text-black" : "text-neutral-600"
                        }`}
                    >
                        Save
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
