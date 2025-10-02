import React, { useEffect, useState, useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { AuthContext } from "@/context/AuthContext"
import { getClassService } from "@/services/getClassService"
import {useRouter} from "expo-router";

export default function ClassesScreen() {
    const { userProfile } = useContext(AuthContext)
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                if (userProfile?.id) {
                    const teacherClasses = await getClassService.getClassesByTeacher(userProfile.id)
                    setClasses(teacherClasses)
                }
            } catch (err) {
                console.error("Failed to load classes:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchClasses()
    }, [userProfile])

    const renderClassCard = ({ item }) => (
        <TouchableOpacity
            style={styles.classCard}
            onPress={() =>
                router.push({
                    pathname: "/teachersScreen/examScreen",
                    params: { classId: item.id },
                })
            }
        >
            <Image
                source={{ uri: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg" }}
                style={styles.classImage}
            />
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.gradientOverlay}
            />
            <View style={styles.classInfo}>
                <Text style={styles.classTitle}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.performanceButton}>
                <Text style={styles.performanceText}>class performance</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#333" />
                <Text style={styles.loadingText}>Loading your classes...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createButton} onPress={() => router.push("/teachersScreen/createClass")}>
                <Text style={styles.createButtonText}>Create Class</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Your Classes</Text>
            <FlatList
                data={classes}
                keyExtractor={(item) => item.id}
                renderItem={renderClassCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No classes found</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5efed",
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5efed",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
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
})
