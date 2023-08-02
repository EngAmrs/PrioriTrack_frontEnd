import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  logoutButton: {
    marginVertical: 75,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
