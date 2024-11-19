import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function MenuPage() {
    return (
        <View style={styles.container}>
            <Link href="/bmi" style={styles.bmiButton}>
                <Text style={styles.buttonText}>BMI</Text>
            </Link>

            <Link href="/calorie-tracker" style={styles.calButton}>
                <Text style={styles.buttonText}>Calorie Tracker</Text>
            </Link>

            <Link href="/progess" style={styles.progressButton}>
                <Text style={styles.buttonText}>Progress</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9FB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    text: {
        color: '#000',
        fontSize: 24,
        marginBottom: 20
    },
    bmiButton: {
        backgroundColor: '#4B88A2',
        position: 'absolute',
        top: 20,
        left: 20,
        width: '45%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        textAlign: 'center'
    },
    calButton: {
        backgroundColor: '#4B88A2',
        position: 'absolute',
        top: 20,
        right: 20,
        width: '45%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        textAlign: 'center'
    },
    progressButton: {
        backgroundColor: '#4B88A2',
        top: -60,
        left: 0,
        right: 0,
        width: '100%',
        height: '25%',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
