import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { getLevelExercises } from '../../api';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useRouter

export default function Exercises() {
  const { level } = useLocalSearchParams();
  const router = useRouter(); // Initialize the router
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLevelExercises(level)
      .then((exercisesData) => {
        setIsLoading(false);
        setExercises(exercisesData);
      })
      .catch(() => {
        setIsLoading(false);
        setError('Error fetching exercises');
      });
  }, [level]);

  const totalDuration = exercises.reduce((acc, exercise) => acc + exercise.duration_in_seconds, 0);

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handleStartWorkout = () => {
    setWorkoutStarted(true);
  };

  const handleFinishWorkout = () => {
    router.push('/results');
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4B88A2" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!workoutStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Workout Overview</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Total Duration: {totalDuration} seconds</Text>
          <Text style={styles.summaryText}>Exercises:</Text>
          <FlatList
            data={exercises}
            keyExtractor={(item, index) => String(item.id) + String(index)}
            renderItem={({ item }) => (
              <Text style={styles.exerciseItem}>{item.name}</Text>
            )}
          />
          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise {currentExerciseIndex + 1} of {exercises.length}</Text>
      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
        <Text style={styles.exerciseDuration}>
          Duration: {currentExercise.duration_in_seconds} seconds
        </Text>
        <Text style={styles.exerciseXP}>+{currentExercise.xp} XP</Text>
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
