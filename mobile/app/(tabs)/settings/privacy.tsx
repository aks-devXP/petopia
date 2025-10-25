// app/(tabs)/settings/privacy.tsx
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    Switch,
    Alert,
    useColorScheme,
} from "react-native";
import {
    Lock,
    Shield,
    Eye,
    EyeOff,
    Bell,
    CheckCircle2,
    AlertCircle,
} from "lucide-react-native";

export default function PrivacySecurityScreen() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";
    const placeholder = isDark ? "#A1A1AA" : "#9CA3AF";

    // --- Change Password state ---
    const [current, setCurrent] = useState("");
    const [nextPwd, setNextPwd] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showCurr, setShowCurr] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showConf, setShowConf] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // basic strength hint
    const strength = useMemo(() => {
        let s = 0;
        if (nextPwd.length >= 8) s++;
        if (/[A-Z]/.test(nextPwd)) s++;
        if (/[0-9]/.test(nextPwd)) s++;
        if (/[^A-Za-z0-9]/.test(nextPwd)) s++;
        return s; // 0–4
    }, [nextPwd]);

    const strengthLabel = ["Too short", "Weak", "Okay", "Good", "Strong"][strength];
    const strengthColor = isDark
        ? ["#EF4444", "#F59E0B", "#FCD34D", "#86EFAC", "#34D399"][strength]
        : ["#DC2626", "#D97706", "#F59E0B", "#16A34A", "#059669"][strength];

    const submitPassword = async () => {
        if (!current || !nextPwd || !confirm) {
            Alert.alert("Missing fields", "Please fill all password fields.");
            return;
        }
        if (nextPwd !== confirm) {
            Alert.alert("Mismatch", "New password and confirmation do not match.");
            return;
        }
        if (strength < 2) {
            Alert.alert("Weak password", "Please choose a stronger password (8+ chars, mix of cases, numbers, symbol).");
            return;
        }

        try {
            setSubmitting(true);
            // TODO: hook to your backend API
            await new Promise((r) => setTimeout(r, 800));
            setCurrent("");
            setNextPwd("");
            setConfirm("");
            Alert.alert("Success", "Your password has been updated.");
        } catch {
            Alert.alert("Error", "Could not update password. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // --- Notifications state ---
    const [email, setEmail] = useState(true);
    const [message, setMessage] = useState(true);
    const [call, setCall] = useState(false);
    const [offers, setOffers] = useState(true);
    const [news, setNews] = useState(true);

    const Section = ({
                         title,
                         subtitle,
                         icon,
                         children,
                     }: {
        title: string;
        subtitle?: string;
        icon?: React.ReactNode;
        children: React.ReactNode;
    }) => (
        <View className="mt-6">
            <View className="flex-row items-center mb-1">
                {icon ? <View className="mr-2">{icon}</View> : null}
                <Text className="text-xl font-nunitoBold text-black dark:text-white">
                    {title}
                </Text>
            </View>
            {subtitle ? (
                <Text className="text-sm font-nunito text-neutral-700 dark:text-neutral-300">
                    {subtitle}
                </Text>
            ) : null}
            <View className="mt-3 rounded-2xl bg-light-gray dark:bg-dark-gray p-4">
                {children}
            </View>
        </View>
    );

    const Row = ({
                     label,
                     right,
                     top,
                     bottom,
                 }: {
        label: string;
        right?: React.ReactNode;
        top?: boolean;
        bottom?: boolean;
    }) => (
        <View>
            <View className="flex-row items-center justify-between py-3">
                <Text className="text-base font-nunito text-black dark:text-white">
                    {label}
                </Text>
                {right}
            </View>
            {!bottom && (
                <View className="h-px bg-neutral-200 dark:bg-neutral-800" />
            )}
        </View>
    );

    const InputRow = ({
                          label,
                          value,
                          onChangeText,
                          secure = false,
                          show,
                          setShow,
                          autoComplete,
                          placeholderText,
                      }: {
        label: string;
        value: string;
        onChangeText: (t: string) => void;
        secure?: boolean;
        show?: boolean;
        setShow?: (v: boolean) => void;
        autoComplete?:
            | "password"
            | "off"
            | "current-password"
            | "new-password"
            | undefined;
        placeholderText?: string;
    }) => (
        <View className="mb-3">
            <Text className="mb-1 text-xs font-nunitoSemiBold text-black dark:text-white">
                {label}
            </Text>
            <View className="flex-row items-center rounded-xl bg-white dark:bg-black px-3">
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholderText}
                    placeholderTextColor={placeholder}
                    className="flex-1 h-11 text-black dark:text-white font-nunito"
                    secureTextEntry={secure && !show}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType={autoComplete === "current-password" ? "password" : "newPassword"}
                />
                {secure && setShow ? (
                    <Pressable
                        onPress={() => setShow(!show)}
                        hitSlop={8}
                        className="h-11 items-center justify-center pl-2"
                    >
                        {show ? (
                            <Eye size={18} color={isDark ? "#FFFFFF" : "#000000"} />
                        ) : (
                            <EyeOff size={18} color={isDark ? "#FFFFFF" : "#000000"} />
                        )}
                    </Pressable>
                ) : null}
            </View>
        </View>
    );

    return (
        <ScrollView
            className="flex-1 bg-white dark:bg-black"
            contentContainerStyle={{ paddingBottom: 28 }}
            showsVerticalScrollIndicator={false}
        >
            <View className="px-4 pt-4">
                {/* Change Password */}
                <Section
                    title="Password & Security"
                    subtitle="Manage your password and security options."
                    icon={<Shield size={18} color={isDark ? "#FFFFFF" : "#000000"} />}
                >
                    <InputRow
                        label="Current password"
                        value={current}
                        onChangeText={setCurrent}
                        secure
                        show={showCurr}
                        setShow={setShowCurr}
                        autoComplete="current-password"
                        placeholderText="Enter current password"
                    />
                    <InputRow
                        label="New password"
                        value={nextPwd}
                        onChangeText={setNextPwd}
                        secure
                        show={showNext}
                        setShow={setShowNext}
                        autoComplete="new-password"
                        placeholderText="At least 8 characters"
                    />
                    {/* strength hint */}
                    {!!nextPwd && (
                        <View className="flex-row items-center mb-2">
                            {strength >= 2 ? (
                                <CheckCircle2 size={16} color={strengthColor} />
                            ) : (
                                <AlertCircle size={16} color={strengthColor} />
                            )}
                            <Text
                                style={{ color: strengthColor }}
                                className="ml-2 text-xs font-nunitoSemiBold"
                            >
                                {strengthLabel}
                            </Text>
                        </View>
                    )}
                    <InputRow
                        label="Confirm new password"
                        value={confirm}
                        onChangeText={setConfirm}
                        secure
                        show={showConf}
                        setShow={setShowConf}
                        autoComplete="new-password"
                        placeholderText="Re-enter new password"
                    />

                    <Pressable
                        onPress={submitPassword}
                        disabled={submitting}
                        className="mt-2 h-12 rounded-xl bg-black dark:bg-white items-center justify-center active:opacity-90"
                    >
                        <Text className="text-white dark:text-black font-nunitoSemiBold">
                            {submitting ? "Updating…" : "Update Password"}
                        </Text>
                    </Pressable>
                </Section>

                {/* Notifications */}
                <Section
                    title="Notifications"
                    subtitle="Choose how you want to be notified."
                    icon={<Bell size={18} color={isDark ? "#FFFFFF" : "#000000"} />}
                >
                    <Row
                        label="Email Reminder"
                        right={
                            <Switch
                                value={email}
                                onValueChange={setEmail}
                                thumbColor={"#fff"}
                                trackColor={{ false: "#D1D5DB", true: "#4B5563" }}
                            />
                        }
                        top
                    />
                    <Row
                        label="Message Reminder"
                        right={
                            <Switch
                                value={message}
                                onValueChange={setMessage}
                                thumbColor={"#fff"}
                                trackColor={{ false: "#D1D5DB", true: "#4B5563" }}
                            />
                        }
                    />
                    <Row
                        label="Call Reminder"
                        right={
                            <Switch
                                value={call}
                                onValueChange={setCall}
                                thumbColor={"#fff"}
                                trackColor={{ false: "#D1D5DB", true: "#4B5563" }}
                            />
                        }
                    />
                    <Row
                        label="Promotions and Offers"
                        right={
                            <Switch
                                value={offers}
                                onValueChange={setOffers}
                                thumbColor={"#fff"}
                                trackColor={{ false: "#D1D5DB", true: "#4B5563" }}
                            />
                        }
                    />
                    <Row
                        label="Latest News"
                        right={
                            <Switch
                                value={news}
                                onValueChange={setNews}
                                thumbColor={"#fff"}
                                trackColor={{ false: "#D1D5DB", true: "#4B5563" }}
                            />
                        }
                        bottom
                    />
                </Section>
            </View>
        </ScrollView>
    );
}
