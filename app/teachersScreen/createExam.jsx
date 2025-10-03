import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams } from "expo-router"
import DateTimePicker from "@react-native-community/datetimepicker"
import { createExamService } from "@/services/examService"

function CreateExam() {
    const { classId } = useLocalSearchParams()
    const [examName, setExamName] = useState("")
    const [examDate, setExamDate] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [showPicker, setShowPicker] = useState(false)

    const handleSubmit = async () => {
        if (!examName.trim()) return Alert.alert("Error", "Please enter exam name")
        if (!examDate) return Alert.alert("Error", "Please select exam date")
        if (!classId) return Alert.alert("Error", "Class ID not found")

        setLoading(true)
        try {
            const formattedDate = examDate.toISOString().split("T")[0]
            console.log("Submitting exam:", { classId, examName, formattedDate })
            const createdExam = await createExamService({
                class_id: classId,
                name: examName,
                date: formattedDate
            })
            Alert.alert("Success", `Exam created! ID: ${createdExam.id || createdExam._id}`)
            console.log("Created exam response:", createdExam)
            setExamName("")
            setExamDate(new Date())
        } catch (err) {
            console.error("Failed to create exam:", err)
            Alert.alert("Error", err.message || "Failed to create exam")
        } finally {
            setLoading(false)
        }
    }

    const showDatePicker = () => setShowPicker(true)

    const onChangeDate = (event, selectedDate) => {
        setShowPicker(Platform.OS === "ios")
        if (selectedDate) setExamDate(selectedDate)
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#a43313", "#e97351"]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 0.9 }}
                style={styles.card}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Exam Name"
                    placeholderTextColor="#888"
                    value={examName}
                    onChangeText={setExamName}
                />
                <TouchableOpacity style={[styles.input, { justifyContent: "center" }]} onPress={showDatePicker}>
                    <Text style={{ color: examDate ? "#000" : "#888" }}>
                        {examDate ? examDate.toISOString().split("T")[0] : "Select Exam Date"}
                    </Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={examDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? "Creating..." : "Submit"}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default CreateExam

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3ebe6",
        alignItems: "center",
        paddingTop: 100
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
