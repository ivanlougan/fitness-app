import { Text, View,  StyleSheet } from 'react-native';
import { Link } from 'expo-router'

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Link href="/results" style={styles.text}>Go to Results</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
  link: {
    fontSize: 20,
    color: '#000',
    textDecorationLine: 'underline'
  }
});
