import { useRouter } from "expo-router"
import { useContext, useEffect } from "react"
import { AuthContext } from "@/context/AuthContext"
import { View, ActivityIndicator } from "react-native"

export default function Index() {
    const { userToken, userProfile, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (loading) return

        if (!userToken) {
            router.replace("/auth/signin")
        } else if (userProfile?.role === "student") {
            router.replace("/studentTabs/home")
        } else if (userProfile?.role === "teacher") {
            router.replace("/teacherTabs/home")
        } else {
            router.replace("/auth/signin")
        }
    }, [loading, userToken, userProfile])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    )
}
