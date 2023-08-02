import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../util/getUser';
import {styles} from './style';
import {useFocusEffect} from '@react-navigation/native';
import {Task} from '../../util/Interfaces';
const Home = () => {
  const [user, setUser] = useState<any>({});
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTasks = async () => {
        const aCurrentTasks = await AsyncStorage.getItem('Tasks');
        let currentTasks = aCurrentTasks ? JSON.parse(aCurrentTasks) : [];
        currentTasks = currentTasks.filter((t: Task) => {
          return t.userId === user.id;
        });
        setTasks(currentTasks);
      };
      fetchTasks();
    }, [user]),
  );
  useEffect(() => {
    const currentUser = async () => {
      const current = await getUser();
      setUser(current);
    };
    currentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hello, <Text style={styles.userName}>{user.firstName}</Text>!
      </Text>
      <View style={styles.content}>
        <Text style={styles.header}>
          Welcome to Priori<Text style={{color: 'green'}}>Track</Text>
        </Text>
        <Text style={styles.subtext}>
          PrioriTrack allows you to create, manage, and organize your tasks or
          to-do lists. It's a useful tool to keep track of various tasks, set
          deadlines, prioritize activities, and stay organized.
        </Text>
        <Text style={styles.taskNumber}>
          You have <Text style={{color: 'darkred'}}>{tasks.length || 0}</Text>{' '}
          Tasks
        </Text>
      </View>
    </View>
  );
};

export default Home;
