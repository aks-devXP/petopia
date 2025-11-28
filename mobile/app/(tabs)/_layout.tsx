import { Tabs, usePathname } from "expo-router";
import FloatingTabBar from "../../components/FloatingTabBar";

export default function TabsLayout() {
    const pathname = usePathname();
    const normalizedPath = pathname.replace("/(tabs)", "");

    // All settings sub-routes (except index)
    const shouldHideTabBar =
        normalizedPath.startsWith("/settings/") && normalizedPath !== "/settings";

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
            initialRouteName="(breed)/index"
            tabBar={(props) => (shouldHideTabBar ? null : <FloatingTabBar {...props} />)}
        >
            <Tabs.Screen name="ngo/index" />
            <Tabs.Screen name="providers/index" />
            <Tabs.Screen name="(breed)/index" />
            <Tabs.Screen name="vet/index" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}
