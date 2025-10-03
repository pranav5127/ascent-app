import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    ScrollView
} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import { getExamService } from "@/services/getExamService";

const ExamCard = ({ title, dates, onPress }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
        <Image
            source={{ uri: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg" }}
            style={styles.cardImage}
            resizeMode="cover"
        />
        <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDates}>{dates}</Text>
        </View>
    </TouchableOpacity>
);

const ExamScreen = () => {
    const router = useRouter()
    const { classId } = useLocalSearchParams();
    const [exam, setExam] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCreate = () => router.push({
        pathname: "/teachersScreen/createExam",
        params: { classId: classId },
})

    useEffect(() => {
        const fetchExams = async () => {
            try {
                if (!classId) {
                    Alert.alert("Class id not found");
                    return;
                }
                const examList = await getExamService.getExamByClass(classId);
                setExam(examList);
            } catch (err) {
                Alert.alert("Failed to fetch exams", err.message || String(err));
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
    }, [classId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#404040" />
                <Text style={styles.loadingText}>Loading exams...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Create Exam Button */}
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate} activeOpacity={0.8}>
                <Text style={styles.createBtnText}>create exam</Text>
            </TouchableOpacity>

            {/* Exam List */}
            <ScrollView>
                {exam.length > 0 ? (
                    exam.map(exam => (
                        <ExamCard
                            key={exam.name}
                            title={exam.name}
                            dates={exam.date}
                            onPress={() => router.push({
                                pathname: "teachersScreen/student",
                                params: {
                                    classId: classId,
                                    examId: exam.id
                                }
                            })}
                        />
                    ))
                ) : (
                    <Text style={styles.emptyText}>No exams available</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 20,
        paddingTop: 46,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    createBtn: {
        backgroundColor: "#404040",
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 20,
        marginTop: 10,
    },
    createBtnText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        textTransform: "lowercase",
    },
    card: {
        height: 180,
        borderRadius: 12,
        marginBottom: 20,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    cardImage: {
        height: 120,
    },
    cardOverlay: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333333",
    },
    cardDates: {
        fontSize: 14,
        fontWeight: "400",
        color: "#777777",
    },
    emptyText: {
        textAlign: "center",
        color: "#777",
        fontSize: 16,
        marginTop: 20,
    },
});

export default ExamScreen;
