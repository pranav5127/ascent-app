import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import {i18n} from "@/i18n"

export default function Profile() {

    return (
        <View style={styles.container}>
            {/* Profile Image */}
            <Image
                source={require("../../assets/images/teacher.png")}
                style={styles.avatar}
            />

            <View style={styles.line} />

            {/* User Info */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>{i18n.t("profile.userId")}</Text>
                <Text style={styles.value}>12345</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>{i18n.t("profile.fullName")}</Text>
                <Text style={styles.value}>User Name</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>{i18n.t("profile.email")}</Text>
                <Text style={styles.value}>user@email.com</Text>
            </View>

            {/* Log Out Button */}
            <TouchableOpacity style={styles.logoutBtn}>
                <Text style={styles.logoutText}>{i18n.t("profile.logout")}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4ECE7",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    line: {
        borderBottomColor: "#303131",
        borderBottomWidth: 1,
        width: "90%",
        marginVertical: 20,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#303131",
    },
    value: {
        fontSize: 16,
        fontWeight: "400",
        color: "#303131",
    },
    logoutBtn: {
        marginTop: 40,
        width: "80%",
        backgroundColor: "#303131",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },

})






