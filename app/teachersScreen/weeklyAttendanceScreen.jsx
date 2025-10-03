import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, ScrollView } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { fetchClassStudents } from "@/services/getStudents"
import {fetchWeeklyAttendance} from "@/services/getAttendanceService";

export default function WeeklyAttendanceScreen() {
    const { classId } = useLocalSearchParams()
    const [students, setStudents] = useState([])
    const [attendanceMap, setAttendanceMap] = useState({})
    const [loading, setLoading] = useState(true)
    const [dates, setDates] = useState([])

    useEffect(() => {
        const loadAttendance = async () => {
            if (!classId) return
            setLoading(true)
            try {
                const studentsList = await fetchClassStudents(classId)

                const today = new Date()
                const last7Days = Array.from({ length: 7 }).map((_, i) => {
                    const d = new Date(today)
                    d.setDate(today.getDate() - i)
                    return d.toISOString().split("T")[0]
                })
                setDates(last7Days.reverse())

                const attendanceRecords = []
                for (const date of last7Days) {
                    const dayAttendance = await fetchWeeklyAttendance(classId, date, date)
                    attendanceRecords.push(...dayAttendance)
                }

                const map = {}
                studentsList.forEach(s => {
                    map[s.id] = {
                        student: s,
                        records: attendanceRecords.filter(r => r.student_id === s.id)
                    }
                })

                setStudents(studentsList)
                setAttendanceMap(map)
            } catch (err) {
                console.error(err)
                Alert.alert("Error", "Failed to load attendance")
            } finally {
                setLoading(false)
            }
        }

        loadAttendance()
    }, [classId])

    const renderItem = ({ item }) => {
        const records = attendanceMap[item.id]?.records || []

        return (
            <View style={styles.studentRow}>
                <Text style={styles.studentName}>{item.name}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {dates.map(date => {
                        const record = records.find(r => r.date === date)
                        const status = record ? (record.status === "present" ? "P" : "A") : "-"
                        const bgColor = status === "P" ? "#4caf50" : status === "A" ? "#f44336" : "#ccc"
                        return (
                            <View key={date} style={[styles.statusBox, { backgroundColor: bgColor }]}>
                                <Text style={styles.statusText}>{status}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#333" />
                <Text>Loading weekly attendance...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={students}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3ebe6", padding: 20, marginTop: 30 },
    studentRow: {
        marginBottom: 15,
    },
    studentName: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
    statusBox: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        marginRight: 6,
    },
    statusText: { color: "#fff", fontWeight: "600" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
})
