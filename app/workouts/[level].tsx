import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getLevelExercises } from '../../api'
import { useRouter } from 'expo-router'

export default function Exercises() {


    return (
        <View style={styles.container}>
            <Text>Exercises</Text>
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
