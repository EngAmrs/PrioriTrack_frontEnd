import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const aUser: any = await AsyncStorage.getItem('currentUser');
      const currentUser: any = JSON.parse(aUser);
      setUser(currentUser);
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hello, <Text style={styles.userName}>{user.firstName}</Text>!
      </Text>
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
