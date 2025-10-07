import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function StudentReport() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Report</Text>
        
        <ScrollView>
          <Text style={styles.reportText}>
            <Text style={styles.bold}>Student 1:</Text>{"\n"}
            Student 1, Class 10, maintained 90.9% attendance in September 
            (20/22 days). In the recent exam, he scored 84.6% overall, 
            with top marks in English (92%) and Mathematics (85%). 
            Science and Social Studies need focus. Regular attendance 
            and consistent practice are recommended to achieve better 
            academic outcomes.
          </Text>
        </ScrollView>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f6f2", 
    borderRadius: 12,
    padding: 20,
    width: "85%",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  reportText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});