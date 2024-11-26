import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { getUsers } from "../../api.js"; 

export default function LeaderboardsPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((users) => {
        setIsLoading(false);
        setUsers(users);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        {users.map((user, index) => (
          <View key={`user-${user._id}-container`} style={styles.userContainer}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userLevel}>Level: {user.level}</Text>
              <Text style={styles.userXP}>XP: {user.xp}</Text>
            </View>
          </View>
        ))}
      </View>
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
});
