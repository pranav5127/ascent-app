import {useState} from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const API_URL = "http://192.168.1.34:9900/users/"
// const API_URL = "http://10.0.2.2:9900/users"
// const API_URL = "http://localhost:9900/users"

export default function AddParent() {
    const [email, setEmail] = useState("")
    const [externalId, setExternalId] = useState("")
    const [role, setRole] = useState("parent")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>(null)

    const addNewParent = async () => {
        if (!externalId || !email) {
            alert("Please fill all fields")
            return
        }

        try {
            setLoading(true)
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    external_id: externalId,
                    email: email,
                    role: role,
                }),
            })

            const text = await res.text()

            if (!res.ok) {
                console.error("Backend error:", text)
                throw new Error(`Error ${res.status}: ${text}`)
            }

            const data = JSON.parse(text)
            setResponse(data)
            alert("Parent added successfully!")
        } catch (error) {
            console.error("Request failed:", error)
            alert("Something went wrong! Check server logs and network.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
                <Text style={styles.title}>Add Parent</Text>
                <View style={styles.field}>

                    <Text style={styles.label}>External ID</Text>
                    <TextInput
                        value={externalId}
                        onChangeText={setExternalId}
                        style={styles.input}
                        placeholder="e.g. abcde2"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        placeholder="e.g. p3@example.com"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Role</Text>
                    <TextInput
                        value={role}
                        onChangeText={setRole}
                        style={styles.input}
                        placeholder="parent"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={addNewParent}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="#4cafef" style={{marginTop: 20}}/>}

                {response && (
                    <Text style={{color: "#fff", marginTop: 20}}>
                        Response: {JSON.stringify(response, null, 2)}
                    </Text>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(3,1,23,0.95)",
        padding: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 30,
    },
    field: {
        marginBottom: 20,
    },
    label: {
        color: "#ccc",
        fontSize: 14,
        marginBottom: 6,
    },
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
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
    },
})





