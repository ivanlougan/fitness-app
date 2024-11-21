import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserGoals } from '../../api'; 

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newGoal, setNewGoal] = useState('');

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

    const handleEditGoal = async () => {
        if (!newGoal.trim()) {
            Alert.alert('Error', 'Goal cannot be empty.');
            return;
        }

        try {
            const updatedUser = await updateUserGoals(user._id, newGoal);
            setUser(updatedUser);
            await AsyncStorage.setItem('signedInUser', JSON.stringify(updatedUser));
            Alert.alert('Success', 'Goal updated successfully!');
            setEditing(false);
            setNewGoal('');
        } catch (error) {
            Alert.alert('Error', 'Failed to update goal.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {user ? (
                <>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                        }}
                    />
                    <Text style={styles.text}>Name: {user.name}</Text>
                    <Text style={styles.text}>Age: {user.age}</Text>
                    <Text style={styles.text}>Weight: {user.weight}</Text>
                    <Text style={styles.text}>Height: {user.height}</Text>

                    <View style={styles.goalsSection}>
                        <Text style={styles.goalsHeader}>Goals:</Text>
                        {user.goals && user.goals.length > 0 ? (
                            user.goals.map((goal, index) => (
                                <Text key={index} style={styles.goalText}>
                                    {goal}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.goalText}>No goals set</Text>
                        )}

                        {editing && (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter a new goal"
                                    value={newGoal}
                                    onChangeText={setNewGoal}
                                />
                                <TouchableOpacity style={styles.saveButton} onPress={handleEditGoal}>
                                    <Text style={styles.saveButtonText}>Save Goal</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
                        <Text style={styles.editButtonText}>{editing ? 'Cancel' : 'Add a Goal'}</Text>
                    </TouchableOpacity>

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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
    },
    editButton: {
        backgroundColor: '#f0ad4e',
        padding: 10,
        borderRadius: 25,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#5cb85c',
        padding: 10,
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    logout: {
        backgroundColor: '#4B88A2',
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
