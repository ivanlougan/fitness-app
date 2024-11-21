import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Header from '../components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Header title="FitnessApp" /> 

            <View style={styles.content}>
                <View style={styles.section}>
                    <Ionicons name="stats-chart" size={40} color="#4CAF50" />
                    <Text style={styles.text}>Progress</Text>
                    <Link href="/progress" style={styles.link}>View Progress</Link>
                    <View style={styles.traceLine} />
                </View>

                <View style={styles.section}>
                    <Ionicons name="barbell" size={40} color="#FF9800" />
                    <Text style={styles.text}>Today's Workout</Text>
                    <Link href="/workout" style={styles.link}>Start Workout</Link>
                    <View style={styles.traceLine} />
                </View>

                <View style={styles.section}>
                    <Ionicons name="calendar" size={40} color="#2196F3" />
                    <Text style={styles.text}>Tomorrow's Workout</Text>
                    <Link href="/plan" style={styles.link}>View exercises</Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9FB',
        paddingTop: 50,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 110,
        marginBottom: 50,
    },
    section: {
        alignItems: 'center',
        marginBottom: 65,
        position: 'relative',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#252627',
        marginTop: 10,
    },
    link: {
        fontSize: 16,
        color: '#4B88A2',
        textDecorationLine: 'underline',
        marginTop: 5,
    },
    traceLine: {
        width: 2,
        height: 50,
        backgroundColor: '#D3D4D9',
        position: 'absolute',
        top: '100%', 
        transform: [{ translateY: 10 }], 
    },
});

