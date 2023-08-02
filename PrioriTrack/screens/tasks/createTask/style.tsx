import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#48BF53',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  endButton: {
    backgroundColor: '',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  endButtonText: {
    fontSize: 18,
    color: '#555',
  },
  createText: {
    color: '#fff',
    fontSize: 18,
  },
});
