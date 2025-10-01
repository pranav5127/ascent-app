import AsyncStorage from "@react-native-async-storage/async-storage"

const BASE_URL = "https://ascent-backend.onrender.com"

const parseResponse = async (response) => {
    const text = await response.text()
    try {
        return JSON.parse(text)
    } catch {
        return {message: text}
    }
}

export const AuthService = {

    signUp: async (userData) => {
        const response = await fetch(`${BASE_URL}/users/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
        if (!response.ok) {
            const errorData = await parseResponse(response)
            throw new Error(errorData.message || "Signup failed")
        }
        return await parseResponse(response)
    },
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        if (!response.ok) {
            const errorData = await parseResponse(response)
            throw new Error(errorData.message || "Login failed")
        }
        const data = await parseResponse(response)
        const {access_token, user_id} = data
        if (!access_token || !user_id) throw new Error("Invalid server response")

        await AsyncStorage.setItem("userToken", access_token)
        await AsyncStorage.setItem("userId", user_id)
        return {token: access_token, userId: user_id}
    },

    getUserProfile: async (userId) => {
        const token = await AsyncStorage.getItem("userToken")
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        if (!response.ok) {
            const errorData = await parseResponse(response)
            throw new Error(errorData.message || "Failed to fetch profile")
        }
        return await parseResponse(response)
    },

    logout: async () => {
        await AsyncStorage.multiRemove(["userToken", "userId", "userProfile"])
    },

    getToken: async () => {
        return await AsyncStorage.getItem("userToken")
    },

    getUserId: async () => {
        return await AsyncStorage.getItem("userId")
    }
}
