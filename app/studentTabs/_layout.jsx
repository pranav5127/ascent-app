import { Tabs, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Ionicons } from "@expo/vector-icons"
import { Pressable } from "react-native"
import {i18n} from "@/i18n"

export default function StudentTabsLayout() {
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
                    headerStyle: {
                        backgroundColor: "#F4ECE7",
                    },
                    headerTintColor: "#000000",
                    tabBarInactiveBackgroundColor: "#F4ECE7",
                    tabBarActiveBackgroundColor: "#F4ECE7",
                    tabBarActiveTintColor: "#E97351",
                    animation: "shift",
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: "#F4ECE7",
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: i18n.t("tabs.home"),
                        tabBarLabel: i18n.t("tabs.home"),
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chatbot"
                    options={{
                        title: i18n.t("tabs.chatbot"),
                        tabBarLabel: i18n.t("home.askAscent"),
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="chat" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="classes"
                    options={{
                        title: i18n.t("tabs.classes"),
                        tabBarLabel: i18n.t("tabs.classes"),
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="library-books" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="viewreport"
                    options={{
                        title: i18n.t("tabs.viewreport") ,
                        tabBarLabel: i18n.t("tabs.viewreport"),
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="card-membership" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
            <StatusBar style="dark" />
        </>
    )
}
