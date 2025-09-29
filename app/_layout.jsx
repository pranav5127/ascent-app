import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {Stack} from 'expo-router'
import {useColorScheme} from '@/hooks/use-color-scheme'
import 'react-native-reanimated'

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                </Stack>
            </ThemeProvider>
    )
}
