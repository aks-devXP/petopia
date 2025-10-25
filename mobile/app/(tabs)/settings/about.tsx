import { Image, ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white dark:bg-black font-nunito mt-6">
            <View className="flex-1 flex-col justify-between px-5">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <Text className="text-base font-nunitoSemiBold leading-6 text-neutral-700 dark:text-neutral-300 mb-3">
                        Petopia is built on a simple idea: every pet deserves the best care, and every pet parent should have the right tools to provide it.
                    </Text>

                    <Text className="text-base leading-6 text-neutral-700 dark:text-neutral-300 mb-3">
                        Many pet owners rely on scattered information and uncertain advice when it comes to their pets’ health. Petopia brings everything together in one reliable, easy-to-use platform designed to support everyday care and long-term well-being.
                    </Text>

                    <Text className="text-base leading-6 text-neutral-700 dark:text-neutral-300 mb-3">
                        Our goal is to create a connected ecosystem where medical records, vet consultations, nutrition plans, event updates, and NGO support exist in one trusted space. Petopia focuses on proactive, transparent, and accessible care-making it simpler to give pets the attention they deserve.
                    </Text>

                    <Text className="text-base leading-6 text-neutral-700 dark:text-neutral-300 mb-3">
                        What makes Petopia different is its focus on solving real challenges in modern pet care. Instead of generic advice, users receive structured guidance, access to trusted professionals, and timely reminders to prevent small issues from becoming emergencies.
                    </Text>

                    <Text className="text-base leading-6 text-neutral-700 dark:text-neutral-300 mb-3">
                        Petopia stands for responsible ownership, reliable access to care, and a community built on trust and compassion.
                    </Text>

                    {/* Divider */}
                    <View className="h-px bg-neutral-200 dark:bg-neutral-800 my-6" />
                </ScrollView>

                {/* Footer (Brand + Contact) */}
                <View className="pb-16">
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={require("@assets/images/icon.png")}
                            className="h-12 w-12 rounded-lg"
                            resizeMode="cover"
                        />
                        <Text className="text-2xl font-quicksandBold text-black dark:text-white">
                            Petopia
                        </Text>
                    </View>

                    <Text className="mt-3 text-sm leading-5 text-neutral-700 dark:text-neutral-300">
                        For any questions or clarifications, reach us at{" "}
                        <Text className="font-semibold text-black dark:text-white">
                            support@petopia.app
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}
