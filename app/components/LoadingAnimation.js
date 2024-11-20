import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export default function LoadingDumbbell({ size = 50 }) {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000, 
                useNativeDriver: true,
            })
        );
        spinAnimation.start();

        return () => spinAnimation.stop(); 
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], 
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/dumbell.png')} 
                style={[
                    styles.image,
                    { width: size, height: size, transform: [{ rotate: spin }] },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
