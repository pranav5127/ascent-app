import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function AttendanceScreen() {
  const [attendance, setAttendance] = useState([
    { id: "1", name: "Student 1", present: null },
    { id: "2", name: "Student 2", present: null },
    { id: "3", name: "Student 3", present: null }
  ])

  const markAttendance = (id, status) => {
    setAttendance(prev =>
      prev.map(item =>
        item.id === id ? { ...item, present: status } : item
      )
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.studentRow}>
      <Text style={styles.studentName}>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => markAttendance(item.id, true)}>
          <Ionicons
            name="checkmark"
            size={22}
            color={item.present === true ? "green" : "#555"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => markAttendance(item.id, false)}>
          <Ionicons
            name="close"
            size={22}
            color={item.present === false ? "red" : "#555"}
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.date}>date: 26 sep 2025</Text>
      <FlatList
        data={attendance}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  )
}

export default AttendanceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3ebe6",
    paddingTop: 20,
    paddingHorizontal: 20
  },
  date: {
    fontSize: 16,
    marginBottom: 20
  },
  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },
  studentName: {
    fontSize: 16
  },
  actions: {
    flexDirection: "row",
    gap: 15
  }
})
