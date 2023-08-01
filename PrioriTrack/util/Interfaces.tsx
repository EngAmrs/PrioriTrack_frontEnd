import {NavigationProp} from '@react-navigation/native';

export interface Register {
  navigation: NavigationProp<Record<string, object>>;
}
export interface Login {
  navigation: NavigationProp<Record<string, object>>;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
