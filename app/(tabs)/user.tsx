import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addGoal, deleteGoal, getUsers } from '../../api';
import { Ionicons } from 'react-native-vector-icons'; 
import XpBar from '../components/XpBar';

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newGoal, setNewGoal] = useState('');
    const [editingGoalIndex, setEditingGoalIndex] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
    const [newImageUrl, setNewImageUrl] = useState(''); 

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

    const handleSaveGoal = async () => {
        if (!newGoal.trim()) {
            Alert.alert('Error', 'Goal cannot be empty.');
            return;
        }

        try {
            if (editingGoalIndex !== null) {
                const oldGoal = user.goals[editingGoalIndex];
                await deleteGoal(user._id, oldGoal); 
                await addGoal(user._id, newGoal); 
            } else {
                await addGoal(user._id, newGoal);
            }

            const updatedUser = (await getUsers()).find(u => u._id === user._id);
            setUser(updatedUser);
            await AsyncStorage.setItem('signedInUser', JSON.stringify(updatedUser));

            Alert.alert('Success', 'Goal updated successfully!');
            setEditing(false);
            setNewGoal('');
            setEditingGoalIndex(null);
        } catch (error) {
            Alert.alert('Error', 'Failed to update goal.');
        }
    };

    const handleEditGoal = (index) => {
        setNewGoal(user.goals[index]);
        setEditingGoalIndex(index);
        setEditing(true);
    };

    const handleDeleteGoal = async (goal) => {
        try {
            await deleteGoal(user._id, goal);
            const updatedUser = (await getUsers()).find(u => u._id === user._id);
            setUser(updatedUser);
            await AsyncStorage.setItem('signedInUser', JSON.stringify(updatedUser));

            Alert.alert('Success', 'Goal deleted successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete goal.');
        }
    };

    const handleResetUserLevel = async () => {
        try {
          const signedInUser = await AsyncStorage.getItem('signedInUser');
          if (signedInUser) {
            const user = JSON.parse(signedInUser);
            user.level = 1; 
      
            await AsyncStorage.setItem('signedInUser', JSON.stringify(user));
            
            Alert.alert('Success', 'User level has been reset to 1!');
          } else {
            Alert.alert('Error', 'No user data found!');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to reset user level.');
          console.error('Error resetting user level:', error);
        }
      };
      
      const handleResetProgress = async () => {
        try {
          await AsyncStorage.removeItem('workoutProgress'); 
          await handleResetUserLevel();
          await handleResetXP()
          Alert.alert('Success', 'All progress and user level have been reset!');
        } catch (error) {
          Alert.alert('Error', 'Failed to reset progress.');
          console.error('Error resetting progress:', error);
        }
      };
      
      async function handleResetXP(){
        try{
            const updatedUser = {...user}
            updatedUser.xp = 0
            await AsyncStorage.setItem("signedInUser", JSON.stringify(updatedUser))
            Alert.alert("Success", "XP reset successfully")
        } catch(error){
            Alert.alert("Error", "Failed to reset XP")
            console.error("Error resetting XP:", error)
        }
      }

    const handleImageChange = async () => {
        if (!newImageUrl.trim()) {
            Alert.alert('Error', 'Please enter a valid image URL.');
            return;
        }

        try {
            const updatedUser = { ...user, image_url: newImageUrl };
            setUser(updatedUser);
            await AsyncStorage.setItem('signedInUser', JSON.stringify(updatedUser));
            setIsDropdownVisible(false); 
            Alert.alert('Success', 'Profile image updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile image.');
        }
    };
    console.log(user)
    return (
        <>
        <XpBar xp={user?.xp}/>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {user ? (
                <>
                    <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: user.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                            }}
                        />
                    </TouchableOpacity>

                    {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new image URL"
                                value={newImageUrl}
                                onChangeText={setNewImageUrl}
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={handleImageChange}>
                                <Text style={styles.saveButtonText}>Save Image</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.userInfoSection}>
                        <View style={styles.textSection}>
                            <Text style={styles.textHeader}>User info:</Text>
                            <Text style={styles.userInfoText}>Name: {user.name}</Text>
                            <Text style={styles.userInfoText}>Age: {user.age}</Text>
                            <Text style={styles.userInfoText}>Weight: {user.weight}</Text>
                            <Text style={styles.userInfoText}>Height: {user.height}</Text>
                            <Text style={styles.userInfoText}>Level: {user?.level || 1}</Text>
                        </View>
                    </View>

                    <View style={styles.goalsSection}>
                        <View style={styles.textSection}>
                            <Text style={styles.textHeader}>Goals:</Text>
                            {user.goals && user.goals.length > 0 ? (
                                user.goals.map((goal, index) => (
                                    <View key={index} style={styles.goalContainer}>
                                        <Text style={styles.goalText}>{goal}</Text>
                                        <TouchableOpacity style={styles.editButton} onPress={() => handleEditGoal(index)}>
                                            <Ionicons name="pencil" size={24} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteGoal(goal)}>
                                            <Ionicons name="trash" size={24} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.goalText}>No goals set</Text>
                            )}
                        </View>

                        {editing && (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter a new goal"
                                    value={newGoal}
                                    onChangeText={setNewGoal}
                                />
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoal}>
                                    <Text style={styles.saveButtonText}>Save Goal</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={() => setEditing(!editing)}>
                        <Text style={styles.addButtonText}>{editing ? 'Cancel' : 'Add a Goal'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resetButton} onPress={handleResetProgress}>
  <Text style={styles.resetButtonText}>Reset Progress and Level</Text>
</TouchableOpacity>
                </>
            ) : (
                <Text>Loading user information...</Text>
            )}
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: '#FFF9FB',
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        marginTop: 40,
        borderWidth: 3,
        borderColor: '#4B88A2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    dropdown: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
        elevation: 5,
    },
    text: {
        color: '#000',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    userInfoSection: {
        marginBottom: 5,
        alignItems: 'flex-start', 
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        elevation: 3, 
    },
    userInfoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        textAlign: 'left', 
        width: '100%',
    },
    textSection: {
        alignItems: 'flex-start', 
        width: '150%', 
        paddingHorizontal: 20,
    },
    goalsSection: {
        marginTop: 20,
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 12,
        width: '100%',
        marginBottom: 30,
        elevation: 3, 
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B88A2',
        marginBottom: 12,
        textAlign: 'center',
    },
    goalText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        fontSize: 16,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#f0ad4e',
        padding: 12,
        borderRadius: 30,
        marginBottom: 20,
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#5cb85c',
        padding: 12,
        borderRadius: 8,
        width: '100%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    logout: {
        backgroundColor: '#4B88A2',
        padding: 12,
        borderRadius: 30,
        marginTop: 10,
        width: '100%',
        alignSelf: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    goalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#e9e9e9',
        padding: 10,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#5cb85c',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginLeft: 5,
    },
    deleteButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginLeft: 5,
    },
    resetButton: {
        backgroundColor: '#4B88A2',
        padding: 12,
        borderRadius: 30,
        marginTop: 10,
        width: '100%',
        alignSelf: 'center',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
