import React, { useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function SignInScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = () => {
        console.log("Email:", email)
        console.log("Password:", password)
    }

    const handleSignUp = () => {
        console.log("Navigate to Sign Up screen")
    }

    return (
        <LinearGradient
            colors={["#DE7017", "#EAAC72"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 0.9 }}
            style={styles.container}
        >
            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.welcomeText}>Welcome{"\n"}Back</Text>
                <Text style={styles.subText}>login to continue</Text>

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Sign Up Link */}
                <Text style={styles.signupText}>
                    create new account?{" "}
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </Text>

                {/* Sign In Button */}
                <TouchableOpacity style={styles.signinBtn} onPress={handleSignIn}>
                    <Text style={styles.signinText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#fff",
        width: "85%",
        borderRadius: 12,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000",
    },
    subText: {
        fontSize: 14,
        color: "gray",
        marginVertical: 10,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginVertical: 8,
        backgroundColor: "#f2f2f2",
    },
    signupText: {
        fontSize: 13,
        color: "gray",
        textAlign: "center",
        marginVertical: 15,
    },
    signupLink: {
        color: "blue",
        fontWeight: "600",
    },
    signinBtn: {
        backgroundColor: "black",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
    },
    signinText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})

