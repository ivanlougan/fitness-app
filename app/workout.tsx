import { Text, View, StyleSheet } from 'react-native';

export default function WorkoutPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Workout</Text>
        </View>
    )
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
    }
})