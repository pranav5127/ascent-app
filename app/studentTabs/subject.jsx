import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";

const subjects = [
  { id: "1", name: "Maths" },
  { id: "2", name: "English" },
  { id: "3", name: "Science" },
];

export default function SubjectsScreen() {
  const renderSubjectCard = ({ item }) => (
    <View style={styles.subjectCard}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg" }}
        style={styles.subjectImage}
      />
      <Text style={styles.subjectName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>


      {/* Join Class Button */}
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join Class</Text>
      </TouchableOpacity>

      {/* Subject List */}
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={renderSubjectCard}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  joinButton: {
    backgroundColor: "black",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  joinButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  subjectCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  subjectImage: {
    width: "100%",
    height: 120,
  },
  subjectName: {
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});