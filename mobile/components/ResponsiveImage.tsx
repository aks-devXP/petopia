// app/components/ResponsiveImage.tsx
import { useEffect, useState } from "react";
import { View, Image, useColorScheme, useWindowDimensions } from "react-native";

type Props = {
    uri: string;
    /** Total padding on both sides (e.g., mx-4 = 16+16 = 32). Default 0. */
    horizontalPadding?: number;
    /** Corner radius for the image. Default 16. */
    borderRadius?: number;
    /** resizeMode: contain (default) | cover | center */
    mode?: "contain" | "cover" | "center";
    /** Optional fixed ratio if you already know it (height/width). */
    ratioOverride?: number;
    /** Optional placeholder height while measuring. Default 224 (h-56). */
    placeholderHeight?: number;
};

export default function ResponsiveImage({
                                            uri,
                                            horizontalPadding = 0,
                                            borderRadius = 16,
                                            mode = "contain",
                                            ratioOverride,
                                            placeholderHeight = 224,
                                        }: Props) {
    const [ratio, setRatio] = useState<number | null>(ratioOverride ?? null);
    const scheme = useColorScheme();
    const isDark = scheme === "dark";
    const { width: screenWidth } = useWindowDimensions();

    const contentWidth = Math.max(0, screenWidth - horizontalPadding);

    useEffect(() => {
        if (ratioOverride != null) {
            setRatio(ratioOverride);
            return;
        }
        if (!uri) {
            setRatio(null);
            return;
        }

        let cancelled = false;
        Image.getSize(
            uri,
            (w, h) => {
                if (!cancelled) setRatio(w > 0 ? h / w : 1);
            },
            () => {
                if (!cancelled) setRatio(1); // safe fallback
            }
        );
        return () => {
            cancelled = true;
        };
    }, [uri, ratioOverride]);

    if (!ratio) {
        // lightweight placeholder while measuring
        return (
            <View
                style={{
                    width: contentWidth,
                    height: placeholderHeight,
                    borderRadius,
                    backgroundColor: isDark ? "#1C1C1E" : "#F1F5F9",
                }}
            />
        );
    }

    return (
        <Image
            source={{ uri }}
            style={{
                width: contentWidth,
                aspectRatio: ratio,
                borderRadius,
            }}
            resizeMode={mode}
        />
    );
}
