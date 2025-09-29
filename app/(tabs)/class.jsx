import {Text, StyleSheet} from "react-native"

function Class() {

    return(
        <Text style={styles.text}>
            Class Screen
        </Text>
    )
}

export default Class
const styles = StyleSheet.create({
    text: {
        padding: 20,
        color: "#fff"
    }
})