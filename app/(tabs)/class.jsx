import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const classes = [
    { id: "1", name: "Class 10", students: 10 },
    { id: "2", name: "Class 9", students: 20 },
    { id: "3", name: "Class 8", students: 20 },
];

export default function ClassesScreen() {
    const renderClassCard = ({ item }) => (
        <View style={styles.classCard}>
            {/* Background Image */}
            <Image
                source={{ uri: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg" }}
                style={styles.classImage}
            />

            {/* Gradient Overlay */}
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.gradientOverlay}
            />

            {/* Class Info */}
            <View style={styles.classInfo}>
                <Text style={styles.classTitle}>{item.name}</Text>
                <Text style={styles.classSubtitle}>{item.students} students</Text>
            </View>

            {/* Performance Button */}
            <TouchableOpacity style={styles.performanceButton}>
                <Text style={styles.performanceText}>class performance</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Create Class Button */}
            <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Class</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.sectionTitle}>Your Classes</Text>

            {/* Class List */}
            <FlatList
                data={classes}
                keyExtractor={(item) => item.id}
                renderItem={renderClassCard}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5efed",
        padding: 16,
    },
    createButton: {
        backgroundColor: "#333",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 20,
    },
    createButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#666",
        marginBottom: 16,
    },
    classCard: {
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
    },
    classImage: {
        width: "100%",
        height: 220,
    },
    gradientOverlay: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    classInfo: {
        position: "absolute",
        bottom: 12,
        left: 12,
    },
    classTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    classSubtitle: {
        fontSize: 14,
        color: "#ddd",
    },
    performanceButton: {
        position: "absolute",
        bottom: 12,
        right: 12,
        backgroundColor: "#333",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    performanceText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
    },
});
