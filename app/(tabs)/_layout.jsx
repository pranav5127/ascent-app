import {Tabs} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function TabsLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: true,
                    tabBarInactiveBackgroundColor:"#F4ECE7",
                    tabBarActiveBackgroundColor:"#F4ECE7",
                    tabBarActiveTintColor:"#E97351",
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
                    name="class"
                    options={{
                        title: "Class",
                        tabBarLabel: "Class",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="class" size={size} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chatbot"
                    options={{
                        title: "Chatbot",
                        tabBarLabel: "Chatbot",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="chat" size={size} color={color}/>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="attendance"
                    options={{
                        title: "Attendance",
                        tabBarLabel: "Attendance",
                        tabBarIcon: ({color, size}) => (
                            <MaterialIcons name="event" size={size} color={color}/>
                        ),
                    }}
                />
            </Tabs>
            <StatusBar style="auto"/>
        </>
    );
}
