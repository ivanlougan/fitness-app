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
        color: '#000',
        fontSize: 30,
        marginBottom: 20
    },
    button:{
        backgroundColor: '#D3D4D9',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        color: '#000',
        fontSize: 20
    },
    shareButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 2,
        color: '#000',
    }
})