import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Header from '../components/Header';
import { getWorkouts } from '../../api';

export default function WorkoutLevelsPage() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await getWorkouts();
        if (Array.isArray(fetchedWorkouts)) {
          setWorkouts(fetchedWorkouts);
        } else {
          throw new Error('Workouts data is not an array');
        }
      } catch (error) {
        Alert.alert('Error', 'Could not load workout levels');
      }
    };
    fetchWorkouts();
  }, []);

  if (workouts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header title="FitnessApp" />
      <View style={styles.levelsContainer}>
        {workouts.map((workout, index) => (
          <View key={index} style={styles.levelCard}>
            <Text style={styles.levelTitle}>Level: {workout.level}</Text>
            <Link href={`/workouts/${workout.level}`} style={styles.link}>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.circularButton}>
                  <Text style={styles.buttonText}>Start Workout</Text>
                </TouchableOpacity>
              </View>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF9FB',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  levelsContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  levelCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%',
    maxWidth: 350,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  link: {
    width: '100%',
  },
  buttonWrapper: {
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  circularButton: {
    backgroundColor: '#4B88A2',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, 
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9FB',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B88A2',
  },
});
