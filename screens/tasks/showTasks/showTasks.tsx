import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Login, Task} from '../../../util/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getUser} from '../../../util/getUser';

const ShowTasks = ({navigation}: Login) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<any>({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchTasks = async () => {
        const aCurrentTasks = await AsyncStorage.getItem('Tasks');
        let currentTasks = aCurrentTasks ? JSON.parse(aCurrentTasks) : [];
        currentTasks = currentTasks.filter((t: Task) => {
          return t.userId === user.id;
        });
        sortTasks(currentTasks);
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

  // Sort Tasks
  const sortTasks = (userTasks: Task[]) => {
    userTasks.sort((a, b) => {
      const start = new Date(a.startDate);
      const end = new Date(b.endDate);
      return start.getTime() - end.getTime();
    });
  };

  // Calculate Duration
  const calculateDuration = (start: Date, end: Date): string => {
    const durationInMillis = end.getTime() - start.getTime();
    const hours = Math.floor(durationInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInMillis % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((durationInMillis % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Navigate
  const handleViewTaskDetails = (task: Task) => {
    navigation.navigate('Task', {task});
  };

  // Handle Delete Task
  const handleDeleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('Tasks', JSON.stringify(updatedTasks));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>
      {tasks.length > 0 ? (
        <ScrollView style={styles.tasks}>
          {tasks.map(t => (
            <View key={t.id} style={styles.card}>
              <Text style={styles.taskName}>Name: {t.name}</Text>
              <Text style={styles.duration}>
                Duration:{' '}
                {calculateDuration(new Date(t.startDate), new Date(t.endDate))}
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => handleViewTaskDetails(t)}>
                  <Text style={styles.viewDetailsButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTask(t.id)}>
                  <FontAwesome5 name="trash" size={20} color={'darkred'} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <FontAwesome5 name="smile-beam" size={50} color={'#aaa'} />
          <Text style={{color: '#aaa', marginTop: 10}}>No tasks to show</Text>
        </View>
      )}
    </View>
  );
};

export default ShowTasks;
