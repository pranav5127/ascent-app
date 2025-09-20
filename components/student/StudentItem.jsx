import { View, Text, TouchableOpacity, Animated, ScrollView, Alert, StyleSheet } from "react-native"
import { useState, useRef, useEffect } from "react"
import { Link } from "expo-router"
import ReportSection from "./ReportSection"
import { generateReport } from "@/services/report"
import { sendNotification } from "@/services/notification"
import { getReportByStudentId } from "@/services/api"

const StudentItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false)
    const [loadingReport, setLoadingReport] = useState(false)
    const [report, setReport] = useState(null)

    const animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start()
    }, [expanded])

    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    const handleGenerateReport = async () => {
        setLoadingReport(true)
        try {
            console.log("Generating report for student:", item.id)
            const generated = await generateReport(item.id)
            console.log("Generated report:", generated)

            setReport(generated.report_data)
            console.log("Report set in state:", generated.report_data)

            setExpanded(true)
            Alert.alert("Success", "Report generated successfully")
        } catch (e) {
            console.error("Error generating report:", e)
            Alert.alert("Error", e.message || "Failed to generate report")
        } finally {
            setLoadingReport(false)
        }
    }

    const handleSendNotification = async () => {
        try {
            console.log("Fetching latest report for student:", item.id)
            const latestReport = await getReportByStudentId(item.id)
            console.log("Report fetched for notification:", latestReport)

            if (!latestReport) {
                return Alert.alert("Error", "No report found for this student. Generate it first.")
            }

            if (!latestReport.parent_mobile) {
                return Alert.alert("Error", "Parent mobile number missing. Cannot send notification.")
            }

            await sendNotification(latestReport)
            console.log("Notification sent successfully")
            Alert.alert("Success", "Notification sent")
        } catch (e) {
            console.error("Error sending notification:", e)
            Alert.alert("Error", e.message || "Failed to send notification")
        }
    }



    const animatedHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500],
    })

    const handleShowReport = async () => {
        setLoadingReport(true)
        try {
            const latestReport = await getReportByStudentId(item.id)
            console.log("Report fetched to show:", latestReport)

            if (!latestReport) {
                return Alert.alert("Error", "No report found for this student. Generate it first.")
            }

            const rd = latestReport.report_data || {}
            console.log("Normalized report data before formatting:", rd)

            const normalized = {
                detailed_report: typeof rd.detailed_report === "string"
                    ? rd.detailed_report
                    : JSON.stringify(rd.detailed_report || "", null, 2),
                summary: typeof rd.summary === "string"
                    ? rd.summary
                    : JSON.stringify(rd.summary || "", null, 2)
            }

            console.log("Report normalized for UI:", normalized)
            setReport(normalized)
            setExpanded(true)
        } catch (e) {
            console.error("Error loading report:", e)
            Alert.alert("Error", e.message || "Failed to load report")
        } finally {
            setLoadingReport(false)
        }
    }

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.headerText}>{item.name}</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.content, { maxHeight: animatedHeight }]}>
                {expanded && (
                    <ScrollView style={{ padding: 10 }} nestedScrollEnabled keyboardShouldPersistTaps="handled">
                        <Text style={styles.detail}>Class: {item.class_name}</Text>
                        <Link href={`/addStudentDetails?student_id=${item.id}`} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Add Student Details</Text>
                            </TouchableOpacity>
                        </Link>

                        <TouchableOpacity onPress={handleGenerateReport} style={styles.button}>
                            <Text style={styles.buttonText}>{loadingReport ? "Generating..." : "Generate Report"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleShowReport} style={styles.button}>
                            <Text style={styles.buttonText}>{loadingReport ? "Loading..." : "Show Report"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSendNotification} style={styles.button}>
                            <Text style={styles.buttonText}>Send Notification</Text>
                        </TouchableOpacity>

                        {report && <ReportSection report={report} />}
                    </ScrollView>
                )}
            </Animated.View>
        </View>
    )
}

export default StudentItem

const styles = StyleSheet.create({
    itemContainer: { marginBottom: 10, backgroundColor: "#222", borderRadius: 10, overflow: "hidden" },
    header: { padding: 10, backgroundColor: "#444" },
    headerText: { color: "#fff", fontSize: 16 },
    content: { overflow: "hidden", backgroundColor: "#555", paddingHorizontal: 0 },
    detail: { color: "#ccc", fontSize: 14, marginVertical: 2 },
    button: { backgroundColor: "#4cafef", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 13 },
    reportContainer: { marginTop: 10, padding: 10, backgroundColor: "#333", borderRadius: 8 },
    reportTitle: { color: "#fff", fontWeight: "700", marginTop: 10 },
    reportText: { color: "#ddd", marginTop: 5, paddingVertical: 8 }
})
