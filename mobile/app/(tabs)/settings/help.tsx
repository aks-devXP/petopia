// app/(tabs)/settings/help.tsx
import React, { useMemo, useState } from "react";
import ContactRow from "@components/help/ContactRow";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    Linking,
    Alert,
    useColorScheme, Platform,
} from "react-native";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    ChevronDown,
    ChevronUp,
} from "lucide-react-native";

type Faq = { q: string; a: string };



function FaqItem({ item }: { item: Faq }) {
    const [open, setOpen] = useState(false);
    return (
        <View className="rounded-2xl bg-light-gray dark:bg-dark-gray mb-3">
            <Pressable
                onPress={() => setOpen((v) => !v)}
                className="flex-row items-center justify-between px-4 py-3"
            >
                <Text className="flex-1 pr-3 text-base font-nunitoSemiBold text-black dark:text-white">
                    {item.q}
                </Text>
                {open ? (
                    <ChevronUp size={20} color={"#9CA3AF"} />
                ) : (
                    <ChevronDown size={20} color={"#9CA3AF"} />
                )}
            </Pressable>
            {open ? (
                <View className="px-4 pb-4">
                    <Text className="text-base font-nunito text-neutral-700 dark:text-neutral-300">
                        {item.a}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}

export default function HelpScreen() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";
    const iconColor = isDark ? "#FFFFFF" : "#000000";
    const iconMuted = isDark ? "#D1D5DB" : "#6B7280";
    const placeholder = isDark ? "#A1A1AA" : "#9CA3AF";

    // Contact details (replace with real data)
    const phone = "+0123456789";
    const email = "support@petopia.app";
    const address = "IIIT Delhi, New Delhi";

    // Form state
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [message, setMessage] = useState("");

    const faqs: Faq[] = useMemo(
        () => [
            {
                q: "How do I book a vet appointment in Petopia?",
                a: "Go to Appointments in Settings and tap 'Book a Visit'. Choose a vet, date, and time. You’ll receive a reminder automatically.",
            },
            {
                q: "Can I upload medical records?",
                a: "Yes. In Medical History, tap 'Add Record' to upload prescriptions, lab results, or vaccination history.",
            },
            {
                q: "What if I can’t find my pet’s breed?",
                a: "We’re adding more breeds regularly. Send us the breed name via this page and we’ll prioritize it.",
            },
            {
                q: "How is my data protected?",
                a: "We follow standard security practices and never sell your data. See Privacy & Security in Settings for details.",
            },
        ],
        []
    );

    const submit = () => {
        if (!first || !formEmail || !message) {
            Alert.alert("Missing info", "Please fill First name, Email, and Message.");
            return;
        }
        // TODO: hook up your API / mailer here
        Alert.alert("Thanks!", "Your message has been sent.");
        setFirst("");
        setLast("");
        setFormEmail("");
        setPhoneNum("");
        setMessage("");
    };

    return (
        <ScrollView
            className="flex-1 bg-white dark:bg-black"
            contentContainerStyle={{ paddingBottom: 28 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Intro */}
            <View className="px-4 pt-4">
                <Text className="text-2xl font-quicksandBold text-black dark:text-white">
                    Contact Us
                </Text>
                <Text className="mt-1 text-sm font-nunito text-neutral-700 dark:text-neutral-300">
                    Any questions? We’re here to help.
                </Text>
            </View>

            {/* Quick contact cards */}
            <View className="px-4 mt-5">
                <ContactRow
                    icon={<Phone size={18} color={iconMuted} />}
                    label="Phone"
                    value={phone}
                    onPress={() => Linking.openURL(`tel:${phone}`)}
                />
                <ContactRow
                    icon={<Mail size={18} color={"#FFFFFF"} />}
                    label="Email"
                    value={email}
                    onPress={() => Linking.openURL(`mailto:${email}`)}
                />
                <ContactRow
                    icon={<MapPin size={18} color={iconMuted} />}
                    label="Address"
                    value={address}
                    onPress={() =>
                        Linking.openURL(
                            Platform.select({
                                ios: `http://maps.apple.com/?q=${encodeURIComponent(address)}`,
                                android: `geo:0,0?q=${encodeURIComponent(address)}`,
                                default: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    address
                                )}`,
                            }) as string
                        )
                    }
                />
            </View>

            {/* Contact form */}
            <View className="px-4 mt-6">
                <Text className="text-xl font-nunitoBold text-black dark:text-white mb-3">
                    Send us a message
                </Text>

                {/* Row: First / Last */}
                <View className="flex-row gap-3">
                    <View className="flex-1">
                        <Text className="mb-1 text-xs font-nunitoSemiBold text-black dark:text-white">
                            First Name
                        </Text>
                        <TextInput
                            value={first}
                            onChangeText={setFirst}
                            placeholder="Your first name"
                            placeholderTextColor={placeholder}
                            className="px-4 h-11 rounded-xl bg-light-gray dark:bg-dark-gray text-black dark:text-white font-nunito"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="mb-1 text-xs font-nunitoSemiBold text-black dark:text-white">
                            Last Name
                        </Text>
                        <TextInput
                            value={last}
                            onChangeText={setLast}
                            placeholder="Your last name"
                            placeholderTextColor={placeholder}
                            className="px-4 h-11 rounded-xl bg-light-gray dark:bg-dark-gray text-black dark:text-white font-nunito"
                        />
                    </View>
                </View>

                {/* Email */}
                <View className="mt-3">
                    <Text className="mb-1 text-xs font-nunitoSemiBold text-black dark:text-white">
                        Email
                    </Text>
                    <TextInput
                        value={formEmail}
                        onChangeText={setFormEmail}
                        placeholder="youremail@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={placeholder}
                        className="px-4 h-11 rounded-xl bg-light-gray dark:bg-dark-gray text-black dark:text-white font-nunito"
                    />
                </View>

                {/* Phone */}
                <View className="mt-3">
                    <Text className="mb-1 text-xs font-nunitoSemiBold text-black dark:text-white">
                        Phone Number
                    </Text>
                    <TextInput
                        value={phoneNum}
                        onChangeText={setPhoneNum}
                        placeholder="+9876543210"
                        keyboardType="phone-pad"
                        placeholderTextColor={placeholder}
                        className="px-4 h-11 rounded-xl bg-light-gray dark:bg-dark-gray text-black dark:text-white font-nunito"
                    />
                </View>

                {/* Message */}
                <View className="mt-3">
                    <Text className="mb-1 text-xs font-nunitoSemiBold text-black dark:text-white">
                        Message
                    </Text>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type your message here…"
                        placeholderTextColor={placeholder}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        className="px-4 py-3 min-h-[120px] rounded-xl bg-light-gray dark:bg-dark-gray text-black dark:text-white font-nunito"
                    />
                </View>

                {/* Submit */}
                <Pressable
                    onPress={submit}
                    className="mt-4 h-12 rounded-2xl bg-black dark:bg-white flex-row items-center justify-center active:opacity-90"
                >
                    <Text className="text-white dark:text-black font-nunitoSemiBold mr-2">
                        Send Message
                    </Text>
                    <Send size={18} color={isDark ? "#000000" : "#FFFFFF"} />
                </Pressable>
            </View>

            {/* FAQ */}
            <View className="px-4 mt-8 mb-4">
                <Text className="text-xl font-nunitoBold text-black dark:text-white mb-3">
                    FAQs
                </Text>
                {faqs.map((f) => (
                    <FaqItem key={f.q} item={f} />
                ))}
            </View>
        </ScrollView>
    );
}
