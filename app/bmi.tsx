import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const options = {
    headerTitle: ''
}

export default function BMI() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg'); 
    const [heightUnit, setHeightUnit] = useState('cm'); 
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');
    const [weightError, setWeightError] = useState('');
    const [heightError, setHeightError] = useState('');

    const isNumeric = (value) => /^\d*\.?\d+$/.test(value); // Validate numeric input

    const convertWeightToKg = () => {
        if (weightUnit === 'lbs') {
            return parseFloat(weight) * 0.453592; 
        }
        return parseFloat(weight); 
    };

    const convertHeightToMeters = () => {
        if (heightUnit === 'ft') {
            const [feet, inches = 0] = height.split('.').map(Number); 
            return (feet * 0.3048) + (inches * 0.0254); 
        }
        return parseFloat(height) / 100; 
    };

    const validateInputs = () => {
        let isValid = true;

        if (!isNumeric(weight)) {
            setWeightError('Invalid input. Please enter a number.');
            isValid = false;
        } else {
            setWeightError('');
        }

        if (!isNumeric(height)) {
            setHeightError('Invalid input. Please enter a number.');
            isValid = false;
        } else {
            setHeightError('');
        }

        return isValid;
    };

    const calculateBMI = () => {
        if (!validateInputs()) {
            setBmi(null);
            setStatus('');
            return;
        }

        const weightInKg = convertWeightToKg();
        const heightInMeters = convertHeightToMeters();

        if (weightInKg > 0 && heightInMeters > 0) {
            const bmiValue = weightInKg / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));

            if (bmiValue < 18.5) {
                setStatus('Underweight');
            } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                setStatus('Average');
            } else if (bmiValue >= 25 && bmiValue < 29.9) {
                setStatus('Overweight');
            } else {
                setStatus('Obesity');
            }
        } else {
            setBmi(null);
            setStatus('Invalid input');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BMI Calculator</Text>

            <View style={styles.inputRow}>
                <View style={styles.inputColumn}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter weight in ${weightUnit === 'kg' ? 'kg' : 'lbs'}`}
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                    />
                    {weightError ? <Text style={styles.errorText}>{weightError}</Text> : null}
                </View>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            weightUnit === 'kg' && styles.activeButton,
                        ]}
                        onPress={() => setWeightUnit('kg')}
                    >
                        <Text style={styles.toggleText}>kg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            weightUnit === 'lbs' && styles.activeButton,
                        ]}
                        onPress={() => setWeightUnit('lbs')}
                    >
                        <Text style={styles.toggleText}>lbs</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputRow}>
                <View style={styles.inputColumn}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Enter height in ${heightUnit === 'cm' ? 'cm' : 'ft (ft.inches)'}`}
                        keyboardType="numeric"
                        value={height}
                        onChangeText={(text) => setHeight(text)}
                    />
                    {heightError ? <Text style={styles.errorText}>{heightError}</Text> : null}
                </View>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            heightUnit === 'cm' && styles.activeButton,
                        ]}
                        onPress={() => setHeightUnit('cm')}
                    >
                        <Text style={styles.toggleText}>cm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleButton,
                            heightUnit === 'ft' && styles.activeButton,
                        ]}
                        onPress={() => setHeightUnit('ft')}
                    >
                        <Text style={styles.toggleText}>ft</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={[styles.button, {backgroundColor: '#4B88A2'}]} onPress={calculateBMI}>
                <Text style={styles.buttonText}>Calculate BMI</Text>
            </TouchableOpacity>

            {bmi && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>Your BMI: {bmi}</Text>
                    <Text style={styles.resultText}>Status: {status}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF9FB',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    inputColumn: {
        flex: 0.7,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    toggleContainer: {
        flexDirection: 'row',
        flex: 0.3,
        justifyContent: 'space-between',
    },
    toggleButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    activeButton: {
        backgroundColor: '#4B88A2',
        borderColor: '#4B88A2',
    },
    toggleText: {
        color: '#000',
        fontWeight: 'bold',
    },
    button: {
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
