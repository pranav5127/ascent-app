import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";

export default function ClassOptionsScreen() {
    const router = useRouter()
    const {classId, className} = useLocalSearchParams()


    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.headerText}>{className || "Class"}</Text>
            <Text style={styles.subHeader}>Choose what you&#39;d like to manage</Text>

            {/* Option Cards */}
            <TouchableOpacity
                style={styles.optionCard}
                activeOpacity={0.9}
                onPress={() => router.push({pathname: "/teachersScreen/examScreen", params: {classId}})}

            >
                <Image
                    source={{uri: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg"}}
                    style={styles.cardImage}
                />
                <View style={styles.cardOverlay}>
                    <Text style={styles.cardTitle}>Exams</Text>
                    <Text style={styles.cardSubtitle}>Create or view exams for this class</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionCard}
                activeOpacity={0.9}
                onPress={() => router.push({pathname: "/teachersScreen/shareContent", params: {classId}})}
            >
                <Image
                    source={{uri: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg"}}
                    style={styles.cardImage}
                />
                <View style={styles.cardOverlay}>
                    <Text style={styles.cardTitle}>Share Content</Text>
                    <Text style={styles.cardSubtitle}>Share notes, books, and assignments</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20,
        paddingTop: 46,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 16,
        color: "#777",
        marginBottom: 24,
    },
    optionCard: {
        height: 180,
        borderRadius: 12,
        marginBottom: 20,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    cardImage: {
        height: 120,
        width: "100%",
    },
    cardOverlay: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333333",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#777777",
        marginTop: 4,
    },
});
