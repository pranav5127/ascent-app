import { useState } from "react"
import { Text, TextInput, StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import {STUDENT_URL} from "@/constants/urls";

// const STUDENT_URL = "http://192.168.1.34:9900/students/"

export default function AddStudent() {
    const { parent_id } = useLocalSearchParams()
    const [name, setName] = useState("")
    const [standard, setStandard] = useState("")
    const [loading, setLoading] = useState(false)

    const addNewStudent = async () => {
        if (!name || !standard || !parent_id) {
            Alert.alert("Error", "Please fill all fields")
            return
        }

        try {
            setLoading(true)

            const res = await fetch(STUDENT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    class_name: standard,
                    parent_id,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                console.log("Backend Error:", data)
                Alert.alert("Error", JSON.stringify(data))
                return
            }

            Alert.alert("Success", "Student added successfully")
            setName("")
            setStandard("")
        } catch (error) {
            Alert.alert("Error", "Something went wrong: " + error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add Student</Text>

            <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Student's name"
                    placeholderTextColor="#aaa"
                />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>Class</Text>
                <TextInput
                    value={standard}
                    onChangeText={setStandard}
                    style={styles.input}
                    placeholder="Class"
                    placeholderTextColor="#aaa"
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#4cafef" style={{ marginTop: 20 }} />
            ) : (
                <TouchableOpacity style={styles.button} onPress={addNewStudent}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "rgba(3,1,23,0.95)", padding: 20 },
    title: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 30 },
    field: { marginBottom: 20 },
    label: { color: "#ccc", fontSize: 14, marginBottom: 6 },
    input: {
        height: 50,
        borderColor: "#555",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: "#fff",
        backgroundColor: "rgba(255,255,255,0.05)",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#4cafef",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 18 },
})
