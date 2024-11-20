import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import anime from 'animejs/lib/anime.es.js';  // Import Anime.js

export default function LoadingDumbbell({ size = 50 }) {
    const imageRef = useRef(null);

    useEffect(() => {
        // Use Anime.js to create the spinning animation
        const spinAnimation = anime({
            targets: imageRef.current,
            rotate: '360deg', // Set the rotation to 360 degrees
            duration: 1000, // Duration of one full spin
            loop: true, // Infinite loop
            easing: 'linear', // Smooth, linear animation
        });

        return () => {
            // Clean up animation on unmount
            spinAnimation.pause();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Image
                ref={imageRef}  // Reference to the image element
                source={require('../../assets/images/dumbell.png')}
                style={[styles.image, { width: size, height: size }]}
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
    image: {
        // Optional: Add any additional image styling here if needed
    }
});
