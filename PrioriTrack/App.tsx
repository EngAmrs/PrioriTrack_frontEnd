import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './navigations/main';
const Stack = createStackNavigator();

export default function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Flights" component={FlightsTab} options={{ headerShown: true }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
