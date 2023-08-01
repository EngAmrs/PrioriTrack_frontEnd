import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
// import AppTabs from './AppTabs';
// import {fetchUser} from '../services/reducers/auth/authSlice';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const user = true;

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          {/* <Stack.Screen
            name="InBoarding"
            component={InBoarding}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
