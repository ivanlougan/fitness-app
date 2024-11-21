import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import LoadingAnimation from './components/LoadingAnimation';  

export default function CalorieTracker() {
    const [query, setQuery] = useState('');
    const [amount, setAmount] = useState('100');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchFood = async () => {
        if (!query) return;

        setLoading(true);

        try {
            const API_ID = process.env.EXPO_PUBLIC_NUTRITIONIX_APP_ID;
            const API_KEY = process.env.EXPO_PUBLIC_NUTRITIONIX_API_KEY;

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

                        const foodData = nutritionResponse.data.foods[0];
                        return {
                            ...food,
                            caloriesPerGram: foodData?.nf_calories / foodData?.serving_weight_grams || 0,
                            servingWeight: foodData?.serving_weight_grams || 1,
                        };
                    } catch {
                        return { ...food, caloriesPerGram: 0, servingWeight: 1 };
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

    const calculateCalories = (item) => {
        const userAmount = parseFloat(amount) || 0;
        return (item.caloriesPerGram * userAmount).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calorie Tracker</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for food..."
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    onSubmitEditing={searchFood}
                />
                <TextInput
                    style={styles.amountInput}
                    placeholder="Amount (g)"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity onPress={searchFood} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {loading && (
                <View style={styles.loadingContainer}>
                    <LoadingAnimation size={50} />  
                </View>
            )}

            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.result}>
                        <Text style={styles.foodName}>
                            {item.food_name.charAt(0).toUpperCase() + item.food_name.slice(1)}
                        </Text>
                        <Text style={styles.calories}>
                            Calories: {calculateCalories(item)} kcal
                        </Text>
                        <Text style={styles.servingInfo}>
                            Serving Weight: {item.servingWeight}g | Per Gram: {item.caloriesPerGram.toFixed(2)} kcal
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
        position: 'relative', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    input: {
        flex: 2,
        height: 40,
        borderColor: '#4B88A2',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 5,
        backgroundColor: '#FFF',
    },
    amountInput: {
        flex: 1,
        height: 40,
        borderColor: '#4B88A2',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
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
        marginVertical: 5,
    },
    servingInfo: {
        fontSize: 14,
        color: '#555',
    },
    loadingContainer: {
        position: 'absolute',  
        top: '25%',  
        left: '50%',
        transform: [{ translateX: -25 }],  
        zIndex: 1,  
    },
});
