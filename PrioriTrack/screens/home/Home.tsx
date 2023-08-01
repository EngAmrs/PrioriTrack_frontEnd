import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
const Home = () => {
  const route = useRoute();
  const {userId} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hello, <Text style={styles.userName}>John</Text>!
      </Text>
      <Text>User ID: {userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingBottom: 15,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    color: 'green',
  },
});

export default Home;
