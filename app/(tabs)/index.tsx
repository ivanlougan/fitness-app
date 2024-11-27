import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWorkouts } from '../../api';
import XpBar from '../components/XpBar';

export default function WorkoutLevelsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await getWorkouts();
        const signedInUser = await AsyncStorage.getItem('signedInUser');
        const savedProgress = await AsyncStorage.getItem('workoutProgress');

        if (!signedInUser) {
          Alert.alert('Error', 'No user is signed in.');
          return;
        }

        const user = JSON.parse(signedInUser);
        setUser(user);

        const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};

        const updatedProgress = {};

        fetchedWorkouts.forEach((workout) => {
          if (workout.level <= user.level) {
            updatedProgress[workout.level] = { completed: true };
          } else {
            updatedProgress[workout.level] = { completed: false };
          }
        });

        setProgress(updatedProgress);

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

  const updateProgress = async (level) => {
    if (progress[level]?.completed) return;

    const updatedProgress = {
      ...progress,
      [level]: { currentExerciseIndex: -1, completed: false },
    };

    try {
      await AsyncStorage.setItem('workoutProgress', JSON.stringify(updatedProgress));
      setProgress(updatedProgress);
    } catch (error) {
      Alert.alert('Error', 'Failed to update progress');
    }
  };

  const handleWorkoutPress = (level) => {
    if (!user) return;

    if (level > user.level) {
      Alert.alert('Locked', 'Complete previous levels to unlock this workout.');
      return;
    }

    if (progress[level]?.completed) {
      Alert.alert('Already Completed', 'You have already completed this level.');
    } else {
      updateProgress(level);
      router.push(`/workouts/${level}`);
    }
  };

  const getButtonText = (level) => {
    if (progress[level]?.completed) return 'Completed';
    if (level <= user.level) return 'Start Workout';
    return 'Locked';
  };

  const getBackgroundColor = (level, maxLevel) => {
    const percentage = (level - 1) / (maxLevel - 1);
    const red = Math.min(255, Math.floor(255 * percentage));
    const green = Math.max(0, Math.floor(255 * (1 - percentage)));
    const blue = 0;

    return `rgba(${red}, ${green}, ${blue}, 0.7)`;
  };

  const maxLevel = workouts.length > 0 ? Math.max(...workouts.map(workout => workout.level)) : 1;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <XpBar />
      <View style={styles.levelsContainer}>
        {workouts.map((workout, index) => (
          <View
            key={index}
            style={[
              styles.levelCard,
              {
                backgroundColor: getBackgroundColor(workout.level, maxLevel),
              },
            ]}
          >
            <Text style={styles.levelTitle}>Level: {workout.level}</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[
                  styles.circularButton,
                  progress[workout.level]?.completed && styles.disabledButton,
                ]}
                onPress={() => handleWorkoutPress(workout.level)}
                disabled={progress[workout.level]?.completed || workout.level > user.level}
              >
                <Text style={styles.buttonText}>{getButtonText(workout.level)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={[styles.levelCard, styles.noMoreWorkoutsCard]}>
          <Text style={styles.noMoreWorkoutsText}>
            No more workouts available. Wait for the next update!
          </Text>
        </View>
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
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  noMoreWorkoutsCard: {
    backgroundColor: '#FFD700',
    paddingVertical: 30,
  },
  noMoreWorkoutsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
