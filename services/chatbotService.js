import { Alert } from "react-native"
import {BASE_URL} from "@/constants/urls";


export async function sendChatMessage(message, model = "tinyllama:latest") {
    try {
        const response = await fetch(`${BASE_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, model }),
        })

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`)
        }

        const data = await response.json()
        return data.reply || ""
    } catch (error) {
        console.error("ChatService Error:", error)
        Alert.alert("Error", "Failed to send message to server")
        return ""
    }
}
