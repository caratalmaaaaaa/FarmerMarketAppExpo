import { Stack } from 'expo-router';

export default function Navigation() {
  return (
    <Stack>
      <Stack.Screen name="screens/auth/login" options={{ title: 'Login' }} />
      <Stack.Screen name="screens/auth/register" options={{ title: 'Register' }} />
      <Stack.Screen name="screens/buyer/index" options={{ title: 'Buyer Dashboard' }} />
      <Stack.Screen name="screens/farmer/index" options={{ title: 'Farmer Dashboard' }} />
    </Stack>
  );
}
