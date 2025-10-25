// app/breed/components/CareTips.tsx
import React from "react";
import { View, Text } from "react-native";

type CareTipsProps = {
    data: {
        history?: string[];
        care?: Record<string, string>;
        diet?: { recommended?: string[]; notRecommended?: string[] };
        health?: {
            commonIssues?: string[];
            symptomsToWatch?: string[];
            preventiveTips?: string[];
        };
        owner_tips?: string[];
    };
};

const formatLabel = (k: string) =>
    k
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(/^./, (s) => s.toUpperCase());

const BulletList = ({ items }: { items?: string[] }) => {
    if (!items || items.length === 0) {
        return <Text className="text-base font-nunito text-black dark:text-white">No items listed.</Text>;
    }
    return (
        <View className="space-y-2">
            {items.map((t, i) => (
                <Text key={`${t}-${i}`} className="text-base font-nunito text-black dark:text-white">
                    • {t}
                </Text>
            ))}
        </View>
    );
};

const SectionCard = ({
                         title,
                         subtitle,
                         children,
                         topMargin = true,
                     }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    topMargin?: boolean;
}) => (
    <View className={`mb-5 ${topMargin ? "mt-2" : ""}`}>
        <Text className="text-2xl font-nunitoBold mb-1 text-black dark:text-white">{title}</Text>
        {subtitle ? (
            <Text className="text-sm font-nunito text-neutral-700 dark:text-neutral-300">{subtitle}</Text>
        ) : null}
        <View className="rounded-2xl bg-light-gray dark:bg-dark-gray p-4 pt-1">
            {children}
        </View>
    </View>
);

export default function CareTips({ data }: CareTipsProps) {
    const {
        history = [],
        care = {},
        diet = {},
        health = {},
        owner_tips = [],
    } = data || {};

    return (
        <View className="mt-6">

            {/* History */}
            <SectionCard title="History" subtitle="Background and origin" topMargin={false}>
                <BulletList items={history} />
            </SectionCard>

            {/* Care */}
            <SectionCard title="Care" subtitle="Day-to-day needs">
                {Object.keys(care).length === 0 ? (
                    <Text className="text-base font-nunito text-black dark:text-white">No details available.</Text>
                ) : (
                    <View>
                        {Object.entries(care).map(([key, value], idx, arr) => (
                            <View key={key}>
                                <Text className="text-base font-nunitoSemiBold text-black dark:text-white mb-1">
                                    {formatLabel(key)}
                                </Text>
                                <Text className="text-base font-nunito text-black dark:text-white">
                                    {String(value ?? "N/A")}
                                </Text>
                                {idx < arr.length - 1 && (
                                    <View className="h-px bg-neutral-200 dark:bg-neutral-800 my-3" />
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </SectionCard>

            {/* Diet */}
            <SectionCard title="Diet" subtitle="What to include and avoid">
                <View className="">
                    {(["recommended", "notRecommended"] as const).map((key) => (
                        <View key={key}>
                            {/* Mini heading chip */}
                            <View className="self-start px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 mb-1 mt-5">
                                <Text className="text-sm font-nunitoSemiBold text-black dark:text-white">
                                    {formatLabel(key)}
                                </Text>
                            </View>
                            <BulletList items={diet[key]} />
                        </View>
                    ))}
                </View>
            </SectionCard>

            {/* Health */}
            <SectionCard title="Health" subtitle="Risks, symptoms, and prevention">
                <View className="">
                    {(["commonIssues", "symptomsToWatch", "preventiveTips"] as const).map((k) => (
                        <View key={k}>
                            <View className="self-start px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 mb-1 mt-5">
                                <Text className="text-sm font-nunitoSemiBold text-black dark:text-white">
                                    {formatLabel(k)}
                                </Text>
                            </View>
                            <BulletList items={(health as any)[k]} />
                        </View>
                    ))}
                </View>
            </SectionCard>

            {/* Owner Tips */}
            <SectionCard title="Owner Tips" subtitle="Practical guidance for daily life">
                <BulletList items={owner_tips} />
            </SectionCard>

        </View>
    );
}
