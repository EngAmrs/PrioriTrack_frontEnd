import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShowTasks from '../screens/tasks/showTasks/showTasks';
import Task from '../screens/tasks/task/task';

const Stack = createStackNavigator();

export default function MainTasks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShowTasks"
        component={ShowTasks}
        options={{headerShown: true, title: 'My Tasks'}}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{headerShown: true, title: 'Task Details'}}
      />
    </Stack.Navigator>
  );
}
