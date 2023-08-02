import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';
const Task = ({route}: any) => {
  const {task} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{task.name}</Text>
      </View>
      <View style={styles.taskInfo}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{task.description}</Text>
      </View>
      <View style={styles.taskInfo}>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.text}>
          {new Date(task.startDate).toLocaleDateString()}{' '}
          {new Date(task.startDate).toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.taskInfo}>
        <Text style={styles.label}>End Date:</Text>
        <Text style={styles.text}>
          {new Date(task.endDate).toLocaleDateString()}{' '}
          {new Date(task.endDate).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

export default Task;
