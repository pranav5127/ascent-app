import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";

const contentItems = [
  { id: "1", title: "Books" },
  { id: "2", title: "Notes" },
  { id: "3", title: "Assignment" },
];

export default function SharedContentScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg" }}
        style={styles.cardImage}
      />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Subject Title */}
      <Text style={styles.subjectTitle}>English</Text>

      {/* List */}
      <FlatList
        data={contentItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5efed",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  subjectTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardText: {
    padding: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});