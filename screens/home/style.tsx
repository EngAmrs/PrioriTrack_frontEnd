import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingBottom: 15,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    color: 'green',
  },
  header: {
    textAlign: 'center',
    flexBasis: '15%',
    marginTop: 150,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'fantasy',
  },
  content: {
    flex: 1,
  },
  logo: {
    fontSize: 18,
    color: '#666',
  },
  subtext: {
    textAlign: 'center',
  },
  taskNumber: {
    textAlign: 'center',
    marginVertical: 50,
    fontWeight: 'bold',
  },
});
