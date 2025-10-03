import { Tabs, useRouter } from "expo-router"
import { Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { StatusBar } from "expo-status-bar"

export default function TeacherTabsLayout() {
    const router = useRouter()
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: true,
                    headerRight: () => (
                        <Pressable onPress={() => router.push("/profile/profile")} style={{ marginRight: 15 }}>
                            <Ionicons name="person-circle-outline" size={28} color="black" />
                        </Pressable>
                    ),
                    headerStyle: { backgroundColor: "#F4ECE7" },
                    headerTintColor: "#000000",
                    tabBarInactiveBackgroundColor: "#F4ECE7",
                    tabBarActiveBackgroundColor: "#F4ECE7",
                    tabBarActiveTintColor: "#E97351",
                    animation: "shift",
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { borderTopWidth: 0, elevation: 0, shadowOpacity: 0, backgroundColor: "#F4ECE7" }
                }}
            >
                <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} /> }} />
                <Tabs.Screen name="class" options={{ title: "Class", tabBarIcon: ({ color, size }) => <MaterialIcons name="class" size={size} color={color} /> }} />
                <Tabs.Screen name="chatbot" options={{ title: "Ask Ascent", tabBarIcon: ({ color, size }) => <MaterialIcons name="chat" size={size} color={color} /> }} />
                <Tabs.Screen name="attendance" options={{ title: "AttendanceScreen", tabBarIcon: ({ color, size }) => <MaterialIcons name="event" size={size} color={color} /> }} />
            </Tabs>
            <StatusBar style="dark" />
        </>
    )
}
