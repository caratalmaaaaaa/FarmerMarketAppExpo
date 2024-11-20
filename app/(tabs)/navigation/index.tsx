import { Stack } from 'expo-router';

export default function Navigation() {
  return (
    <Stack>
      <Stack.Screen name="auth/login" options={{ title: 'Login' }} />
      <Stack.Screen name="auth/register" options={{ title: 'Register' }} />
      <Stack.Screen name="buyer/index" options={{ title: 'Buyer Dashboard' }} />
      <Stack.Screen name="farmer/index" options={{ title: 'Farmer Dashboard' }} />
      <Stack.Screen name="farmer/AddProduct" options={{ title: 'AddProduct' }} />
    </Stack>
  );
}
