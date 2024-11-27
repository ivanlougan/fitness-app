import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { getUsers } from "../../api.js";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LeaderboardsPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [signedInUser, setSignedInUser] = useState(null); 

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((users) => {
        setIsLoading(false);
        setUsers(users);
        AsyncStorage.getItem('signedInUser')
          .then((signedInUserData) => {
            if (signedInUserData) {
              setSignedInUser(JSON.parse(signedInUserData)); 
            }
          })
          .catch((err) => {
            setError("Error fetching signed-in user.");
            console.error(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Error fetching users. Please try again later.");
      });
  }, []);

  if (isLoading) {
    return <Text>Now loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const signedInUserIndex = users.findIndex(user => user._id === signedInUser?._id);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        {users.map((user, index) => (
          <View
            key={`user-${user._id}-container`}
            style={[
              styles.userContainer,
              signedInUser && signedInUser._id === user._id ? styles.signedInUserContainer : null, 
            ]}
          >
            <Text style={styles.rank}>{index + 1}.</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userLevel}>Level: {user.level}</Text>
              <Text style={styles.userXP}>XP: {user.xp}</Text>
              {index === 0 && (
              <Ionicons name="trophy" size={24} color="#FFD700" style={styles.trophyIcon} />
            )}
            </View>
            <Image 
              source={{ uri: user.image_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
              style={styles.avatar} 
            />
          </View>
        ))}
      </View>

      {signedInUser && signedInUserIndex !== -1 && (
        <View style={styles.signedInRankContainer}>
          <Text style={styles.signedInRankText}>
            You are currently №{signedInUserIndex + 1} on the leaderboard!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9FB",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  leaderboardContainer: {
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    width: "90%",
    maxWidth: 350,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 10,
  },
  signedInUserContainer: {
    backgroundColor: "#D1F2FB",
    borderWidth: 2,
    borderColor: "#4B88A2", 
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B88A2",
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  userXP: {
    fontSize: 14,
    color: "#666",
  },
  signedInRankContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#D1F2FB",
    borderRadius: 10,
    marginBottom: 20,
  },
  signedInRankText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B88A2",
    textAlign: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,  
    marginLeft: 10,    
  },
  trophyIcon: {
    position: "absolute",
    right: 25,
    top:15,
    fontSize: 36,
  },
});

