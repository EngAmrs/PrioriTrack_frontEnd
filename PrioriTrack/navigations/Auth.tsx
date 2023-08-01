import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginForm from '../screens/auth/login';
import RegisterForm from '../screens/auth/Register';

const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterForm}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
