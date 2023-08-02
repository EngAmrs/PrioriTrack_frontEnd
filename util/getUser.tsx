import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  const aUser: any = await AsyncStorage.getItem('currentUser');
  return JSON.parse(aUser);
};
