import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import anime from 'animejs/lib/anime.es.js';  

export default function LoadingDumbbell({ size = 50 }) {
    const imageRef = useRef(null);

    useEffect(() => {
       
        const spinAnimation = anime({
            targets: imageRef.current,
            rotate: '360deg', 
            duration: 1000, 
            loop: true, 
            easing: 'linear', 
        });

        return () => {
           
            spinAnimation.pause();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Image
                ref={imageRef}  
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
});
