import { View, Text, StyleSheet } from "react-native";

const ReportSection = ({ report})  => {
    if (!report) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detailed Report:</Text>
            <Text style={styles.content}>{report.detailed_report}</Text>

            <Text style={styles.title}>Summary:</Text>
            <Text style={styles.content}>{report.summary}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 8,
    },
    title: {
        color: "#fff",
        fontWeight: "700",
        marginTop: 10,
        fontSize: 16,
    },
    content: {
        color: "#ddd",
        marginTop: 5,
        lineHeight: 20,
    },
});

export default ReportSection;
