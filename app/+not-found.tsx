import { View, StyleSheet } from 'react-native'
import { Link, Stack } from 'expo-router'

export default function NotFound() {
    return (
        <>
        <Stack.Screen options={{ title: '404 - Not Found' }}/>
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    Back to Home
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 20
    }
})