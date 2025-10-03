import {Tabs, useRouter} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {Ionicons} from "@expo/vector-icons";
import {Pressable} from "react-native";

export default function StudentTabsLayout() {
    const router = useRouter()

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: true,
                    headerRight: () => (
                        <Pressable onPress={() => router.push("/profile/profile")} style={{marginRight: 15}}>
                            <Ionicons name="person-circle-outline" size={28} color="black"/>
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
                        elevation: 0, // Android shadow
                        shadowOpacity: 0, // iOS shadow
                        backgroundColor: "#F4ECE7",
                    },

                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarLabel: "Home",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="home" size={size} color={color}/>
                        ),
                    }}
                />

                <Tabs.Screen
                    name="chatbot"
                    options={{
                        title: "Ask Ascent",
                        tabBarLabel: "Ask Ascent",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="chat" size={size} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="classes"
                    options={{
                        title: "Classes",
                        tabBarLabel: "Classes",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="library-books" size={size} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="viewreport"
                    options={{
                        title: "Reports",
                        tabBarLabel: "Reports",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="card-membership" size={size} color={color}/>
                        ),
                    }}
                />
            </Tabs>
            <StatusBar style="dark"/>
        </>
    );
}
