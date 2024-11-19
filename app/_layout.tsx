import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const signedInUser = localStorage.getItem('signedInUser');
        setIsLoggedIn(!!signedInUser); 
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login'); 
        }
    }, [isLoggedIn, router]);

    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ title: 'User Page' }} />
        </Stack>
    );
}
