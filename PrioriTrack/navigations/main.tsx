import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import TabBase from './tab_base';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const user = false;

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <>
            <Stack.Screen
              name="BottomTabs"
              component={TabBase}
              options={{headerShown: false}}
            />
          </>
        </>
      ) : (
        <>
          <Stack.Screen
            name="BottomTabs"
            component={TabBase}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
