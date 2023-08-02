import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import TabBase from './tab_base';
import {getUser} from '../util/getUser';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const [user, setUser] = useState<any>(undefined);
  useEffect(() => {
    const currentUser = async () => {
      const current = await getUser();
      setUser(current);
    };
    currentUser();
  }, []);

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
