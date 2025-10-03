import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useRouter} from "expo-router";
import {AuthContext} from "@/context/AuthContext";

const ActionButton = ({ title, onPress}) => (
    <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.8}
        onPress={onPress}
    >
        <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
);

const HomeScreen = () => {
    const {userProfile} = useContext(AuthContext)
    const router = useRouter()

    return (
        <View style={styles.container}>

            <Text style={styles.greeting}>
                Hi {userProfile?.name}
            </Text>

            <View style={styles.aiCard}>
                <Text style={styles.aiCardText}>
                    AI Handles the Data, So You Can <Text style={styles.aiCardTextAccent}>Lead the Classroom.</Text>
                </Text>

                <TouchableOpacity style={styles.exploreButton} activeOpacity={0.7} onPress={() => router.push("/teacherTabs/chatbot")}>
                    <Text style={styles.exploreButtonText}>
                        Explore →
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Gradient Action Area */}
            <LinearGradient
                colors={['#a43313', '#e97351']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.actionArea}
            >
                <ActionButton title="Create Class" onPress={() => router.push("/teachersScreen/createClass")} />
                <ActionButton title="Ask Ascent" onPress={() => router.push("/teacherTabs/chatbot")}/>
                <ActionButton title="Share Contents" onPress={() => router.push("/teacherTabs/class")}/>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 20,
        paddingTop: 16,
    },

    greeting: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 24,
    },

    aiCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 50,
    },
    aiCardText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#4B5563',
        lineHeight: 28,
        marginBottom: 20,
    },
    aiCardTextAccent: {
        fontWeight: '700',
        color: '#4F46E5',
    },
    exploreButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#1F2937',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    exploreButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },

    actionArea: {
        flex: 1,
        height: 350,
        width: "95%",
        borderRadius: 24,
        padding: 24,
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 15,
        alignSelf: "center",
        marginBottom: 10
    },

    actionButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    actionButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        textAlign: 'center',
    },
});

export default HomeScreen;
