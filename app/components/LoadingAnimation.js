import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

export default function LoadingDumbbell({ size = 50 }) {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const rotate = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear, // Correctly reference Easing here
                useNativeDriver: true,
            })
        );
        rotate.start();

        return () => {
            rotate.stop();
        };
    }, [rotation]);

    const rotationInterpolated = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../../assets/images/dumbell.png')}
                style={[styles.image, { width: size, height: size, transform: [{ rotate: rotationInterpolated }] }]}
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
