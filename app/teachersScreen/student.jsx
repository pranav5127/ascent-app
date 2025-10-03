import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { fetchClassStudents } from "@/services/getStudents";
import { getSubjectsService } from "@/services/getSubjectService";
import { submitMarksService } from "@/services/submitMarksService";
import { generateStudentReport } from "@/services/getMarksService";
import { saveReportService } from "@/services/saveReportService";

function Students() {
    const [expanded, setExpanded] = useState(null);
    const [marks, setMarks] = useState({});
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loadingReport, setLoadingReport] = useState(false);
    const { classId, examId } = useLocalSearchParams();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [studentsData, subjectsData] = await Promise.all([
                    fetchClassStudents(classId),
                    getSubjectsService(classId)
                ]);
                setStudents(studentsData);
                setSubjects(subjectsData);
            } catch (err) {
                console.error("Error loading data", err);
                Alert.alert("Error", "Failed to load students or subjects");
            }
        };
        loadData();
    }, [classId]);

    const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

    const updateMarks = (studentId, subjectId, value) => {
        setMarks(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [subjectId]: value
            }
        }));
    };

    const generateReport = async (student) => {
        try {
            setLoadingReport(true);

            console.log("Generating report for student:", student.name);
            console.log("Student ID:", student.id);
            console.log("Class ID from params:", classId);

            const report = await generateStudentReport(examId, student, subjects);
            console.log("Report preview:", report);

            Alert.alert(
                "Generated Report",
                `${report.summary}\n\n${report.detailed_report}`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: async () => {
                            try {
                                const payload = {
                                    student_id: student.id,
                                    class_id: classId,
                                    period: "Mid Term",
                                    report_text: JSON.stringify(report, null, 2),
                                    created_at: new Date().toISOString(),
                                };
                                console.log("Payload to save report:", payload);

                                await saveReportService(payload);
                                Alert.alert("Success", "Report saved successfully ✅");
                            } catch (err) {
                                console.error("Error saving report:", err);
                                Alert.alert("Error", "Failed to save report ❌");
                            }
                        },
                    },
                ]
            );
        } catch (err) {
            console.error("Error generating report:", err);
            Alert.alert("Error", "Failed to generate report ❌");
        } finally {
            setLoadingReport(false);
        }
    };

    const submitStudentMarks = async (studentId) => {
        const studentMarks = marks[studentId] || {};
        if (Object.keys(studentMarks).length === 0) {
            Alert.alert("No Marks", "Please enter marks before submitting.");
            return;
        }

        try {
            await Promise.all(
                Object.entries(studentMarks).map(([subjectId, markValue]) =>
                    submitMarksService(examId, studentId, subjectId, markValue)
                )
            );
            Alert.alert("Success", "Marks submitted successfully");
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to submit marks");
        }
    };

    const renderStudent = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.header} onPress={() => toggleExpand(item.id)}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Ionicons name={expanded === item.id ? "chevron-up" : "chevron-down"} size={20} color="#000" />
            </TouchableOpacity>

            {expanded === item.id && (
                <View style={styles.details}>
                    <View style={styles.subjectGrid}>
                        {subjects.map(subj => (
                            <View key={subj.id} style={styles.subjectRow}>
                                <Text style={styles.subjectLabel}>{subj.name}</Text>
                                <TextInput
                                    style={styles.marksInput}
                                    placeholder="marks"
                                    placeholderTextColor="#666"
                                    keyboardType="numeric"
                                    value={marks[item.id]?.[subj.id] || ""}
                                    onChangeText={(val) => updateMarks(item.id, subj.id, val)}
                                />
                            </View>
                        ))}
                    </View>

                    <View style={styles.btnRow}>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => generateReport(item)}>
                            {loadingReport ? <ActivityIndicator color="white" /> : <Text style={styles.actionText}>generate report</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn} onPress={() => submitStudentMarks(item.id)}>
                            <Text style={styles.actionText}>submit scores</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Students</Text>
            <FlatList
                data={students}
                renderItem={renderStudent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
}

export default Students;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3ebe6",
        paddingTop: 40,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 20
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    studentName: {
        fontSize: 16,
        fontWeight: "500"
    },
    details: {
        marginTop: 15
    },
    subjectGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    subjectRow: {
        width: "48%",
        marginBottom: 15
    },
    subjectLabel: {
        fontSize: 14,
        marginBottom: 5
    },
    marksInput: {
        backgroundColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 14
    },
    btnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    actionBtn: {
        flex: 1,
        backgroundColor: "black",
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: "center"
    },
    actionText: {
        color: "white",
        fontSize: 13,
        fontWeight: "500",
        textTransform: "capitalize"
    }
});
