import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { getWorkouts } from '../../api';

export default function WorkoutLevelsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const fetchedWorkouts = await getWorkouts();
        const savedProgress = await AsyncStorage.getItem('workoutProgress');
        const signedInUser = await AsyncStorage.getItem('signedInUser');

        setProgress(savedProgress ? JSON.parse(savedProgress) : {});
        setUser(signedInUser ? JSON.parse(signedInUser) : null);

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

    const updatedProgress = { ...progress, [level]: { currentExerciseIndex: -1, completed: false } };
    let updatedUser = { ...user };

    if (user) {
      updatedUser = {
        ...user,
        xp: user.xp + 100, 
        level: user.level + 1, 
      };
    }

    try {
      await AsyncStorage.setItem('workoutProgress', JSON.stringify(updatedProgress));
      await AsyncStorage.setItem('signedInUser', JSON.stringify(updatedUser));

      setProgress(updatedProgress);
      setUser(updatedUser);
    } catch (error) {
      Alert.alert('Error', 'Failed to update progress');
    }
  };

  const getButtonText = (level) => {
    if (progress[level]?.completed) return 'Completed';
    if (progress[level]?.currentExerciseIndex >= 0) return 'Resume Workout';
    return 'Start Workout';
  };

  const handleWorkoutPress = (level) => {
    if (progress[level]?.completed) {
      Alert.alert('Already Completed', 'You have already completed this level.');
    } else {
      updateProgress(level);
      router.push(`/workouts/${level}`);
    }
  };

  const getBorderColor = (level, maxLevel) => {
    const percentage = (level - 1) / (maxLevel - 1);
    
    const red = Math.min(255, Math.floor(255 * percentage)); 
    const green = Math.max(0, Math.floor(255 * (1 - percentage))); 
    const blue = 0; 

    return `rgb(${red}, ${green}, ${blue})`; 
  };

  const maxLevel = Math.max(...workouts.map(workout => workout.level)); 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.levelsContainer}>
        {workouts.map((workout, index) => (
          <View
            key={index}
            style={[
              styles.levelCard,
              {
                borderColor: getBorderColor(workout.level, maxLevel),
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
    borderWidth: 7, 
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
