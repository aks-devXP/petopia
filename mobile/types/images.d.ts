// types/images.d.ts
import { ImageSourcePropType } from "react-native";

declare module "*.png" {
    const value: ImageSourcePropType;
    export default value;
}
declare module "*.jpg" {
    const value: ImageSourcePropType;
    export default value;
}
declare module "*.jpeg" {
    const value: ImageSourcePropType;
    export default value;
}
declare module "*.webp" {
    const value: ImageSourcePropType;
    export default value;
}
