import React, {useState, useRef, useEffect} from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Pressable,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context"
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import MessageBubble from '@/components/chatbot/message-bubble'
import AntDesign from '@expo/vector-icons/AntDesign'
import uuid from 'react-native-uuid'
import {sendChatMessage} from "@/services/chatbotService"

export default function ChatScreen() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const flatListRef = useRef(null)
    const tabBarHeight = useBottomTabBarHeight()

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMessage = {id: uuid.v4(), text: input, sender: 'user'}
        setMessages(prev => [...prev, userMessage])
        const userText = input
        setInput('')
        Keyboard.dismiss()
        setLoading(true)

        // Send message to FastAPI chat endpoint
        const replyText = await sendChatMessage(userText)

        if (replyText) {
            const botMessage = {id: uuid.v4(), text: replyText, sender: 'bot'}
            setMessages(prev => [...prev, botMessage])
        }

        setLoading(false)
    }

    useEffect(() => {
        flatListRef.current?.scrollToEnd({animated: true})
    }, [messages])

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={tabBarHeight + 60}
            >
                <View style={styles.container}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({item}) => <MessageBubble message={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.chatContainer}
                        keyboardShouldPersistTaps="handled"
                    />

                    {loading && (
                        <View style={{padding: 5, alignItems: 'center'}}>
                            <ActivityIndicator size="small" color="#e75a37"/>
                        </View>
                    )}

                    {/* Input container */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Chat with Ascent"
                            placeholderTextColor="#999"
                            value={input}
                            onChangeText={setInput}
                            returnKeyType="send"
                            onSubmitEditing={sendMessage}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Pressable onPress={sendMessage} style={styles.sendButton}>
                            <AntDesign name="send" size={24} color="#fff"/>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    safeArea: {
        flex: 1,
        backgroundColor: '#F6E9E2',
    },
    container: {
        flex: 1,
        backgroundColor: '#F6E9E2',
    },
    chatContainer: {padding: 10, flexGrow: 1, marginBottom: 40},
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#F6E9E2',
    },
    input: {
        flex: 1,
        height: 45,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#000',
    },
    sendButton: {
        marginLeft: 10,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#e75a37',
    },
})
