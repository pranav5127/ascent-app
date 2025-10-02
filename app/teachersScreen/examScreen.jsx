import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Helper component for exam cards
const ExamCard = ({ title, dates, imageUrl }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.9}>
    <Image 
      source={{ uri: imageUrl }} 
      style={styles.cardImage} 
      resizeMode="cover" 
    />
    <View style={styles.cardOverlay}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDates}>{dates}</Text>
    </View>
  </TouchableOpacity>
);

const ExamScreen = () => {
  // Mock data for the exam list
  const exams = [
    { id: '1', title: 'Mid sem', dates: '26 sep - 30 sep', img: 'https://placehold.co/400x150/F5E6E0/333333?text=Books' },
    { id: '2', title: 'Unit test', dates: '1 sep- 4 sep', img: 'https://placehold.co/400x150/F5E6E0/333333?text=Books' },
    { id: '3', title: 'Pre boards', dates: '15 jan - 20 jan', img: 'https://placehold.co/400x150/F5E6E0/333333?text=Books' },
  ];

  const handleCreate = () => console.log('Create Exam tapped');

  return (
    <View style={styles.container}>
      
      {/* Create Exam Button */}
      <TouchableOpacity style={styles.createBtn} onPress={handleCreate} activeOpacity={0.8}>
        <Text style={styles.createBtnText}>create exam</Text>
      </TouchableOpacity>

      {/* Exam List */}
      {exams.map(exam => (
        <ExamCard 
          key={exam.id}
          title={exam.title}
          dates={exam.dates}
          imageUrl={exam.img}
        />
      ))}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', 
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  
  // Create Exam Button
  createBtn: {
    backgroundColor: '#404040',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'lowercase',
  },

  // Exam Card Styles
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
    height: 120, // Image occupies the top part
  },
  cardOverlay: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF', // White background for text area
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  cardDates: {
    fontSize: 14,
    fontWeight: '400',
    color: '#777777',
  },
});

export default ExamScreen;
