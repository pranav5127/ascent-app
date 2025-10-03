import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"
import { saveAttendance } from "@/services/attendanceService"
import { fetchClassStudents } from "@/services/getStudents"

export default function AttendanceScreen() {
    const { classId } = useLocalSearchParams()
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const loadStudents = async () => {
            if (!classId) return
            setLoading(true)
            try {
                const students = await fetchClassStudents(classId)
                const studentsWithStatus = students.map(s => ({ ...s, present: null }))
                setAttendance(studentsWithStatus)
            } catch (err) {
                Alert.alert("Error", "Failed to load students")
            } finally {
                setLoading(false)
            }
        }
        loadStudents()
    }, [classId])

    const markAttendance = (id, status) => {
        setAttendance(prev =>
            prev.map(item => (item.id === id ? { ...item, present: status } : item))
        )
    }

    const submitAttendance = async () => {
        const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD
        try {
            for (const s of attendance) {
                const payload = {
                    student_id: s.id,
                    class_id: classId,
                    date: today,
                    status: s.present === true ? "present" : s.present === false ? "absent" : "not-marked",
                }
                await saveAttendance(payload)
            }
            Alert.alert("Success", "Attendance saved successfully")
            router.back()
        } catch {
            Alert.alert("Error", "Failed to save attendance")
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.studentRow}>
            <Text style={styles.studentName}>{item.name}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => markAttendance(item.id, true)}>
                    <Ionicons
                        name="checkmark"
                        size={22}
                        color={item.present === true ? "green" : "#555"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => markAttendance(item.id, false)}>
                    <Ionicons
                        name="close"
                        size={22}
                        color={item.present === false ? "red" : "#555"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#333" />
                <Text>Loading students...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Weekly Attendance Button */}
            <TouchableOpacity
                style={styles.weeklyButton}
                onPress={() =>
                    router.push({
                        pathname: "/teachersScreen/weeklyAttendanceScreen",
                        params: { classId },
                    })
                }
            >
                <Text style={styles.weeklyButtonText}>View Weekly Attendance</Text>
            </TouchableOpacity>

            <Text style={styles.date}>Date: {new Date().toLocaleDateString()}</Text>
            <FlatList
                data={attendance}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitAttendance}>
                <Text style={styles.submitText}>Submit Attendance</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3ebe6", padding: 20, marginTop: 30, marginBottom: 40 },
    date: { fontSize: 16, marginBottom: 20 },
    studentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
    },
    studentName: { fontSize: 16 },
    actions: { flexDirection: "row", gap: 15 },
    submitButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#333",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    submitText: { color: "#fff", fontSize: 18, fontWeight: "600" },
    weeklyButton: {
        backgroundColor: "#555",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    weeklyButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
})
