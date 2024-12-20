import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkUserLoginStatus = async () => {
            try {
                const signedInUser = await AsyncStorage.getItem('signedInUser');
                setIsLoggedIn(!!signedInUser); 
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkUserLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn === false) {
            router.replace('/login');
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn === null) {
        return <Text>Loading...</Text>;
    }

    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ title: 'User Page' }} />
            <Stack.Screen name="bmi" options={{ title: "" }} />
            <Stack.Screen name="calorie-tracker" options={{ title: "" }} />
            <Stack.Screen name="workouts/[level]" options={{ title: "" }} />
        </Stack>
    );
}

