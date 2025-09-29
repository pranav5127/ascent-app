import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    TextInput,
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import MessageBubble from '@/components/chatbot/message-bubble';
import AntDesign from '@expo/vector-icons/AntDesign';
import uuid from 'react-native-uuid';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        {id: uuid.v4(), text: 'Explain Chapter 10 of English?', sender: 'user'},
        {
            id: uuid.v4(),
            text: 'The Sermon at Benares summarizes the teachings of Lord Buddha, emphasizing that death is inevitable for all mortal beings.',
            sender: 'bot',
        },
    ]);

    const [input, setInput] = useState('');
    const flatListRef = useRef(null);
    const tabBarHeight = useBottomTabBarHeight();

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage = {id: uuid.v4(), text: input, sender: 'user'};
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        Keyboard.dismiss();
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({animated: true});
    }, [messages]);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({item}) => <MessageBubble message={item}/>}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.chatContainer}
                keyboardShouldPersistTaps="handled"
            />

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
                />
                <Pressable onPress={sendMessage} style={styles.sendButton}>
                    <AntDesign name="send" size={24} color="#fff"/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    container: {flex: 1, backgroundColor: '#F6E9E2'},
    chatContainer: {padding: 10, flexGrow: 1, justifyContent: 'flex-end'},
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
    },
    sendButton: {
        marginLeft: 10,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#e75a37',
    },
});
