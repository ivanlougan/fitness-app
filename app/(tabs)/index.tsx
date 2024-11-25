import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Use this for navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { getWorkouts } from '../../api';

export default function WorkoutLevelsPage() {
  const [workouts, setWorkouts] = useState([]);
  const router = useRouter(); // Initialize the router
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await getWorkouts();
        const savedProgress = await AsyncStorage.getItem('workoutProgress');
        setProgress(savedProgress ? JSON.parse(savedProgress) : {}); 
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

  const getButtonText = (level) => {
    if (progress[level]?.completed) return 'Completed';
    if (progress[level]?.currentExerciseIndex >= 0) return 'Resume Workout';
    return 'Start Workout';
  };

  const handleWorkoutPress = (level) => {
    router.push(`/workouts/${level}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header title="FitnessApp" />
      <View style={styles.levelsContainer}>
        {workouts.map((workout, index) => (
          <View key={index} style={styles.levelCard}>
            <Text style={styles.levelTitle}>Level: {workout.level}</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[
                  styles.circularButton,
                  progress[workout.level]?.completed && styles.disabledButton,
                ]}
                onPress={() => handleWorkoutPress(workout.level)}
                disabled={progress[workout.level]?.completed}
              >
                <Text style={styles.buttonText}>{getButtonText(workout.level)}</Text>
              </TouchableOpacity>
            </View>
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
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  circularButton: {
    backgroundColor: '#4B88A2',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
