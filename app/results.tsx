import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function ResultPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Results:</Text>
            <Text style={styles.text}>XP gained: 100XP</Text>
            <Text style={styles.text}>Calories burnt: 100</Text>
            <TouchableOpacity style={styles.shareButton}>Share results</TouchableOpacity>
            <TouchableOpacity style={styles.button}>Finish</TouchableOpacity>
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
        fontSize: 20
    },
    title: {
        color: '#252627',
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: '#4B88A2',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    shareButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})