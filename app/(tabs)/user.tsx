import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}> 
            {user ? (
                <>
                    <Image style={styles.avatar} source={{ uri: user.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} />
                    <Text style={styles.text}>Name: {user.name}</Text>
                    <Text style={styles.text}>Age: {user.age}</Text>
                    <Text style={styles.text}>Weight: {user.weight}</Text>
                    <Text style={styles.text}>Height: {user.height}</Text>

                    <View style={styles.goalsSection}>
                        <Text style={styles.goalsHeader}>Goals:</Text>
                        {user.goals && user.goals.length > 0 ? (
                            user.goals.map((goal, index) => (
                                <Text key={index} style={styles.goalText}>{goal}</Text>
                            ))
                        ) : (
                            <Text style={styles.goalText}>No goals set</Text>
                        )}
                    </View>

                    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Loading user information...</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,  
        backgroundColor: '#FFF9FB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
        marginBottom: 10,
    },
    goalsSection: {
        marginTop: 20,
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
    },
    goalsHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4B88A2',
        marginBottom: 10,
    },
    goalText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 5,
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
