import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function MenuPage() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Link href="/bmi" style={[styles.button, styles.bmiButton]}>
                    <Text style={styles.buttonText}>BMI</Text>
                </Link>
                <Link href="/calorie-tracker" style={[styles.button, styles.calButton]}>
                    <Text style={styles.buttonText}>Calorie Tracker</Text>
                </Link>
            </View>
            <Link href="/progress" style={[styles.button, styles.progressButton]}>
                <Text style={styles.buttonText}>Progress</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9FB',
        padding: 20,
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5, 
    },
    button: {
        justifyContent: 'center', 
        alignItems: 'center',  
        borderRadius: 15,
    },
    bmiButton: {
        backgroundColor: '#4B88A2',
        width: '48%',
        aspectRatio: 1, 
    },
    calButton: {
        backgroundColor: '#4B88A2',
        width: '48%',
        aspectRatio: 1, 
    },
    progressButton: {
        backgroundColor: '#4B88A2',
        width: '100%',
        height: '25%', 
        marginTop: 10, 
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10
    },
});
