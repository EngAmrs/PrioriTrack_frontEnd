import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
    width: 100,
  },
  text: {
    flex: 1,
  },
});
export default Task;
