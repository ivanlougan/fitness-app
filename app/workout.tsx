import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { getWorkouts } from '../api';

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true); 
        const fetchedWorkouts = await getWorkouts();

        if (Array.isArray(fetchedWorkouts)) {
          setWorkouts(fetchedWorkouts);  
        } else {
          throw new Error('Workouts data is not an array');
        }
      } catch (error) {
        Alert.alert('Error', 'Could not load workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const finishExercise = () => {
    const workout = workouts[currentWorkoutIndex];
    
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1); 
    } else if (currentWorkoutIndex < workouts.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1); 
      setCurrentExerciseIndex(0); 
    } else {
      console.log("All exercises and workouts are finished!");
      Alert.alert('Finished', 'You have completed all exercises and workouts.');
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1); 
    } else if (currentWorkoutIndex > 0) {
      setCurrentWorkoutIndex(currentWorkoutIndex - 1); 
      const prevWorkout = workouts[currentWorkoutIndex - 1];
      setCurrentExerciseIndex(prevWorkout.exercises.length - 1); 
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const workout = workouts[currentWorkoutIndex];
  const exercise = workout?.exercises?.[currentExerciseIndex];

  if (!exercise) {
    return <Text>No exercises available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.workoutLevel}>Workout Level: {workout.level}</Text>
      <Text style={styles.exerciseName}>Exercise: {exercise.name}</Text>
      <Text style={styles.description}>Description: {exercise.description}</Text>
      <Text style={styles.duration}>Duration: {exercise.duration_in_seconds} seconds</Text>
      <Text style={styles.xp}>XP: {exercise.xp} points</Text>

      <View style={styles.buttonContainer}>
        {currentExerciseIndex > 0 || currentWorkoutIndex > 0 ? (
          <Button title="Previous Exercise" onPress={previousExercise} />
        ) : null}
        <Button title="Finish Exercise" onPress={finishExercise} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  workoutLevel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseName: {
    fontSize: 16,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  duration: {
    fontSize: 14,
    marginBottom: 20,
  },
  xp: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default WorkoutPage;

