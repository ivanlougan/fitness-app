import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserFromStorage = async () => {
            try {
                const signedInUser = await AsyncStorage.getItem('signedInUser');
                if (signedInUser) {
                    setUser(JSON.parse(signedInUser)); 
                } else {
                    router.replace('/login');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        getUserFromStorage();
    }, [router]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('signedInUser');
            router.replace('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Image style={styles.avatar} source={{ uri: user.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} />
                    <Text style={styles.text}>Name: {user.name}</Text>
                    <Text style={styles.text}>Age: {user.age}</Text>
                    <Text style={styles.text}>Weight: {user.weight}</Text>
                    <Text style={styles.text}>Height: {user.height}</Text>
                    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log Out</Text> 
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Loading user information...</Text>
            )}
        </View>
    );
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
        marginBottom: 10,
    },
    text: {
        color: '#000',
        fontSize: 20,
    },
    logout: {
        backgroundColor: '#4B88A2',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 25,
        padding: 10,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

