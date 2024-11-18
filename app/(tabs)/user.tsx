import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'

export default function UserPage() {
    const router = useRouter()

    const handleLogout = () => {
        router.replace('/login')
    }


    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}/>
            <Text style={styles.text}>Username/Name</Text>
            <Text style={styles.text}>Age:</Text>
            <Text style={styles.text}>Weight:</Text>
            <Text style={styles.text}>Height:</Text>
            <TouchableOpacity style={styles.logout} onPress={handleLogout} >Log Out</TouchableOpacity>
            <TouchableOpacity style={styles.editProfile}>Edit Profile</TouchableOpacity>
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    text: {
        color: '#000',
        fontSize: 20,
    },
    logout: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#4B88A2',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 25,
        padding: 10,
    },
    editProfile: {
        position: 'absolute',
        bottom: 100,
        backgroundColor: '#4B88A2',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 25,
        padding: 10,
    }
})