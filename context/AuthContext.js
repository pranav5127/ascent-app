// AuthContext.js
import React, { createContext, useState, useEffect } from "react"
import { AuthService } from "@/services/AuthService"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await AuthService.getToken()
                const userId = await AuthService.getUserId()

                if (token) setUserToken(token)

                if (userId) {
                    const profile = await AuthService.getUserProfile(userId)
                    setUserProfile(profile)
                    await AsyncStorage.setItem("userProfile", JSON.stringify(profile))
                }
            } catch (err) {
                console.log("Failed to load user:", err)
            } finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [])

    const signIn = async (email, password) => {
        const { token, userId } = await AuthService.login(email, password)
        setUserToken(token)

        const profile = await AuthService.getUserProfile(userId)
        setUserProfile(profile)
        await AsyncStorage.setItem("userProfile", JSON.stringify(profile))
    }

    const signUp = async (userData) => {
        await AuthService.signUp(userData)
    }

    const signOut = async () => {
        await AuthService.logout()
        setUserToken(null)
        setUserProfile(null)
    }

    return (
        <AuthContext.Provider value={{ userToken, userProfile, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
