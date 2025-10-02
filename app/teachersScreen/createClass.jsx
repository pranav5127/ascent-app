import React, { useState, useContext } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"
import { AuthContext } from "@/context/AuthContext"
import { createClassWithSubjects } from "@/services/classService"

function CreateClass() {
    const { userProfile } = useContext(AuthContext)
    const [classCode, setClassCode] = useState("")
    const [className, setClassName] = useState("")
    const [subjects, setSubjects] = useState([""])
    const [loading, setLoading] = useState(false)

    const addSubject = () => setSubjects([...subjects, ""])
    const updateSubject = (text, index) => {
        const updated = [...subjects]
        updated[index] = text
        setSubjects(updated)
    }
    const removeSubject = (index) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((_, i) => i !== index))
        }
    }

    const copyToClipboard = async () => {
        if (!classCode) {
            Alert.alert("Error", "Nothing to copy")
            return
        }
        await Clipboard.setStringAsync(classCode)
        Alert.alert("Copied!", "Class code copied to clipboard")
    }


    const handleSubmit = async () => {
        if (!className.trim()) return Alert.alert("Error", "Please enter class name")
        if (!userProfile?.id) return Alert.alert("Error", "Teacher not found")

        setLoading(true)
        try {
            const classId = await createClassWithSubjects(className, userProfile.id, subjects)
            setClassCode(classId)
            await Clipboard.setStringAsync(classId)
            Alert.alert("Success", "Class created! Code copied to clipboard")
        } catch (err) {
            Alert.alert("Error", err.message || "Failed to create class")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Class Code</Text>
            <View style={styles.codeContainer}>
                <TextInput style={styles.codeInput} value={classCode} editable={false} />
                <TouchableOpacity onPress={copyToClipboard}>
                    <Ionicons name="copy-outline" size={22} color="#555" />
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={["#a43313", "#e97351"]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 0.9 }}
                style={styles.card}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Class name"
                    placeholderTextColor="#888"
                    value={className}
                    onChangeText={setClassName}
                />

                {subjects.map((subject, index) => (
                    <View key={index} style={styles.subjectRow}>
                        <TextInput
                            style={[styles.input, { flex: 1, marginBottom: 0 }]}
                            placeholder="Subject name"
                            placeholderTextColor="#888"
                            value={subject}
                            onChangeText={(text) => updateSubject(text, index)}
                        />
                        <TouchableOpacity onPress={() => removeSubject(index)} style={styles.removeBtn}>
                            <Ionicons name="close-circle" size={22} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity onPress={addSubject}>
                    <Text style={styles.addText}>+ Add Subject</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Creating..." : "Submit"}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default CreateClass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3ebe6",
        alignItems: "center",
        paddingTop: 40
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "8%",
        fontSize: 14,
        marginBottom: 5
    },
    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 25
    },
    codeInput: {
        flex: 1,
        fontSize: 16
    },
    card: {
        borderRadius: 20,
        width: "85%",
        padding: 20,
        alignItems: "center"
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15
    },
    subjectRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    removeBtn: {
        marginLeft: 10
    },
    addText: {
        color: "#000",
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "flex-start"
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25
    },
    buttonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16
    }
})
