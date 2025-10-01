import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native"
import {Picker} from "@react-native-picker/picker"
import {LinearGradient} from "expo-linear-gradient";

export default function SignUpScreen() {
    const [role, setRole] = useState("student")

    return (
        <LinearGradient
            colors={["#DE7017", "#EAAC72"]}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 0.9}}
            style={styles.container}
        >
            {/* Card */}
            <View style={styles.card}>
                {/* Title */}
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Sign up to join</Text>

                {/* Input Fields */}
                <TextInput placeholder="name" style={styles.input}/>
                <TextInput placeholder="email" style={styles.input}/>

                {/* Dropdown (Picker) */}
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={role}
                        onValueChange={(itemValue) => setRole(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="student" value="student"/>
                        <Picker.Item label="teacher" value="teacher"/>
                    </Picker>
                </View>

                <TextInput
                    placeholder="password"
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="confirm password"
                    secureTextEntry
                    style={styles.input}
                />

                {/* Already have an account */}
                <Text style={styles.footerText}>
                    Have an account ?{" "}
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Sign In</Text>
                    </TouchableOpacity>
                </Text>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E97721",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 12,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 25,
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
    },
    footerText: {
        textAlign: "center",
        fontSize: 14,
        color: "#444",
        marginBottom: 15,
    },
    linkText: {
        color: "blue",
        fontWeight: "500",
    },
    button: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
})
