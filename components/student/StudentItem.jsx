import {View, Text, TouchableOpacity, Animated, ScrollView, Alert, StyleSheet} from "react-native";
import {useState, useRef, useEffect} from "react";
import {Link} from "expo-router";
import ReportSection from "./ReportSection";
import {generateReport} from "@/services/report";
import {sendNotification} from "@/services/notification";
import {getReportByStudentId} from "@/services/api";

const StudentItem = ({item}) => {
    const [expanded, setExpanded] = useState(false)
    const [loadingReport, setLoadingReport] = useState(false)
    const [report, setReport] = useState(null)

    const animation = useRef(new Animated.Value(0)).current

    // Animate expansion
    useEffect(() => {
        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    const toggleExpand = () => {
        setExpanded(!expanded)
    };

    const handleGenerateReport = async () => {
        setLoadingReport(true);
        try {
            const generated = await generateReport(item.id);
            setReport(generated.report_data);
            Alert.alert("Success", "Report generated successfully")
        } catch (e) {
            console.error("Error generating report:", e)
            Alert.alert("Error", e.message)
        } finally {
            setLoadingReport(false);
        }
    };

    const handleSendNotification = async () => {
        try {
            const latestReport = await getReportByStudentId(item.id)

            if (!latestReport) {
                return Alert.alert("Error", "No report found for this student. Generate it first.")
            }


            await sendNotification(item, latestReport.summary)
            Alert.alert("Success", "Notification sent")
        } catch (e) {
            console.error("Error sending notification:", e)
            Alert.alert("Error", e.message)
        }
    };
    const animatedHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500],
    });

    const handleShowReport = async () => {
        try {
            const lastestReport = await getReportByStudentId(item.id)
            if (!lastestReport) {
                return Alert.alert("Error", "No Report found for this student. Generate it first.")
            }
        } catch (e) {
            Alert.alert("Error", e.message)
        }
    }

    return (
        <View style={styles.itemContainer}>
            {/* Header */}
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.headerText}>{item.name}</Text>
            </TouchableOpacity>

            {/* Collapsible Content */}
            <Animated.View style={[styles.content, {maxHeight: animatedHeight}]}>
                {expanded && (
                    <ScrollView
                        style={{padding: 10}}
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.detail}>Class: {item.class_name}</Text>
                        <Link href={`/addStudentDetails?student_id=${item.id}`} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Add Student Details</Text>
                            </TouchableOpacity>
                        </Link>

                        <TouchableOpacity onPress={handleGenerateReport} style={styles.button}>
                            <Text style={styles.buttonText}>
                                {loadingReport ? "Generating..." : "Generate Report"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleShowReport} style={styles.button}>
                            <Text style={styles.buttonText}>
                                {loadingReport ? "Loading..." : "Show Report"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSendNotification} style={styles.button}>
                            <Text style={styles.buttonText}>Send Notification</Text>
                        </TouchableOpacity>

                        {report && <ReportSection report={report}/>}
                    </ScrollView>
                )}
            </Animated.View>
        </View>
    );
};

export default StudentItem;

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        backgroundColor: "#222",
        borderRadius: 10,
        overflow: "hidden",
    },
    header: {
        padding: 10,
        backgroundColor: "#444",
    },
    headerText: {
        color: "#fff",
        fontSize: 16,
    },
    content: {
        overflow: "hidden",
        backgroundColor: "#555",
        paddingHorizontal: 0,
    },
    detail: {
        color: "#ccc",
        fontSize: 14,
        marginVertical: 2,
    },
    button: {
        backgroundColor: "#4cafef",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
    reportContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 8,
    },
    reportTitle: {
        color: "#fff",
        fontWeight: "700",
        marginTop: 10,
    },
    reportText: {
        color: "#ddd",
        marginTop: 5,
        paddingVertical: 8,
    },
});
