import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Text, FlatList, ActivityIndicator, StyleSheet } from "react-native"
import {useStudentData} from "@/hooks/useStudentData"
import StudentItem from "@/components/student/StudentItem"

export default function StudentList() {
    const { students, loading, refreshing, refreshStudents } = useStudentData()

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Student List</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#4cafef" />
                ) : (
                    <FlatList
                        data={students}
                        renderItem={({ item }) => <StudentItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        refreshing={refreshing}
                        onRefresh={refreshStudents}
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "rgba(3,1,23,0.95)", padding: 10, borderRadius: 20 },
    title: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 20 },
});
