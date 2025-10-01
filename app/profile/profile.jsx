import React, { useContext } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native"
import { i18n } from "@/i18n"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function Profile() {
    const { signOut, userProfile } = useContext(AuthContext)
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await signOut()
            Alert.alert("Logged out successfully")
            router.replace("/auth/signin")
        } catch (err) {
            console.log("Logout failed", err)
            Alert.alert("Logout failed")
        }
    }

    if (!userProfile) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Image
                source={require("../../assets/images/teacher.png")}
                style={styles.avatar}
            />

            <View style={styles.line} />

            <View style={styles.infoRow}>
                <Text style={styles.label}>{i18n.t("profile.userId") + ": "}</Text>
                <Text style={styles.value}>
                    {userProfile.id ? userProfile.id.substring(0, 10) + "..." : ""}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>{i18n.t("profile.fullName")}</Text>
                <Text style={styles.value}>{userProfile.name}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>{i18n.t("profile.email")}</Text>
                <Text style={styles.value}>{userProfile.email}</Text>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>{i18n.t("profile.logout")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4ECE7",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60
    },
    backBtn: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
        padding: 5
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20
    },
    line: {
        borderBottomColor: "#303131",
        borderBottomWidth: 1,
        width: "90%",
        marginVertical: 20
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginVertical: 5
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#303131"
    },
    value: {
        fontSize: 16,
        fontWeight: "400",
        color: "#303131"
    },
    logoutBtn: {
        marginTop: 40,
        width: "80%",
        backgroundColor: "#303131",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center"
    }
})
