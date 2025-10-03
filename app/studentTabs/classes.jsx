import React, { useContext, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from "react-native"
import { useRouter } from "expo-router"
import { AuthContext } from "@/context/AuthContext"
import {getStudentClassesService} from "@/services/getStudentClassesService";

export default function SubjectsScreen() {
    const router = useRouter()
    const { userProfile } = useContext(AuthContext)
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (userProfile?.id) fetchClasses()
    }, [userProfile])

    const fetchClasses = async () => {
        try {
            setLoading(true)
            const data = await getStudentClassesService(userProfile.id)
            setClasses(data)
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to fetch classes")
        } finally {
            setLoading(false)
        }
    }

    const renderClassCard = ({ item }) => (
        <TouchableOpacity
            style={styles.subjectCard}
            onPress={() => router.push(`/studentScreens/content?class_id=${item.id}`)}
        >
            <Image source={{ uri: item.image }} style={styles.subjectImage} />
            <Text style={styles.subjectName}>{item.name}</Text>
        </TouchableOpacity>
    )



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.joinButton} onPress={() => router.push("/studentScreens/joinclass")}>
                <Text style={styles.joinButtonText}>Join Class</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={classes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderClassCard}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
    },
    joinButton: {
        backgroundColor: "black",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 20,
    },
    joinButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    subjectCard: {
        backgroundColor: "white",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
    },
    subjectImage: {
        width: "100%",
        height: 120,
    },
    subjectName: {
        padding: 12,
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
})
