import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import welcomeBg from "@assets/images/welcome.jpg";

export default function WelcomeScreen() {
    return (
        <View className="flex-1">
            <ImageBackground
                source={welcomeBg}
                className="flex-1"
                resizeMode="cover"
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.7)"]}
                    className="flex-1 justify-end px-6 pb-12"
                >
                    <Text className="text-4xl font-quicksandBold text-white mb-3">
                        Everything your pet needs, all in one place
                    </Text>

                    <Text className="text-base font-nunito text-white/80 mb-8">
                    Your smart companion for accessing verified services, and staying informed about your pet’s needs.
                    </Text>

                    <Pressable
                        onPress={() => router.replace("/login")}
                        className="h-14 rounded-full items-center justify-center"
                        style={{ backgroundColor: "#000000" }}
                    >
                        <Text className="text-base font-nunitoSemiBold text-white">
                            Continue
                        </Text>
                    </Pressable>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}
