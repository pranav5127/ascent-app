import React, { useEffect, useState, useContext } from "react"
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { AuthContext } from "@/context/AuthContext"
import { fetchWeeklyAttendance } from "@/services/getAttendanceService"
import {i18n} from "@/i18n";

export default function StudentWeeklyAttendanceScreen() {
    const { classId, className } = useLocalSearchParams()
    const { userProfile } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [attendanceData, setAttendanceData] = useState([])

    useEffect(() => {
        if (!classId) return
        loadWeeklyAttendance()
    }, [classId])

    const loadWeeklyAttendance = async () => {
        setLoading(true)
        try {
            const today = new Date()
            const last7Days = Array.from({ length: 7 }).map((_, i) => {
                const d = new Date(today)
                d.setDate(today.getDate() - i)
                return d.toISOString().split("T")[0]
            }).reverse()

            const records = []

            for (const date of last7Days) {
                const dayAttendance = await fetchWeeklyAttendance(classId, date, date)
                console.log("Fetched attendance for", date, dayAttendance)

                const studentRecord = dayAttendance?.find(
                    (r) => r.student_id === userProfile.id && r.date === date
                )
                console.log("Student record for", userProfile.id, "on", date, studentRecord)

                let status = "not-marked"
                if (studentRecord && studentRecord.status) {
                    if (studentRecord.status === "absent") status = "absent"
                    else if (studentRecord.status === "present") status = "present"
                }

                records.push({ date, status })
            }

            console.log("Final weekly attendance records", records)
            setAttendanceData(records)
        } catch (err) {
            console.error("Error loading attendance", err)
            Alert.alert(i18n.t("attendance.error"))
        } finally {
            setLoading(false)
        }
    }

    const renderItem = ({ item }) => {
        let displayChar = "-"
        let bgColor = "#ccc"

        if (item.status === "present") {
            displayChar = i18n.t("attendance.present")[0]
            bgColor = "#4caf50"
        } else if (item.status === "absent") {
            displayChar = i18n.t("attendance.absent")[0]
            bgColor = "#f44336"
        }

        return (
            <View style={styles.dayRow}>
                <Text style={styles.dateText}>
                    {new Date(item.date).toLocaleDateString()}
                </Text>
                <View style={[styles.statusBox, { backgroundColor: bgColor }]}>
                    <Text style={styles.statusText}>{displayChar}</Text>
                </View>
            </View>
        )
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#e75a37" style={{ marginTop: 30 }} />
                <Text style={{ marginTop: 10 }}>{i18n.t("attendance.loading")}</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>
                {className} - {i18n.t("attendance.header")}
            </Text>
            <FlatList
                data={attendanceData}
                keyExtractor={(item) => item.date}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 50, color: "gray" }}>
                        {i18n.t("attendance.noRecords")}
                    </Text>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F6E9E2", padding: 20 },
    header: { fontSize: 18, fontWeight: "600", marginBottom: 20 },
    dayRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    dateText: { fontSize: 14, color: "#333" },
    statusBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    statusText: { fontSize: 18, fontWeight: "700", color: "#fff" },
})
