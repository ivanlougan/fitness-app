import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import XpBar from './components/XpBar.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function ResultPage() {
    const router = useRouter();
    const {xp} = useLocalSearchParams()
    

    const handleFinish = () => {
        router.push('/'); 
    };


    return (
        <View style={styles.container}>
            <XpBar xp={xp}/>
            <Text style={styles.title}>Results:</Text>
            <Text style={styles.text}>XP gained: 100XP</Text>
            <Text style={styles.text}>Calories burnt: 100</Text>
            <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.buttonText}>Share results</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000',
        fontSize: 20,
        marginBottom: 10,
    },
    title: {
        color: '#252627',
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4B88A2',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
    },
    shareButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
