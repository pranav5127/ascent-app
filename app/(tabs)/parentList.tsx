import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Animated } from "react-native"
import { useState, useEffect, useRef } from "react"

const URL = "http://192.168.1.34:9900/users/"

// Collapsible item component
const Item = ({ item }: {item: any}) => {
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        const initialValue = expanded ? 1 : 0
        const finalValue = expanded ? 0 : 1

        setExpanded(!expanded);
        animation.setValue(initialValue);
        Animated.timing(animation, {
            toValue: finalValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
    });

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.headerText}>{item.email}</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.content, { height }]}>
                {expanded && (
                    <View>
                        <Text style={styles.detail}>Role: {item.role}</Text>
                        <Text style={styles.detail}>External ID: {item.external_id}</Text>
                        <Text style={styles.detail}>Created: {item.created_at}</Text>
                        <Text style={styles.detail}>Updated: {item.updated_at}</Text>
                        <Button title="Add Student" onPress={() => alert(`Add student for ${item.email}`)} />
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

export default function ParentList() {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    const parentList = async () => {
        try {
            setLoading(true);
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            setResponse(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert("Something went wrong" + error);
        }
    };

    useEffect(() => {
        parentList()
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={response}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item: any) => item.id}
                    />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        padding: 10,
    },
    itemContainer: {
        marginBottom: 10,
        backgroundColor: "#333",
        borderRadius: 8,
        overflow: "hidden",
    },
    header: {
        padding: 10,
        backgroundColor: "#444",
    },
    headerText: {
        color: "#fff",
        fontSize: 16,
    },
    content: {
        overflow: "hidden",
        backgroundColor: "#555",
        paddingHorizontal: 10,
    },
    detail: {
        color: "#ddd",
        fontSize: 14,
        marginVertical: 2,
    },
});
