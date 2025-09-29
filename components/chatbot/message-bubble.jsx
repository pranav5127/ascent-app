import { View, Text, StyleSheet } from 'react-native'

const MessageBubble = ({ message }) => {
    const isUser = message.sender === "user"

    return (
        <View style={[
            styles.message,
            isUser ? styles.userMessage : styles.botMessage
        ]}>
            <Text style={styles.messageText}>{message.text}</Text>
        </View>
    )
}

export default MessageBubble

const styles = StyleSheet.create({
    message: {
        maxWidth: "80%",
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
    },
    userMessage: {
        backgroundColor: "#D8C0B3",
        alignSelf: "flex-end",
    },
    botMessage: {
        backgroundColor: "#E1C9BD",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#444445",
        fontSize: 18,
    }
})
