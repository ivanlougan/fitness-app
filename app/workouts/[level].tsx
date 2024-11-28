import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLevelExercises } from '../../api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import XpBar from "../components/XpBar.jsx";

export default function Exercises() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [xp, setXp] = useState(0);
  const [signedInUser, setSignedInUser] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  const REST_PERIOD_SECONDS = 20;

  useEffect(() => {
    AsyncStorage.getItem("signedInUser").then((user) => {
      if (user) {
        try {
          setSignedInUser(JSON.parse(user));
        } catch (error) {
          console.error("Failed to parse signed-in user data:", error);
        }
      }
    });
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const savedProgress = await AsyncStorage.getItem('workoutProgress');
        const progress = savedProgress ? JSON.parse(savedProgress) : {};

        if (progress[level]?.currentExerciseIndex >= 0) {
          setCurrentExerciseIndex(progress[level].currentExerciseIndex);
        }

        const data = await getLevelExercises(level);
        setExercises(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, [level]);

  useEffect(() => {
    if (isWorkoutStarted && exercises.length > 0 && currentExerciseIndex < exercises.length) {
      const currentExercise = exercises[currentExerciseIndex];
      setTimer(currentExercise.duration_in_seconds);
      setIsTimerActive(true);
      setIsResting(false);
    }
  }, [currentExerciseIndex, exercises, isWorkoutStarted]);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && isTimerActive) {
      if (isResting) {
        handleNextExercise();
      } else if (currentExerciseIndex === exercises.length - 1) {
        handleFinishWorkout();
      } else {
        startRestPeriod();
      }
    }
  }, [isTimerActive, timer]);

  const saveProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('workoutProgress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      progress[level] = { currentExerciseIndex, completed: false };
      await AsyncStorage.setItem('workoutProgress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const startRestPeriod = () => {
    setTimer(REST_PERIOD_SECONDS);
    setIsResting(true);
    setIsTimerActive(true);
  };

  const handleNextExercise = async () => {
    if (!isResting) {
      startRestPeriod();
    } else if (currentExerciseIndex < exercises.length - 1) {
      setXp((currentXp) => currentXp + exercises[currentExerciseIndex].xp);
      setCurrentExerciseIndex((prev) => prev + 1);
      await saveProgress();
    } else {
      setIsTimerActive(false);
    }
  };

  const handleFinishWorkout = async () => {
    try {
      const lastExerciseXP = exercises[currentExerciseIndex]?.xp || 0;
      const totalXpEarned = xp + lastExerciseXP;

      const savedProgress = await AsyncStorage.getItem('workoutProgress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      progress[level] = { currentExerciseIndex: -1, completed: true };
      await AsyncStorage.setItem('workoutProgress', JSON.stringify(progress));

      await AsyncStorage.setItem('workoutXp', JSON.stringify(totalXpEarned));

      router.push(`/results?xp=${totalXpEarned}&level=${level}`);
    } catch (error) {
      console.error('Failed to finish workout:', error);
    }
  };

  const handleStartWorkout = () => {
    setShowIntro(false);
    setIsWorkoutStarted(true);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4B88A2" />;
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.container}>
      {showIntro ? (
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Welcome to Level {level} Workout</Text>
          <Text style={styles.introText}>Here are the exercises you will do:</Text>
          {exercises.map((exercise, index) => (
            <Text key={index} style={styles.exerciseItem}>
              {exercise.name}: {exercise.duration_in_seconds} seconds (+{exercise.xp} XP)
            </Text>
          ))}
          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <XpBar xp={xp} />
          <Text style={styles.title}>
            {isResting
              ? 'Rest Period'
              : `Exercise ${currentExerciseIndex + 1} of ${exercises.length}`}
          </Text>
          <View style={styles.exerciseCard}>
            {isResting ? (
              <Text style={styles.restText}>Take a break!</Text>
            ) : (
              <>
                {/* Displaying the exercise image */}
                {currentExercise.image_url && (
                  <Image source={{ uri: currentExercise.image_url }} style={styles.exerciseImage} />
                )}
                <Text style={styles.exerciseName}>{currentExercise.name}</Text>
                <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
                <Text style={styles.exerciseDuration}>
                  Duration: {currentExercise.duration_in_seconds} seconds (+{currentExercise.xp} XP)
                </Text>
              </>
            )}
          </View>
          <Text style={styles.timer}>Time Remaining: {timer} seconds</Text>
          <View style={styles.buttonContainer}>
            {currentExerciseIndex < exercises.length - 1 || isResting ? (
              <TouchableOpacity style={styles.nextButton} onPress={handleNextExercise}>
                <Text style={styles.buttonText}>
                  {isResting ? 'Next Exercise' : 'Start Rest'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.finishButton} onPress={handleFinishWorkout}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
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
  introCard: {
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
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B88A2',
    marginBottom: 10,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  exerciseItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B88A2',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  exerciseDuration: {
    fontSize: 16,
    color: '#333',
  },
  exerciseImage: {
    width: 300, 
    height: undefined, 
    aspectRatio: 16 / 9, 
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: 'contain', 
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#4B88A2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  finishButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  restText: {
    fontSize: 24,
    color: '#FBB34B',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});


