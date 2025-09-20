import { useState } from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const API_URL = "http://192.168.1.34:9900";

export default function AddStudentDetails() {
    const { student_id } = useLocalSearchParams();

    // Marks
    const [examType, setExamType] = useState("");
    const [examDate, setExamDate] = useState("");
    const [examDateObj, setExamDateObj] = useState(new Date());
    const [examDatePickerVisible, setExamDatePickerVisible] = useState(false);
    const [subjects, setSubjects] = useState([{ name: "", score: "", maxScore: "" }]);

    // Attendance
    const [month, setMonth] = useState("");
    const [present, setPresent] = useState("");
    const [absent, setAbsent] = useState("");

    // Activities
    const [activities, setActivities] = useState([
        { type: "", description: "", achievement: "", date: "", showDatePicker: false },
    ]);

    const [loading, setLoading] = useState(false);

    // ---------- Subject Handlers ----------
    const addSubject = () => setSubjects([...subjects, { name: "", score: "", maxScore: "" }]);
    const removeSubject = (index) => {
        const copy = [...subjects];
        copy.splice(index, 1);
        setSubjects(copy);
    };
    const updateSubject = (index, field, value) => {
        const copy = [...subjects];
        copy[index][field] = value;
        setSubjects(copy);
    };

    // ---------- Activity Handlers ----------
    const addActivity = () =>
        setActivities([...activities, { type: "", description: "", achievement: "", date: "", showDatePicker: false }]);
    const removeActivity = (index) => {
        const copy = [...activities];
        copy.splice(index, 1);
        setActivities(copy);
    };
    const updateActivity = (index, field, value) => {
        const copy = [...activities];
        copy[index][field] = value;
        setActivities(copy);
    };

    // ---------- Submit ----------
    const saveDetails = async () => {
        if (!student_id) {
            Alert.alert("Error", "Student ID missing");
            return;
        }

        try {
            setLoading(true);

            const subjectScores = subjects
                .filter((s) => s.name.trim() !== "")
                .reduce((acc, s) => {
                    acc[s.name.trim()] = {
                        score: Number(s.score),
                        max_score: Number(s.maxScore),
                    };
                    return acc;
                }, {});

            const marksPayload = {
                student_id,
                exam_type: examType,
                subject_scores: subjectScores,
                date: examDate,
            };

            const attendancePayload = {
                student_id,
                month,
                days_present: Number(present),
                days_absent: Number(absent),
            };

            const activitiesPayload = activities
                .filter((a) => a.type.trim() !== "")
                .map((a) => ({
                    student_id,
                    activity_type: a.type,
                    description: a.description,
                    achievement: a.achievement,
                    date: a.date,
                }));

            console.log("Marks Payload:", JSON.stringify(marksPayload));
            console.log("Attendance Payload:", JSON.stringify(attendancePayload));
            console.log("Activities Payload:", JSON.stringify(activitiesPayload));

            // API Calls
            const marksRes = await fetch(`${API_URL}/marks/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(marksPayload),
            });
            console.log("Marks Response:", marksRes.status, await marksRes.text());
            if (!marksRes.ok) throw new Error("Marks save failed");

            const attendanceRes = await fetch(`${API_URL}/attendance/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(attendancePayload),
            });
            console.log("Attendance Response:", attendanceRes.status, await attendanceRes.text());
            if (!attendanceRes.ok) throw new Error("Attendance save failed");

            for (const act of activitiesPayload) {
                const actRes = await fetch(`${API_URL}/activities/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(act),
                });
                console.log("Activity Response:", actRes.status, await actRes.text());
                if (!actRes.ok) throw new Error("Activity save failed");
            }

            Alert.alert("Success", "Student details saved successfully");
        } catch (err) {
            console.error("Save Error:", err);
            Alert.alert("Error", "Failed to save details: " + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
            >
                <ScrollView>
                    <Text style={styles.title}>Add Student Details</Text>

                    {/* Marks */}
                    <Text style={styles.sectionTitle}>Marks</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Exam Type"
                        placeholderTextColor="#aaa"
                        value={examType}
                        onChangeText={setExamType}
                    />

                    {/* Exam Date Picker */}
                    <TouchableOpacity onPress={() => setExamDatePickerVisible(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Date (YYYY-MM-DD)"
                            placeholderTextColor="#aaa"
                            value={examDate}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                    {examDatePickerVisible && (
                        <DateTimePicker
                            value={examDateObj}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setExamDatePickerVisible(false);
                                if (selectedDate) {
                                    setExamDateObj(selectedDate);
                                    setExamDate(selectedDate.toISOString().split("T")[0]);
                                }
                            }}
                        />
                    )}

                    {subjects.map((s, i) => (
                        <View key={i} style={styles.row}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Subject"
                                placeholderTextColor="#aaa"
                                value={s.name}
                                onChangeText={(t) => updateSubject(i, "name", t)}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Score"
                                placeholderTextColor="#aaa"
                                value={s.score}
                                onChangeText={(t) => updateSubject(i, "score", t)}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Max"
                                placeholderTextColor="#aaa"
                                value={s.maxScore}
                                onChangeText={(t) => updateSubject(i, "maxScore", t)}
                                keyboardType="numeric"
                            />
                            {subjects.length > 1 && (
                                <TouchableOpacity onPress={() => removeSubject(i)}>
                                    <Text style={styles.removeBtn}>Remove</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity onPress={addSubject}>
                        <Text style={styles.addBtn}>+ Add Subject</Text>
                    </TouchableOpacity>

                    {/* Attendance */}
                    <Text style={styles.sectionTitle}>Attendance</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Month (e.g. September)"
                        placeholderTextColor="#aaa"
                        value={month}
                        onChangeText={setMonth}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Days Present"
                        placeholderTextColor="#aaa"
                        value={present}
                        onChangeText={setPresent}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Days Absent"
                        placeholderTextColor="#aaa"
                        value={absent}
                        onChangeText={setAbsent}
                        keyboardType="numeric"
                    />

                    {/* Activities */}
                    <Text style={styles.sectionTitle}>Activities</Text>
                    {activities.map((a, i) => (
                        <View key={i}>
                            <TextInput
                                style={styles.input}
                                placeholder="Activity Type"
                                placeholderTextColor="#aaa"
                                value={a.type}
                                onChangeText={(t) => updateActivity(i, "type", t)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                placeholderTextColor="#aaa"
                                value={a.description}
                                onChangeText={(t) => updateActivity(i, "description", t)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Achievement"
                                placeholderTextColor="#aaa"
                                value={a.achievement}
                                onChangeText={(t) => updateActivity(i, "achievement", t)}
                            />

                            {/* Activity Date Picker */}
                            <TouchableOpacity onPress={() => updateActivity(i, "showDatePicker", true)}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Date (YYYY-MM-DD)"
                                    placeholderTextColor="#aaa"
                                    value={a.date}
                                    editable={false}
                                    pointerEvents="none"
                                />
                            </TouchableOpacity>
                            {a.showDatePicker && (
                                <DateTimePicker
                                    value={a.date ? new Date(a.date) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        updateActivity(i, "showDatePicker", false);
                                        if (selectedDate) {
                                            updateActivity(i, "date", selectedDate.toISOString().split("T")[0]);
                                        }
                                    }}
                                />
                            )}

                            {activities.length > 1 && (
                                <TouchableOpacity onPress={() => removeActivity(i)}>
                                    <Text style={styles.removeBtn}>Remove Activity</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity onPress={addActivity}>
                        <Text style={styles.addBtn}>+ Add Activity</Text>
                    </TouchableOpacity>

                    {/* Submit */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#4cafef" style={{ marginTop: 20 }} />
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={saveDetails}>
                            <Text style={styles.buttonText}>Save Details</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "rgba(3,1,23,0.95)", padding: 20 },
    title: { color: "#ffffff", fontSize: 24, fontWeight: "700", marginBottom: 20 },
    sectionTitle: { color: "#4cafef", fontSize: 18, fontWeight: "600", marginVertical: 10 },
    input: {
        height: 50,
        borderColor: "#555",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: "#fff",
        backgroundColor: "rgba(255,255,255,0.05)",
        fontSize: 16,
        marginBottom: 10,
    },
    row: { flexDirection: "row", gap: 8, marginBottom: 10, alignItems: "center" },
    button: {
        backgroundColor: "#4cafef",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 18 },
    addBtn: { color: "#4cafef", marginBottom: 10, fontWeight: "500" },
    removeBtn: { color: "red", marginLeft: 8, fontWeight: "500" },
});
