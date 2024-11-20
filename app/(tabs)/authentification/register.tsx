import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1); // Tracks the current step
  const [userType, setUserType] = useState(''); // 'farmer' or 'buyer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleRegister = async () => {
    if (!email || !password || (userType === 'farmer' && (!name || !location || !contactInfo)) ||
        (userType === 'buyer' && (!deliveryAddress || !contactNumber))) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const endpoint =
      userType === 'farmer'
        ? 'https://farmer-market-33zm.onrender.com/users/register/farmer/'
        : 'https://farmer-market-33zm.onrender.com/users/register/buyer/';

    const payload =
      userType === 'farmer'
        ? {
            name,
            location,
            contact_info: contactInfo,
            user: {
              username: email.split('@')[0],
              email,
              password,
            },
          }
        : {
            user: {
              username: email.split('@')[0],
              email,
              password,
            },
            delivery_address: deliveryAddress,
            contact_number: contactNumber,
          };

    try {
      const response = await axios.post(endpoint, payload);
      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful! Please log in.');
        router.push('/authentification/login'); // Navigate to login after registration
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Registration failed. Please check your inputs.');
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.header}>Are you registering as a Farmer or Buyer?</Text>
          <Button
            title="Register as Farmer"
            onPress={() => {
              setUserType('farmer');
              setStep(2);
            }}
          />
          <Button
            title="Register as Buyer"
            onPress={() => {
              setUserType('buyer');
              setStep(2);
            }}
          />
        </>
      )}

      {step === 2 && userType === 'farmer' && (
        <>
          <Text style={styles.header}>Register as Farmer</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Info"
            value={contactInfo}
            onChangeText={setContactInfo}
          />
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
          <Button title="Submit" onPress={handleRegister} />
          <Button
            title="Go Back"
            onPress={() => {
              setStep(1);
              setUserType('');
            }}
          />
        </>
      )}

      {step === 2 && userType === 'buyer' && (
        <>
          <Text style={styles.header}>Register as Buyer</Text>
          <TextInput
            style={styles.input}
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
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
          <Button title="Submit" onPress={handleRegister} />
          <Button
            title="Go Back"
            onPress={() => {
              setStep(1);
              setUserType('');
            }}
          />
        </>
      )}
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
    textAlign: 'center',
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
