// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            "babel-preset-expo",
            "nativewind/babel", // NativeWind preset
        ],
        plugins: [
            // Expo Router plugin
            require.resolve("expo-router/babel"),

            // Module resolver aliases
            [
                "module-resolver",
                {
                    root: ["./"],
                    alias: {
                        "@assets": "./assets",
                        "@components": "./components",
                        "@app": "./app",
                    },
                },
            ],

            // ⚠️ Keep reanimated LAST
            "react-native-reanimated/plugin",
        ],
    };
};
