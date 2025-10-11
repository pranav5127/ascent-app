import React, { useContext, useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { AuthContext } from "@/context/AuthContext"
import { joinClassService } from "@/services/joinClassService"
import { useTranslation } from "react-i18next"
import {i18n} from "@/i18n";

export default function JoinClass() {
    const [classCode, setClassCode] = useState("")
    const { userProfile } = useContext(AuthContext)
    const { t } = useTranslation()

    const handleJoinClass = async () => {
        if (!classCode.trim()) {
            Alert.alert(i18n.t("joinClass.emptyAlert"))
            return
        }

        try {
            if (userProfile?.id) {
                const joinClass = await joinClassService({
                    class_id: classCode,
                    student_id: userProfile.id
                })
                console.log(joinClass)
                Alert.alert(i18n.t("joinClass.successTitle"), i18n.t("joinClass.successMessage"))
            }
        } catch (err) {
            Alert.alert(i18n.t("joinClass.errorTitle"), err.message || t("joinClass.errorMessage"))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{i18n.t("joinClass.title")}</Text>

            <LinearGradient
                colors={["#a43313", "#e97351"]}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 0.9 }}
                style={styles.card}
            >
                <TextInput
                    style={styles.input}
                    placeholder={i18n.t("joinClass.placeholder")}
                    placeholderTextColor="#888"
                    value={classCode}
                    onChangeText={setClassCode}
                />

                <TouchableOpacity style={styles.button} onPress={handleJoinClass}>
                    <Text style={styles.buttonText}>{i18n.t("joinClass.button")}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 40
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30
    },
    card: {
        borderRadius: 15,
        width: "85%",
        padding: 20,
        height: 250,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
})
