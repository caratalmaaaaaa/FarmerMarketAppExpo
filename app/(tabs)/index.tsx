import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Farmer Market App!</Text>
      <Text style={styles.subtitle}>Choose your action</Text>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={[styles.button, styles.buyerButton]}
        onPress={() => router.push('/buyer')}
      >
        <Text style={styles.buttonText}>Go to Buyer Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.farmerButton]}
        onPress={() => router.push('/farmer')}
      >
        <Text style={styles.buttonText}>Go to Farmer Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => router.push('/authentification/login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => router.push('/authentification/register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2a9d8f',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#264653',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    width: '80%',
    elevation: 2, // Adds a shadow effect
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buyerButton: {
    backgroundColor: '#2a9d8f', // Teal
  },
  farmerButton: {
    backgroundColor: '#e76f51', // Orange
  },
  loginButton: {
    backgroundColor: '#264653', // Dark Green
  },
  registerButton: {
    backgroundColor: '#f4a261', // Light Orange
  },
});
