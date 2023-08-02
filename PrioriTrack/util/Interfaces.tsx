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

export interface Task {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  userId: number;
}
