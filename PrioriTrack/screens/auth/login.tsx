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

const LoginForm = ({navigation}: Login) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleValidation = () => {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordIsValid = password.length >= 8;

    if (!emailIsValid || !passwordIsValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input',
        text2: 'Please enter a valid email and password.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
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
          text2: 'User not registered. Please register first',
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
        <TouchableOpacity
          onPress={() => navigation.navigate({name: 'Login', params: {}})}>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
    flexBasis: '30%',
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
    flexBasis: '10%',
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
    backgroundColor: '#777',
    padding: 15,
    width: '50%',
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginForm;
