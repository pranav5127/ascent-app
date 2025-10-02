import React, { useState, useContext } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { LinearGradient } from "expo-linear-gradient"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function SignUpScreen() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("student")
    const [mobileNumber, setMobileNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPasswords, setShowPasswords] = useState(false)

    const { signUp } = useContext(AuthContext)
    const router = useRouter()

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match")
            return
        }

        try {
            await signUp({
                name,
                email,
                role,
                language_pref: "english",
                mobileNumber,
                password,
            })
            Alert.alert("Sign-up successful")
            router.push("/auth/signin")
        } catch (err) {
            Alert.alert("Signup Failed", err.message)
            console.log(err.message)
        }
    }

    return (
        <LinearGradient
            colors={["#DE7017", "#EAAC72"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 0.9 }}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>Create Account</Text>

                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            placeholderTextColor="#aaa"
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholderTextColor="#aaa"
                        />
                        <TextInput
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            style={styles.input}
                            placeholderTextColor="#aaa"
                        />

                        {/* Role Picker */}
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={role}
                                onValueChange={(itemValue) => setRole(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Student" value="student" />
                                <Picker.Item label="Teacher" value="teacher" />
                            </Picker>
                        </View>

                        {/* Password Field */}
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Password"
                                secureTextEntry={!showPasswords}
                                value={password}
                                onChangeText={setPassword}
                                style={styles.passwordInput}
                                placeholderTextColor="#aaa"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPasswords(prev => !prev)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPasswords ? "eye-off" : "eye"}
                                    size={20}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Field */}
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Confirm Password"
                                secureTextEntry={!showPasswords}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                style={styles.passwordInput}
                                placeholderTextColor="#aaa"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPasswords(prev => !prev)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPasswords ? "eye-off" : "eye"}
                                    size={20}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Navigation */}
                        <TouchableOpacity
                            onPress={() => router.push("/auth/signin")}
                            style={styles.signInLink}
                        >
                            <Text style={styles.signInText}>
                                Already have an account?{" "}
                                <Text style={{ fontWeight: "600", color: "blue" }}>
                                    Sign In
                                </Text>
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "#000",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 20,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 20,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: {
        height: 50,
        width: "100%",
        color: "#222"

    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 20,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    signInLink: {
        alignItems: "center",
        marginTop: 10,
    },
    signInText: {
        color: "#000",
        fontSize: 14,
    },
})
