import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MenuPage() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <Link href="/bmi" style={[styles.button, styles.bmiButton]}>
                    <Ionicons name="body" size={60} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>BMI</Text>
                </Link>
            </View>
            <View style={styles.row}>
                <Link href="/calorie-tracker" style={[styles.button, styles.calButton]}>
                    <Ionicons name="fast-food-outline" size={60} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Calorie Tracker</Text>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFF9FB',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 50,
    },
    row: {
        width: '160%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '50%',
        aspectRatio: 1,
        marginTop: 20,
    },
    bmiButton: {
        backgroundColor: '#4B88A2',
    },
    calButton: {
        backgroundColor: '#4B88A2',
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
