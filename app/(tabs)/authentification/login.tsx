import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); // 'farmer' or 'buyer'

  const handleLogin = async () => {
    if (!email || !password || !userType) {
      Alert.alert('Error', 'Please fill in all fields and select a user type.');
      return;
    }

    try {
      const response = await axios.post(
        'https://farmer-market-33zm.onrender.com/users/login/',
        { username: email, password }
      );

      if (response.status === 200 && response.data.token) {
        const token = response.data.token; // Save this token for future requests
        Alert.alert('Login Successful', `Welcome back, ${userType}!`);

        // Navigate based on user type
        if (userType === 'farmer') {
          router.push('/farmer'); // Navigate to farmer dashboard
        } else if (userType === 'buyer') {
          router.push('/buyer'); // Navigate to buyer dashboard
        }
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        Alert.alert('Error', 'Login failed. Please check your credentials.');
      }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <Text style={styles.subheader}>Select User Type:</Text>
      <View style={styles.buttonGroup}>
        <Button
          title="Farmer"
          onPress={() => setUserType('farmer')}
          color={userType === 'farmer' ? 'green' : 'gray'}
        />
        <Button
          title="Buyer"
          onPress={() => setUserType('buyer')}
          color={userType === 'buyer' ? 'blue' : 'gray'}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
