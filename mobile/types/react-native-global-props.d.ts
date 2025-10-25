declare module "react-native-global-props" {
    import { TextStyle, TextInputProps, TextProps } from "react-native";

    interface CustomTextProps extends TextProps {
        style?: TextStyle;
    }

    interface CustomTextInputProps extends TextInputProps {
        style?: TextStyle;
    }

    export function setCustomText(customProps: CustomTextProps): void;
    export function setCustomTextInput(customProps: CustomTextInputProps): void;
}
