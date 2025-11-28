import React, { useState } from "react";
import { Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { Link, router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Facebook, Lock, Mail, User } from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SignupScreen() {
    const isDark = useColorScheme() === "dark";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const bg = isDark ? "#000000" : "#FFFFFF";
    const card = isDark ? "#0F0F10" : "#F5F5F5";
    const text = isDark ? "#FFFFFF" : "#000000";
    const muted = isDark ? "#9CA3AF" : "#6B7280";
    const border = isDark ? "#1F2937" : "#E5E7EB";
    const primary = isDark ? "#FFFFFF" : "#000000";

    return (
        <View className="flex-1 px-5 pt-16" style={{ backgroundColor: bg }}>
            <Pressable
                onPress={() => router.back()}
                className="h-10 w-10 rounded-full items-center justify-center mb-6"
                style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
            >
                <ArrowLeft size={20} color={text} />
            </Pressable>

            <Text className="text-4xl font-quicksandBold mb-2" style={{ color: text }}>
                Create Account
            </Text>
            <Text className="text-base font-nunito mb-6" style={{ color: muted }}>
                Create a new account to get started and enjoy seamless access to our features.
            </Text>

            {/* Name */}
            <View
                className="flex-row items-center rounded-full px-4 h-14 mb-3"
                style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
            >
                <User size={18} color={muted} />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={muted}
                    className="flex-1 ml-3 text-base font-nunito"
                    style={{ color: text }}
                    autoCapitalize="words"
                />
            </View>

            {/* Email */}
            <View
                className="flex-row items-center rounded-full px-4 h-14 mb-3"
                style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
            >
                <Mail size={18} color={muted} />
                <TextInput
                    placeholder="Email address"
                    placeholderTextColor={muted}
                    className="flex-1 ml-3 text-base font-nunito"
                    style={{ color: text }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Password */}
            <View
                className="flex-row items-center rounded-full px-4 h-14 mb-3"
                style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
            >
                <Lock size={18} color={muted} />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={muted}
                    className="flex-1 ml-3 text-base font-nunito"
                    style={{ color: text }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                    {showPassword ? <EyeOff size={18} color={muted} /> : <Eye size={18} color={muted} />}
                </Pressable>
            </View>

            {/* Confirm Password */}
            <View
                className="flex-row items-center rounded-full px-4 h-14 mb-4"
                style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
            >
                <Lock size={18} color={muted} />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={muted}
                    className="flex-1 ml-3 text-base font-nunito"
                    style={{ color: text }}
                    secureTextEntry={!showConfirm}
                    autoCapitalize="none"
                />
                <Pressable onPress={() => setShowConfirm((v) => !v)} hitSlop={8}>
                    {showConfirm ? <EyeOff size={18} color={muted} /> : <Eye size={18} color={muted} />}
                </Pressable>
            </View>

            <Pressable
                className="h-14 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: primary }}
            >
                <Text className="text-base font-nunitoSemiBold" style={{ color: isDark ? "#000000" : "#FFFFFF" }}>
                    Create Account
                </Text>
            </Pressable>

            <View className="flex-row justify-center mb-6">
                <Text className="text-sm font-nunito" style={{ color: muted }}>
                    Already have an account?
                </Text>
                <Link href="/login">
                    <Text className="text-sm font-nunitoSemiBold ml-4" style={{ color: text }}>
                        Sign in here
                    </Text>
                </Link>
            </View>

            <View className="flex-row items-center mb-4">
                <View className="flex-1 h-px" style={{ backgroundColor: border }} />
                <Text className="mx-3 text-xs font-nunito" style={{ color: muted }}>
                    Or Continue With Account
                </Text>
                <View className="flex-1 h-px" style={{ backgroundColor: border }} />
            </View>

            <View className="flex-row justify-center gap-4">
                <Pressable
                    className="h-12 w-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
                >
                    <Facebook size={20} color={text} />
                </Pressable>
                <Pressable
                    className="h-12 w-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: card, borderColor: border, borderWidth: 1 }}
                >
                    <FontAwesome name="google" size={20} color={text} />
                </Pressable>
            </View>
        </View>
    );
}
