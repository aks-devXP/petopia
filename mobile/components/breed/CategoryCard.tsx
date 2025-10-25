import React, { memo } from "react";
import {
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";

type Props = {
    image: ImageSourcePropType;
    label: string;
    selected: boolean;
    onPress: () => void;
    /** accent color from parent; used for border and selected fill */
    borderColor?: string;
    className?: string;
};

function CategoryCardBase({
                              image,
                              label,
                              selected,
                              onPress,
                              borderColor = "#F4B860",
                              className,
                          }: Props) {
    // ✅ Call hooks at top level, not inside JSX
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    // text color rule:
    // - not selected: keep existing (ink / ink-on-dark)
    // - selected: black in dark mode, white in light mode
    const textClass = selected
        ? isDark
            ? "text-black"
            : "text-white"
        : "text-ink dark:text-ink-on-dark";

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            className={[
                // pill container
                "items-center justify-center px-4 py-4 rounded-full min-w-[96px]",
                "bg-transparent",
                className ?? "",
            ].join(" ")}
            style={{
                borderWidth: 1,
                borderColor,                         // always use the passed color
                backgroundColor: selected ? borderColor : "transparent", // full fill on select
            }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: selected }}
        >
            {/* white circular plate behind icon (stays white in dark mode) */}
            <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-2">
                <Image source={image} style={{ width: 44, height: 44 }} resizeMode="contain" />
            </View>

            <Text className={["text-md font-quicksandSemiBold", textClass].join(" ")}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

export default memo(CategoryCardBase);
