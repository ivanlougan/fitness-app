import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getWorkoutLevels } from '../../api';

export default function WorkoutExercises() {
    const router = useRouter();
    const { query } = router;
    const level = query?.level;

    const [workout, setWorkout] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (level) {
            getWorkoutLevels(level)
                .then((data) => {
                    setWorkout(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    }, [level]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!workout) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No workout found for level {level}.</Text>
            </View>
        );
    }

    const currentExercise = workout.exercises[currentExerciseIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workout Level {level}</Text>
            <Text style={styles.exerciseName}>{currentExercise.name}</Text>
            <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
            <Text style={styles.exerciseDetails}>
                {currentExercise.type} | {currentExercise.target_muscle_group}
            </Text>
            <Text style={styles.exerciseDuration}>Duration: {currentExercise.duration_in_seconds}s</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, currentExerciseIndex === 0 && styles.disabledButton]}
                    disabled={currentExerciseIndex === 0}
                    onPress={() => setCurrentExerciseIndex((prev) => prev - 1)}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        currentExerciseIndex === workout.exercises.length - 1 && styles.disabledButton,
                    ]}
                    disabled={currentExerciseIndex === workout.exercises.length - 1}
                    onPress={() => setCurrentExerciseIndex((prev) => prev + 1)}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    exerciseDescription: {
        fontSize: 16,
        marginVertical: 10,
    },
    exerciseDetails: {
        fontSize: 14,
        color: '#777',
    },
    exerciseDuration: {
        fontSize: 16,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#C1C1C1',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#E57373',
    },
});

