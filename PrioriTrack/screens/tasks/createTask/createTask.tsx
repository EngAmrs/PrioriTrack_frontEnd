import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import {styles} from './style';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {Task} from '../../../util/Interfaces';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../../../util/getUser';

const CreateTask = () => {
  // States
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Validations
  const handleValidation = () => {
    const nameIsValid = name.length <= 100;
    const descriptionIsValid = description.length <= 300;

    if (name.trim() === '' || !nameIsValid) {
      Toast.show({
        type: 'error',
        text1: 'Name Field',
        text2: 'Maximum Number of character is 100',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    if (description.trim() === '' || !descriptionIsValid) {
      Toast.show({
        type: 'error',
        text1: 'Name Field',
        text2: 'Maximum Number of character is 300',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    return true;
  };

  // Handle Start date
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

  const showStartPickerFunc = () => {
    setShowStartPicker(true);
  };

  // Handle End date
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

  const showEndPickerFunc = () => {
    setShowEndPicker(true);
  };

  // Create New Task
  const resetFields = () => {
    setName('');
    setDescription('');
    setStartDate(new Date());
    setEndDate(new Date());
    setShowStartPicker(false);
    setShowEndPicker(false);
  };
  const handleCreateTask = async () => {
    if (!handleValidation()) {
      return;
    }
    try {
      const aCurrentTasks = await AsyncStorage.getItem('Tasks');
      let currentTasks = aCurrentTasks ? JSON.parse(aCurrentTasks) : [];

      //get User
      const user = await getUser();
      const taskData = {
        id:
          currentTasks.length !== 0
            ? currentTasks[currentTasks.length - 1].id + 1
            : 1,
        name,
        description,
        startDate,
        endDate,
        userId: user.id,
      };
      currentTasks.push(taskData);

      await AsyncStorage.setItem('Tasks', JSON.stringify(currentTasks));
      resetFields();
      Toast.show({
        type: 'success',
        text1: 'Creation',
        text2: 'Task is created successfully!',
        position: 'top',
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Creation',
        text2: 'Task is failed to get created!',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
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

export default CreateTask;
