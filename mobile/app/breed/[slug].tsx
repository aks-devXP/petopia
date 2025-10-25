// app/breed/[slug].tsx
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import BasicInfo from "./components/BasicInfo";
import RatingSection from "./components/RatingSection";
import AnatomySection from "./components/AnatomySection";
import CareTips from "./components/CareTips";

type BreedData = {
    breed: string;
    species: string;
    slug?: string;
    images: { primary: string; secondary?: string };
    general_info: {
        breedGroup?: string;
        description?: string;
        temperament?: string;
        height?: string;
        weight?: string;
        lifeExpectancy?: string;
    };
    ratings: {
        energyLevel?: number;
        vocalizationLevel?: number; // NOTE: matches your model
        drooling?: number;
        shedding?: number;
        groomingNeeds?: number;
        trainability?: number;
        compatibilityWithKids?: number;
        compatibilityWithOtherPets?: number;
        apartmentSuitability?: number;
        canStayAlone?: number;
        familyFriendly?: number;
        warmWeatherSuitability?: number;
        coldWeatherSuitability?: number;
        // If some breeds don’t have all fields, that’s fine—component maps keys dynamically.
    };
    physical_characteristics: {
        ears?: string; head?: string; fur?: string; body?: string; tail?: string;
    };
    history: string[];
    care: { exercise?: string; grooming?: string; training?: string };
    diet: { recommended?: string[]; notRecommended?: string[] };
    health?: {
        commonIssues?: string[];
        symptomsToWatch?: string[];
        preventiveTips?: string[];
    };
    owner_tips?: string[];
};

export default function BreedInfoPage() {
    const { slug } = useLocalSearchParams<{ slug: string }>();
    const [data, setData] = useState<BreedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setErr("");

                // TODO: replace with real fetch(`/api/breeds/${slug}`)
                await new Promise((res) => setTimeout(res, 400));
                if (cancelled) return;

                // 🔹 Dummy data mirrors the backend model exactly
                const dummy: BreedData = {
                    breed: "German Shepherd",
                    species: "Dog",
                    images: {
                        primary:
                            "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=1200&q=80",
                        secondary:
                            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&q=80",
                    },
                    general_info: {
                        breedGroup: "Working",
                        description:
                            "German Shepherds are intelligent, loyal, and protective dogs, originally bred in Germany as herding and working dogs.",
                        temperament: "Smart, loyal, and protective",
                        height: "22 to 26 inches",
                        weight: "50 to 90 pounds",
                        lifeExpectancy: "7 to 10 years",
                    },
                    ratings: {
                        energyLevel: 5,
                        vocalizationLevel: 4,   // ✔️ use vocalizationLevel (NOT "noise")
                        drooling: 1,
                        shedding: 5,
                        groomingNeeds: 5,
                        trainability: 5,
                        compatibilityWithKids: 4,
                        compatibilityWithOtherPets: 2,
                        apartmentSuitability: 2,
                        canStayAlone: 1,
                        familyFriendly: 3,
                        warmWeatherSuitability: 3,
                        coldWeatherSuitability: 4,
                    },
                    physical_characteristics: {
                        ears: "Ears pert ending in point, slant forward to frame face.",
                        head: "Well-proportioned wedge-shaped head, strong muzzle.",
                        fur: "Thick undercoat, coarse top coat, distinctive colorings of deep black and tan, silver, and white.",
                        body:
                            "Muscular, strong body, lanky with sense of balance and even proportion, firm ribs and chest, not stocky.",
                        tail: "Thick, long hair on tail, slightly longer on underside.",
                    },
                    history: [
                        "German Shepherds were originally bred in Germany in the late 19th century.",
                        "They were developed for their intelligence and working ability, particularly in herding and protection.",
                    ],
                    care: {
                        exercise:
                            "German Shepherds need regular exercise to maintain physical and mental health.",
                        grooming:
                            "Expect significant shedding; they require regular brushing.",
                        training:
                            "Early training is key as they grow into large, strong dogs.",
                    },
                    diet: {
                        recommended: [
                            "High-quality protein sources (chicken, beef, fish)",
                            "Vegetables and fruits (carrots, apples, blueberries)",
                            "Whole grains (brown rice, oatmeal)",
                        ],
                        notRecommended: [
                            "Chocolate",
                            "Grapes and raisins",
                            "Onions and garlic",
                            "Excessively fatty or processed foods",
                        ],
                    },
                    health: {
                        commonIssues: [
                            "Hip Dysplasia",
                            "Elbow Dysplasia",
                            "Degenerative Myelopathy",
                            "Bloat (Gastric Dilatation-Volvulus)",
                        ],
                        symptomsToWatch: [
                            "Swollen or distended abdomen",
                            "Abdominal pain",
                            "Unproductive retching/dry heaving",
                            "Drooling",
                            "Pacing/restlessness",
                            "Lethargy",
                        ],
                        preventiveTips: [
                            "Feed smaller, more frequent meals instead of one big meal.",
                            "Don't allow your dog to gorge on food or water, use a slow feeder if necessary.",
                            "No exercise for a minimum of one hour before or two hours after meals.",
                            "Talk to your veterinarian about a gastropexy, a preventative procedure for high-risk dogs.",
                        ],
                    },
                    owner_tips: [
                        "German Shepherds need daily exercise to prevent destructive behavior.",
                        "They thrive when given a 'job' or task due to their working background.",
                        "Naturally protective, they may bark frequently and be reserved with guests.",
                    ],
                };

                setData(dummy);
            } catch {
                if (!cancelled) setErr("Failed to load breed details.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <ActivityIndicator size="large" />
                <Text className="mt-2 text-neutral-700 dark:text-neutral-300">Loading…</Text>
            </View>
        );
    }

    if (err || !data) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black p-6">
                <Text className="text-red-600 text-center mb-3">
                    {err || "No data found"}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-white dark:bg-black pt-12"
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
        >
            <BasicInfo data={data} />
            <View className="mt-4 mx-3 p-4 bg-light-gray dark:bg-dark-gray rounded-2xl">
                <RatingSection data={data} />
                <AnatomySection data={data} />
                <CareTips data={data} />
            </View>
        </ScrollView>
    );
}
