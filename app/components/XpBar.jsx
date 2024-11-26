import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';

function XpBar() {
    const [xp, setXp] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [signedInUser, setSignedInUser] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        AsyncStorage.getItem("signedInUser")
            .then((signedInUser) => {
                setIsLoading(false);
                setSignedInUser(JSON.parse(signedInUser));
                setXp(JSON.parse(signedInUser).xp); 
            })
            .catch((err) => {
                setIsLoading(false);
                setError("User XP cannot be displayed");
            });
    }, []);

    if (isLoading) {
        return <Text>Now loading...</Text>;
    }
    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.xpBarBackground}>
            <Text style={styles.xpText}>{xp} XP</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    xpBarBackground: {
        width: "150%",
        height: 35,
        backgroundColor: "#4B88A2", 
        borderRadius: 10,
        overflow: "hidden", 
        position: "relative", 
        marginBottom: 10, 
        alignSelf: "center", 
        padding: 5,
    },
    xpText: {
        position: "absolute",
        alignItems: "center",
        top: 0,
        left: "54%",
        transform: [{ translateX: -50 }], 
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default XpBar;
