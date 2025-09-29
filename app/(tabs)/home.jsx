import {Text, StyleSheet} from "react-native"

function Home() {

    return(
        <Text style={styles.text}>
            Home Screen
        </Text>
    )
}
export default Home

const styles = StyleSheet.create({
    text: {
        padding: 20,
        color: "#fff"
    }
})