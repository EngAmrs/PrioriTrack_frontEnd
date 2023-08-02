import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Login, Task} from '../../../util/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from './style';

const ShowTasks = ({navigation}: Login) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(() => {
    const fetchTasks = async () => {
      const aCurrentTasks = await AsyncStorage.getItem('Tasks');
      let currentTasks = aCurrentTasks ? JSON.parse(aCurrentTasks) : [];
      setTasks(currentTasks);
    };
    fetchTasks();
  });

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
    navigation.navigate('TaskDetails', {task});
  };

  // Handle Delete Task
  const handleDeleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem('Tasks', JSON.stringify(updatedTasks));
  };
  return (
    <ScrollView style={styles.container}>
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
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ShowTasks;
