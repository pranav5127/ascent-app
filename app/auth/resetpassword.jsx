import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";

export default function ResetPasswordScreen() {
  return (
      <LinearGradient
          colors={["#DE7017", "#EAAC72"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 0.9 }}
          style={styles.container}
      >
      {/* Top Back Button */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </View>

      {/* Card Box */}
      <View style={styles.card}>
        <Text style={styles.title}>Reset{"\n"}Password</Text>

        {/* Email Input */}
        <TextInput
          placeholder="Enter your registered Email"
          placeholderTextColor="#777"
          style={styles.input}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E97721", // Orange background
    paddingTop: 40,
  },
  header: {
    marginLeft: 15,
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
