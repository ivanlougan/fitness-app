import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router'; 
import { getWorkouts } from '../api'; 

export default function WorkoutLevels() {
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWorkouts()
            .then((fetchedWorkouts) => {
                const availableLevels = fetchedWorkouts.map(workout => workout.level); 
                setLevels(availableLevels); 
            })
            .catch((error) => {
                console.error("Error fetching workouts:", error.message);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, []); 

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!levels.length) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No workout levels found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Workout Level</Text>
            {levels.map((level) => (
                <Link
                    key={level} 
                    href={`/workouts/${level}`} 
                    style={styles.levelButton} 
                >
                    <Text style={styles.levelText}>Level {level}</Text>
                </Link>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF9FB',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    levelButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    levelText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
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


