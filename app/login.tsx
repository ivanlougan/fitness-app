import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { getUsers } from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const handleUserSelection = async (user) => {
        try {
            await AsyncStorage.setItem('signedInUser', JSON.stringify(user)); 
            router.replace('/'); 
        } catch (error) {
            console.error('Error storing user:', error);
        }
    };

    useEffect(() => {
        const checkSignedInUser = async () => {
            const signedInUser = await AsyncStorage.getItem('signedInUser');
            if (signedInUser) {
                router.replace('/user'); 
            }
        };
        checkSignedInUser();
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
                            <Image 
                                style={styles.avatar}
                                source={{ uri: item.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
                            />
                            <Text style={styles.buttonText}>{item.name}</Text> 
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text>No users found</Text>
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
        marginBottom: 10, 
        paddingVertical: 28,   
        paddingHorizontal: 15, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row', 
        minWidth: 190,  
        maxWidth: '90%', 
        alignSelf: 'center',
    },
    avatar: {
        width: 50,  
        height: 50, 
        borderRadius: 25, 
        marginRight: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 20,  
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
