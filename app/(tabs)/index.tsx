import { Text, View,  StyleSheet } from 'react-native';
import { Link } from 'expo-router'
import Header from '../Header';


export default function HomePage() {

  return (
    <View style={styles.container}>
      <Header title="FitnessApp" /> 

      <View style={styles.content}>
        <Text style={styles.text}>Home</Text>
        <Link href="/results" style={styles.link}>Go to Results</Link>
        <Link href="/workout" style={styles.link}>Go to Workout</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
    marginBottom: 10,
  },
  link: {
    fontSize: 18,
    color: '#000',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});
