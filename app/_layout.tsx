import React from 'react'
import { Stack } from 'expo-router'
import { useRouter } from 'expo-router'

export default function RootLayout() {
    const router = useRouter()
    const isLoggedIn = false

    React.useEffect(() => {
        if(!isLoggedIn) {
            router.replace('/login')
        }
    }, [isLoggedIn, router])

    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }}/>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="results" options={{title: 'Results page' }} />
            <Stack.Screen name="workout" options={{title: 'Workout page' }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )    
}