import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { getWorkouts } from '../../api'; 

export default function WorkoutLevelsPage() {
  const [workouts, setWorkouts] = useState([]);
  const router = useRouter();

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
            <Button
              title="Start Workout"
              onPress={() =>
                router.push(`/workouts/${workout.level}`) 
              }
            />
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
  },
  levelCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
