import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getUser} from '../../util/getUser';
import {Login} from '../../util/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {styles} from './style';
const UserInfo = ({navigation}: Login) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const currentUser = async () => {
      const current = await getUser();
      setUser(current);
    };
    currentUser();
  }, []);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      navigation.dispatch(() => {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
        return resetAction;
      });
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>
        {user.firstName} {user.lastName}
      </Text>
      <Text>{user.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserInfo;
