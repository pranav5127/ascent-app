import {Tabs} from 'expo-router';
import React from 'react';
import {HapticTab} from '@/components/haptic-tab';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}>

            <Tabs.Screen
                name="addParent"
                options={{
                    title: "Parents",
                    tabBarIcon: ({color}) => <Ionicons name="people-sharp" size={24} color={color}/>
                }}
            />
            <Tabs.Screen
                name="parentList" options={{
                title: "Parents",
                tabBarIcon: ({color}) => <Ionicons name="people-sharp" size={24} color={color}/>
            }}
            />

        </Tabs>
    );
}
