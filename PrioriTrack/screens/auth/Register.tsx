import React, {useState} from 'react';
import {Login} from '../../util/Interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const RegisterForm = ({navigation}: Login) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Validations
  const handlValidation = () => {
    const firstNameValid = firstName.length <= 15 && firstName.length >= 3;
    const lastNameValid = lastName.length <= 15 && lastName.length >= 3;
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordIsValid = password.length >= 8;

    if (firstName.trim() === '' || !firstNameValid) {
      Toast.show({
        type: 'error',
        text1: 'First Name',
        text2: 'Must be at least 3 characters and maximum 15',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (lastName.trim() === '' || !lastNameValid) {
      Toast.show({
        type: 'error',
        text1: 'Last Name',
        text2: 'Must be at least 3 characters and maximum 15',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (email.trim() === '' || !emailIsValid) {
      Toast.show({
        type: 'error',
        text1: 'Email',
        text2: 'Invaild Format',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    if (password.trim() === '' || !passwordIsValid) {
      Toast.show({
        type: 'error',
        text1: 'Password',
        text2: 'Must be at least 8 characters',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }
    return true;
  };

  // Register
  const handleRegister = async () => {
    if (!handlValidation()) {
      return;
    }

    try {
      const aCurrentUserData = await AsyncStorage.getItem('userData');
      let currentUserData = aCurrentUserData
        ? JSON.parse(aCurrentUserData)
        : [];
      const userData = {
        id: aCurrentUserData
          ? currentUserData[currentUserData.length - 1].id + 1
          : 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      currentUserData.push(userData);
      await AsyncStorage.setItem('userData', JSON.stringify(currentUserData));

      Toast.show({
        type: 'success',
        text1: 'Sign Up',
        text2: 'Registration successful!',
        position: 'top',
        visibilityTime: 3000,
      });
      navigation.navigate({name: 'Login', params: {}});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign Up',
        text2: 'Registration Failed! ',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Sign<Text style={{color: 'green'}}>Up</Text>
      </Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your FirstName"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your FirstName"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate({name: 'Login', params: {}})}>
          <Text style={styles.hasAccount}>Have already an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    flexBasis: '15%',
    marginTop: 100,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'fantasy',
  },
  formContainer: {
    width: '100%',
    flexBasis: '60%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hasAccount: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RegisterForm;
