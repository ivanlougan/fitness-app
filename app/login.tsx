import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function LoginPage() {
    const router = useRouter()

    const handleUserSelection = () => {
        router.replace('/')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select User</Text>
            <TouchableOpacity style={styles.button} onPress={handleUserSelection}>
                <Text>User 1</Text>
            </TouchableOpacity>
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
    header: {
        position: 'absolute',
        top: '25%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#D3D4D9',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    }
})