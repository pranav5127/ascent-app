import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "react-native-reanimated";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useContext } from "react";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <AuthStack />
            </ThemeProvider>
        </AuthProvider>
    );
}

function AuthStack() {
    const { userToken, loading } = useContext(AuthContext);

    if (loading) return null

    if (userToken) {
        return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        )
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth/signin" />
            <Stack.Screen name="auth/signup" />
        </Stack>
    );
}
