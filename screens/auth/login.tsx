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
  Linking,
} from 'react-native';

const LoginForm = ({navigation}: Login) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleForgotPassword = () => {
    const togglUrl = 'https://toggl.com/track/forgot-password/';
    Linking.openURL(togglUrl).catch(error =>
      console.error('Error opening URL:', error),
    );
  };

  const handleValidation = () => {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordIsValid = password.length >= 8;

    if (!emailIsValid) {
      Toast.show({
        type: 'info',
        text1: 'Email',
        text2: 'Make sure the email format is correct',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    } else if (!passwordIsValid) {
      Toast.show({
        type: 'info',
        text1: 'Password',
        text2: 'Password must be at least 8 characters',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (!handleValidation()) {
      return;
    }
    try {
      const aUserData: string | null = await AsyncStorage.getItem('userData');
      const userData: any = aUserData ? JSON.parse(aUserData) : [];

      let user: any = userData.find((u: any) => {
        return email.trim() === u.email;
      });

      if (user) {
        if (password.trim() === user.password) {
          await AsyncStorage.setItem('currentUser', JSON.stringify(user));

          navigation.navigate({
            name: 'BottomTabs',
            params: {userId: user.id},
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'User not found',
            text2: 'The provided email does not exist',
            position: 'top',
            visibilityTime: 3000,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login',
          text2: 'Incorrect Email or Password',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login',
        text2: 'Login Failed!',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text style={{fontSize: 10}}>Welcome to{'\n'}</Text>
        Priori<Text style={{color: 'green'}}>Track</Text>
      </Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={email === '' || password === ''}
          style={[
            styles.button,
            {
              backgroundColor:
                email === '' || password === '' ? '#ccc' : 'green',
            },
          ]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate({name: 'Register', params: {}})}>
            <Text style={styles.createAccountButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    borderBottomColor: 'green',
    borderBottomWidth: 3,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  forgotPass: {
    marginBottom: 10,
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
  dividerContainer: {
    flexBasis: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#727171',
    width: 150,
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#727171',
    fontWeight: 'bold',
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 15,
    width: '50%',
  },
  createAccountButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginForm;
