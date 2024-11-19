import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { getUsers } from '../api'

  
    export default function LoginPage() {
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const router = useRouter();
    
        
        useEffect(() => {
            getUsers()
                .then((data) => {
                    setUsers(data);  
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                    setLoading(false);
                });
        }, []);
    
        
        const handleUserSelection = (user) => {
            try {
                
                localStorage.setItem('signedInUser', JSON.stringify(user));
                router.replace('/'); 
            } catch (error) {
                console.error('Error storing user:', error);
            }
        };
    
        useEffect(() => {
            const signedInUser = localStorage.getItem('signedInUser');
            if (signedInUser) {
                router.replace('/'); 
            }
        }, []);
    
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Select User</Text>
                {loading ? (
                    <Text>Loading users...</Text>
                ) : users.length > 0 ? (
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item._id} 
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleUserSelection(item)}
                            >
                                <Text style={styles.buttonText}>{item.name}</Text> 
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text>No users found.</Text>
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
            padding: 20,
        },
        header: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#252627',
            marginBottom: 20,
        },
        button: {
            backgroundColor: '#D3D4D9',
            marginTop: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
        },
        buttonText: {
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });
