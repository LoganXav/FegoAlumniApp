import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/utils/use-color-scheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-event"
          options={{ headerBackTitle: "Back", headerTitle: "Add an event" }}
        />
        <Stack.Screen
          name="add-member"
          options={{ headerBackTitle: "Back", headerTitle: "Add a new member" }}
        />
        <Stack.Screen
          name="add-memo"
          options={{
            headerBackTitle: "Back",
            headerTitle: "Publish an announcement",
          }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{
            headerBackTitle: "Back",
            headerTitle: "Update your profile",
          }}
        />
        <Stack.Screen
          name="event/[id]"
          options={{
            headerTitle: "Event details",
            presentation: "modal",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="member/[id]"
          options={{
            headerTitle: "Profile",
            presentation: "modal",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="memo/[id]"
          options={{
            headerTitle: "Announcement details",
            presentation: "modal",
            animation: "fade",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
