import React, { useState, useEffect } from "react"
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams } from "expo-router"
import { Picker } from "@react-native-picker/picker"
import { getSubjectsService } from "@/services/getSubjectService"
import { shareContentService } from "@/services/shareContentService"

export default function ShareContentScreen() {
    const { classId } = useLocalSearchParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [fileUrl, setFileUrl] = useState("")
    const [subjectId, setSubjectId] = useState("")
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSubjects, setLoadingSubjects] = useState(true)

    useEffect(() => {
        const fetchSubjects = async () => {
            console.log("🔍 Fetching subjects for classId:", classId)
            try {
                const data = await getSubjectsService(classId)
                console.log("✅ Subjects fetched successfully:", data)
                setSubjects(data)
            } catch (err) {
                console.error("❌ Failed to load subjects:", err)
                Alert.alert("Error", "Failed to fetch subjects for this class")
            } finally {
                setLoadingSubjects(false)
            }
        }

        if (classId) {
            fetchSubjects()
        } else {
            console.warn("⚠️ No classId found in route params")
        }
    }, [classId])

    const handleSubmit = async () => {
        console.log("🚀 Sharing content with payload:")
        console.log({
            class_id: classId,
            title,
            description,
            file_url: fileUrl,
            type: "resource",
            subject_id: subjectId,
        })

        if (!title.trim()) return Alert.alert("Error", "Please enter content title")
        if (!fileUrl.trim()) return Alert.alert("Error", "Please enter file URL")
        if (!subjectId) return Alert.alert("Error", "Please select a subject")
        if (!classId) return Alert.alert("Error", "Class ID not found")

        setLoading(true)
        try {
            const payload = {
                class_id: classId,
                title,
                description,
                file_url: fileUrl,
                type: "resource",
                subject_id: subjectId,
                due_date: new Date().toISOString().split("T")[0],
                created_at: new Date().toISOString(),
            }

            const response = await shareContentService(payload)
            console.log("✅ Content shared successfully:", response)
            Alert.alert("Success", "Content shared successfully!")

            setTitle("")
            setDescription("")
            setFileUrl("")
            setSubjectId("")
        } catch (err) {
            console.error("❌ Failed to share content:", err)
            Alert.alert("Error", err.message || "Failed to share content")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#a43313", "#e97351"]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Enter Content Title"
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Enter Description"
                    placeholderTextColor="#888"
                    value={description}
                    multiline
                    onChangeText={setDescription}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter File URL"
                    placeholderTextColor="#888"
                    value={fileUrl}
                    onChangeText={setFileUrl}
                />

                <View style={styles.pickerContainer}>
                    {loadingSubjects ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Picker
                            selectedValue={subjectId}
                            onValueChange={(value) => {
                                console.log("📘 Selected subject:", value)
                                setSubjectId(value)
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Subject" value="" />
                            {subjects.map((subject) => (
                                <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
                            ))}
                        </Picker>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Sharing..." : "Share Content"}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3ebe6",
        alignItems: "center",
        paddingTop: 100,
    },
    card: {
        borderRadius: 20,
        width: "85%",
        padding: 20,
        alignItems: "center",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    pickerContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15,
    },
    picker: {
        width: "100%",
        height: 50,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16,
    },
})
