import { Tabs, usePathname } from "expo-router";
import FloatingTabBar from "../../components/FloatingTabBar";

export default function TabsLayout() {
    const pathname = usePathname();

    // All settings sub-routes (except index)
    const shouldHideTabBar =
        pathname.startsWith("/settings/") && pathname !== "/settings";

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}

            tabBar={(props) => (shouldHideTabBar ? null : <FloatingTabBar {...props} />)}
        >
            <Tabs.Screen name="more/index" />
            <Tabs.Screen name="vet/index" />
            <Tabs.Screen name="home/index" />
            <Tabs.Screen name="(breed)/index" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}
