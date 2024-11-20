import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function CalorieTracker() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchFood = async () => {
        if (!query) return;

        setLoading(true);

        try {
            const API_ID = '6184d7c9'; 
            const API_KEY = '3258fa1fabbcb902d88f20f647bc2cba'; 

            
            const response = await axios.get(
                'https://trackapi.nutritionix.com/v2/search/instant',
                {
                    headers: {
                        'x-app-id': API_ID,
                        'x-app-key': API_KEY,
                    },
                    params: { query },
                }
            );

            const commonFoods = response.data.common;

            
            const detailedResults = await Promise.all(
                commonFoods.map(async (food) => {
                    try {
                        const nutritionResponse = await axios.post(
                            'https://trackapi.nutritionix.com/v2/natural/nutrients',
                            { query: food.food_name },
                            {
                                headers: {
                                    'x-app-id': API_ID,
                                    'x-app-key': API_KEY,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
                        return {
                            ...food,
                            calories: nutritionResponse.data.foods[0]?.nf_calories || 'N/A',
                        };
                    } catch {
                        return { ...food, calories: 'N/A' };
                    }
                })
            );

            setResults(detailedResults);
        } catch (error) {
            console.error('Error fetching food data:', error);
            alert('Error fetching food data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calorie Tracker</Text>
            <TextInput
                style={styles.input}
                placeholder="Search for food..."
                value={query}
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={searchFood}
            />
            <TouchableOpacity onPress={searchFood} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#4B88A2" />}
            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.result}>
                        <Text style={styles.foodName}>{item.food_name.charAt(0).toUpperCase() + item.food_name.slice(1)}</Text>
                        <Text style={styles.calories}>
                            Calories: {item.calories !== 'N/A' ? `${item.calories} kcal` : 'N/A'}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9FB',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#4B88A2',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
    },
    searchButton: {
        backgroundColor: '#4B88A2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    searchButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    result: {
        width: '100%',
        padding: 15,
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        marginVertical: 5,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    calories: {
        fontSize: 16,
        color: '#333',
    },
});
