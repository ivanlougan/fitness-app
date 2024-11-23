import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getLevelExercises } from '../../api'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function Exercises() {
const {level} = useLocalSearchParams()
const [exercises, setExercises] = useState([])
const [error, setError] = useState("")
const [isLoading, setIsLoading] = useState(true)
console.log(level)
useEffect(() => {
    setIsLoading(true)
    getLevelExercises(level).then((exercises) => {
        setIsLoading(false)
        setExercises(exercises)
    }).catch((err) => {
        setIsLoading(false)
        setError("Error fetching exercises")
    })
}, [])

    return (
        <View style={styles.container}>
            {exercises.map((exercise) => {
                return (<div key={`${exercise._id}-container`}>
                    <p key={`${exercise._id}-name`}>{exercise.name}</p>
                    <p key={`${exercise._id}-description`}>{exercise.description}</p>
                    <p key={`${exercise._id}-duration`}>{exercise.duration_in_seconds} seconds</p>
                    <p key={`${exercise._id}-xp`}>+{exercise.xp} XP</p>
                </div>)
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
