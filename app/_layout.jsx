import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Auth/Signup" options={{ headerShown: false }} />
      <Stack.Screen name="Auth/Login" options={{ headerShown: false }} />
      <Stack.Screen name="Auth/passwordReset" options={{ headerShown: false }} />
      <Stack.Screen name="HomePage" options={{ headerShown: false }} />
    </Stack>
  );
}
