import { Slot } from "expo-router"
import { AuthProvider, AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { ActivityIndicator, View } from "react-native"
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native"
import { useColorScheme } from "@/hooks/use-color-scheme"

export default function RootLayout() {
    const colorScheme = useColorScheme()

    return (
        <AuthProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <AuthGate />
            </ThemeProvider>
        </AuthProvider>
    )
}

function AuthGate() {
    const { userToken, userProfile, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!userToken) {
        return <Slot name="auth" />
    }

    if (userProfile?.role === "student") {
        return <Slot name="studentTabs" />
    }

    if (userProfile?.role === "teacher") {
        return <Slot name="teacherTabs" />
    }

    return <Slot name="auth" />
}
