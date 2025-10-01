import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function JoinClass() {
  const [classCode, setClassCode] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join Class</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Class Code"
          placeholderTextColor="#888"
          value={classCode}
          onChangeText={setClassCode}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080", // grey background
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "linear-gradient(45deg, #e74c3c, #c0392b)", // fallback red
    backgroundColor: "#e74c3c", // since RN doesn't support linear-gradient directly
    borderRadius: 15,
    width: "85%",
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});