import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  duration: {
    fontSize: 14,
    marginTop: 8,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewDetailsButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    flex: 1,
    marginRight: 2,
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    flex: 1,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
