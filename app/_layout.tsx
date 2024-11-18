import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="results" options={{title: 'Results page' }} />
            <Stack.Screen name="workout" options={{title: 'Workout page' }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )    
}