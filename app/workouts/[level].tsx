import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getLevelExercises } from '../../api';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Exercises() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      const savedProgress = await AsyncStorage.getItem('workoutProgress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {};

      if (progress[level]?.currentExerciseIndex >= 0) {
        setCurrentExerciseIndex(progress[level].currentExerciseIndex);
      }

      getLevelExercises(level)
        .then((data) => {
          setExercises(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };
    fetchExercises();
  }, [level]);

  const saveProgress = async (completed = false) => {
    const savedProgress = await AsyncStorage.getItem('workoutProgress');
    const progress = savedProgress ? JSON.parse(savedProgress) : {};
    progress[level] = { currentExerciseIndex, completed };
    await AsyncStorage.setItem('workoutProgress', JSON.stringify(progress));
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => {
        const newIndex = prev + 1;
        saveProgress();
        return newIndex;
      });
    }
  };

  const handleFinishWorkout = async () => {
    await saveProgress(true); 
    router.push('/results');
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4B88A2" />;
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise {currentExerciseIndex + 1} of {exercises.length}</Text>
      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
        <Text style={styles.exerciseDuration}>Duration: {currentExercise.duration_in_seconds} seconds</Text>
      </View>
      <View style={styles.buttonContainer}>
        {currentExerciseIndex < exercises.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishWorkout}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#FFF9FB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B88A2',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryCard: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    width: '90%',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  exerciseItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  startButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  exerciseCard: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    width: '90%',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  exerciseDuration: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  exerciseXP: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
