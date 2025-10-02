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
                setLoading(true)
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
        try {
            const { token, userId } = await AuthService.login(email, password)
            setUserToken(token)
            const profile = await AuthService.getUserProfile(userId)
            setUserProfile(profile)
            await AsyncStorage.setItem("userProfile", JSON.stringify(profile))
            console.log(`AuthContext: ${profile}`)
            return profile
        } catch (err) {
            console.log("SignIn failed:", err)
            throw err
        }
    }

    const signUp = async (userData) => {
        try {
            await AuthService.signUp(userData)
        } catch (err) {
            console.log("SignUp failed:", err)
            throw err
        }
    }

    const signOut = async () => {
        try {
            await AuthService.logout()
            setUserToken(null)
            setUserProfile(null)
            await AsyncStorage.removeItem("userProfile")
        } catch (err) {
            console.log("SignOut failed:", err)
        }
    }

    const userRole = async (userId) => {
        try {
            const role = await AuthService.getUserProfile(userId)
            return role.role
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <AuthContext.Provider value={{ userToken, userProfile, loading, signIn, signUp, userRole,signOut, setUserProfile, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
