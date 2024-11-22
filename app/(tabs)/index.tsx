import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
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
    return <Text style={styles.loading}>Loading...</Text>;
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
                <Button title="Start Workout" />
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
  },
  levelsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  levelCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

