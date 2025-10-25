// app/fonts.ts
import {
    useFonts as useNunito,
    NunitoSans_200ExtraLight,
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
    NunitoSans_900Black,
} from "@expo-google-fonts/nunito-sans";

import {
    useFonts as useQuicksand,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export function useAppFonts() {
    const [nunitoLoaded] = useNunito({
        NunitoSans_200ExtraLight,
        NunitoSans_300Light,
        NunitoSans_400Regular,
        NunitoSans_600SemiBold,
        NunitoSans_700Bold,
        NunitoSans_800ExtraBold,
        NunitoSans_900Black,
    });

    const [quicksandLoaded] = useQuicksand({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
    });

    return nunitoLoaded && quicksandLoaded;
}
