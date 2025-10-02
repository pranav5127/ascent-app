import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Helper component for class cards
const ClassCard = ({ classTitle, studentCount, imageUrl }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <Image 
      source={{ uri: imageUrl }} 
      style={styles.cardImage} 
      resizeMode="cover" 
    />
    <View style={styles.cardOverlay}>
      <View>
        <Text style={styles.cardTitle}>{classTitle}</Text>
        <Text style={styles.cardStudents}>{studentCount} students</Text>
      </View>
      <View style={styles.perfTag}>
        <Text style={styles.perfText}>class performance</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ClassScreen = () => {
  // Mock data to populate the list
  const classes = [
    { id: '1', title: 'Class 10', count: 10, img: 'https://placehold.co/400x200/F5E6E0/333333?text=Books' }, // Used a neutral placeholder
    { id: '2', title: 'Class 9', count: 20, img: 'https://placehold.co/400x200/F5E6E0/333333?text=Books' },
    { id: '3', title: 'Class 8', count: 25, img: 'https://placehold.co/400x200/F5E6E0/333333?text=Books' },
  ];

  const handleCreate = () => console.log('Create Class tapped');

  return (
    <View style={styles.container}>
      
      {/* Create Class Button */}
      <TouchableOpacity style={styles.createBtn} onPress={handleCreate} activeOpacity={0.8}>
        <Text style={styles.createBtnText}>Create Class</Text>
      </TouchableOpacity>

      {/* Your Classes Title */}
      <Text style={styles.sectionTitle}>Your Classes</Text>

      {/* Class List */}
      {classes.map(cls => (
        <ClassCard 
          key={cls.id}
          classTitle={cls.title}
          studentCount={cls.count}
          imageUrl={cls.img}
        />
      ))}
      
      <View style={{ height: 40 }} /> {/* Spacer for visual padding */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Soft beige/light gray background from the image
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  
  // Create Class Button
  createBtn: {
    backgroundColor: '#333333',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },

  // Class Card Styles
  card: {
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject, // Fill the entire card
    opacity: 0.9,
  },
  cardOverlay: {
    flex: 1,
    padding: 16,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slight dark overlay for text contrast
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardStudents: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EEEEEE',
  },

  // Performance Tag
  perfTag: {
    alignSelf: 'flex-end',
    backgroundColor: '#333333',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  perfText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default ClassScreen;
