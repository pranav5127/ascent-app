import React, { useEffect, useState } from "react"
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { getSubjectsService } from "@/services/getSubjectService"
import { LinearGradient } from "expo-linear-gradient"

export default function SubjectResourcesScreen() {
    const { class_id, class_name } = useLocalSearchParams()
    const [subjects, setSubjects] = useState([])
    const [loadingSubjects, setLoadingSubjects] = useState(true)
    const [resources, setResources] = useState([])
    const [loadingResources, setLoadingResources] = useState(false)
    const [selectedSubjectId, setSelectedSubjectId] = useState(null)

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjectsService(class_id)
                setSubjects(data)
                console.log(`Subjects for class ${class_id}:`, data)
            } catch (err) {
                console.error("Failed to fetch subjects:", err)
                Alert.alert("Error", "Failed to load subjects")
            } finally {
                setLoadingSubjects(false)
            }
        }

        if (class_id) fetchSubjects()
    }, [class_id])

    const fetchResources = async (subjectId) => {
        try {
            setLoadingResources(true)
            setSelectedSubjectId(subjectId)

            const response = await fetch(
                `https://ascent-backend.onrender.com/resources/class/${class_id}/subject/${subjectId}`,
                { headers: { "Content-Type": "application/json" } }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to fetch resources")
            }

            const data = await response.json()
            setResources(data)
            console.log(`Resources for subject ${subjectId}:`, data)
        } catch (err) {
            console.error("Failed to fetch resources:", err)
            Alert.alert("Error", err.message || "Failed to load resources")
        } finally {
            setLoadingResources(false)
        }
    }

    const renderResourceItem = ({ item }) => (
        <LinearGradient
            colors={["#e97351", "#a43313"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.resourceCard}
        >
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <Text style={styles.resourceDesc}>{item.description}</Text>
            <TouchableOpacity
                onPress={() => Linking.openURL(item.file_url)}
                style={styles.openButton}
            >
                <Text style={styles.openButtonText}>Open</Text>
            </TouchableOpacity>
        </LinearGradient>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Class: {class_name || class_id}</Text>

            {loadingSubjects ? (
                <ActivityIndicator size="large" color="#a43313" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={subjects}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.subjectButton,
                                selectedSubjectId === item.id && styles.selectedSubjectButton
                            ]}
                            onPress={() => fetchResources(item.id)}
                        >
                            <Text
                                style={[
                                    styles.subjectButtonText,
                                    selectedSubjectId === item.id && { color: "#fff" }
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
                    showsHorizontalScrollIndicator={false}
                />
            )}

            {loadingResources ? (
                <ActivityIndicator size="large" color="#a43313" style={{ marginTop: 30 }} />
            ) : resources.length > 0 ? (
                <FlatList
                    data={resources}
                    keyExtractor={(item) => item.id}
                    renderItem={renderResourceItem}
                    contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
                />
            ) : (
                <Text style={{ textAlign: "center", marginTop: 30, color: "#888" }}>
                    No resources found
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3ebe6", padding: 16 },
    header: { fontSize: 20, fontWeight: "600", marginBottom: 16, color: "#333" },
    subjectButton: {
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selectedSubjectButton: {
        backgroundColor: "#a43313",
    },
    subjectButtonText: {
        fontWeight: "600",
        color: "#333",
    },
    resourceCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 6,
    },
    resourceDesc: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 10,
    },
    openButton: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    openButtonText: {
        color: "#a43313",
        fontWeight: "600",
    },
})
