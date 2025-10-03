import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function Students() {
  const [expanded, setExpanded] = useState(null)
  const [marks, setMarks] = useState({})

  const students = [
    { id: "1", name: "Student 1" },
    { id: "2", name: "Student 2" },
    { id: "3", name: "Student 3" },
    { id: "4", name: "Student 4" }
  ]

  const subjects = ["English", "Hindi", "Maths", "Science", "SST"]

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  const updateMarks = (studentId, subject, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: value
      }
    }))
  }

  const generateReport = (studentId) => {
    const report = marks[studentId] || {}
    Alert.alert("Report", JSON.stringify(report, null, 2))
  }

  const renderStudent = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={styles.studentName}>{item.name}</Text>
        <Ionicons
          name={expanded === item.id ? "chevron-up" : "chevron-down"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {expanded === item.id && (
        <View style={styles.details}>
          <TouchableOpacity
            style={styles.reportBtn}
            onPress={() => generateReport(item.id)}
          >
            <Text style={styles.reportText}>generate report</Text>
          </TouchableOpacity>
          <View style={styles.subjectGrid}>
            {subjects.map((subj) => (
              <View key={subj} style={styles.subjectRow}>
                <Text style={styles.subjectLabel}>{subj}</Text>
                <TextInput
                  style={styles.marksInput}
                  placeholder="marks"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={marks[item.id]?.[subj] || ""}
                  onChangeText={(val) => updateMarks(item.id, subj, val)}
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudent}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

export default Students

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebe6",
    paddingTop: 20,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  studentName: {
    fontSize: 16,
    fontWeight: "500"
  },
  details: {
    marginTop: 15
  },
  reportBtn: {
    alignSelf: "flex-end",
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 15
  },
  reportText: {
    color: "white",
    fontSize: 12
  },
  subjectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  subjectRow: {
    width: "48%",
    marginBottom: 15
  },
  subjectLabel: {
    fontSize: 14,
    marginBottom: 5
  },
  marksInput: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 14
  }
})
