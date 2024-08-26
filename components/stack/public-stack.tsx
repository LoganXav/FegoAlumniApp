import { Stack } from "expo-router";

function PublicStack() {
  return (
    <Stack initialRouteName="auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

export default PublicStack;
