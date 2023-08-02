import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Task} from '../../../util/Interfaces';
import {Button} from '@rneui/base';
import Toast from 'react-native-toast-message';

const CreateTask = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onStartChange = (event: any, selectedTime?: Date) => {
    const currentDate = selectedTime || startDate;

    if (new Date(currentDate) > endDate) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'End time cannot be earlier than the start time.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    setShowStartPicker(Platform.OS === 'ios');
    setStartDate(new Date(currentDate));
  };

  const onEndChange = (event: any, selectedTime?: Date) => {
    const currentDate = selectedTime || endDate;
    if (new Date(currentDate) < startDate) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'End time cannot be earlier than the start time.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    setShowEndPicker(Platform.OS === 'ios');
    setEndDate(new Date(currentDate));
  };

  const showStartPickerFunc = () => {
    setShowStartPicker(true);
  };

  const showEndPickerFunc = () => {
    setShowEndPicker(true);
  };

  const handleChange = () => {
    console.log('test');
  };

  const handleCreateTask = () => {
    console.log('test');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => handleChange('description', text)}
        multiline
      />

      <View style={styles.timeButton}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={showStartPickerFunc}>
          <Text style={styles.startButtonText}>
            {'Start Time: ' + startDate.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onStartChange}
          />
        )}

        <TouchableOpacity style={styles.endButton} onPress={showEndPickerFunc}>
          <Text style={styles.endButtonText}>
            {' '}
            {'End Time: ' + endDate.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode="time"
            minimumDate={new Date(startDate)}
            is24Hour={false}
            display="default"
            onChange={onEndChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.createText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default CreateTask;
