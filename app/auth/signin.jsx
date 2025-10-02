import React, {useState, useContext} from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {AuthContext} from "@/context/AuthContext"
import {useRouter} from "expo-router"
import {Ionicons} from "@expo/vector-icons"

export default function SignInScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const {signIn} = useContext(AuthContext)
    const router = useRouter()

    const handleSignIn = async () => {
        try {
            const profile = await signIn(email, password)
            console.log("Sign in successful:", profile)

            if (profile.role === "teacher") {
                router.push("/teacherTabs/home")
            } else {
                router.push("/studentTabs/home")
            }
        } catch (err) {
            console.error("Sign in failed:", err)
            Alert.alert("Login Failed", err.message)
        }
    }



    return (
        <LinearGradient
            colors={["#DE7017", "#EAAC72"]}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 0.9}}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.welcomeText}>Welcome{"\n"}Back</Text>
                <Text style={styles.subText}>login to continue</Text>

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    placeholderTextColor="#aaa"
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setEmail}
                    textContentType="emailAddress"
                />

                {/* Password Input with Toggle */}
                <View style={styles.passwordWrapper}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="password"
                        placeholderTextColor="#aaa"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={!showPassword}
                        value={password}
                        textContentType="password"
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(prev => !prev)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>

                {/* Sign Up Link */}
                <Text style={styles.signupText}>
                    create new account?{" "}
                    <TouchableOpacity onPress={() => router.replace("/auth/signup")}>
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
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginVertical: 8,
        backgroundColor: "#f2f2f2",
    },
    passwordInput: {
        flex: 1,
        height: 45,
        fontSize: 16,
    },
    eyeIcon: {
        marginLeft: 10,
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
