import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useUserStore } from '@/store/useUserStore';

export default function RootLayout() {
  const { isLoggedIn } = useUserStore();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Wait for navigator to mount

    const inAuthGroup = segments[0] === 'auth';

    // Delay navigation slightly to ensure the root layout is fully mounted
    const timeout = setTimeout(() => {
      if (!isLoggedIn && !inAuthGroup) {
        // Redirect to login if not logged in
        router.replace('/auth/login');
      } else if (isLoggedIn && inAuthGroup) {
        // Redirect away from login if logged in
        router.replace('/(tabs)');
      }
    }, 1);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, segments, rootNavigationState?.key]);

  return (
    <>
      <StatusBar style="light" backgroundColor="#4A1A1A" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      </Stack>
    </>
  );
}
