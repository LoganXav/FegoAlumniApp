import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/utils/use-color-scheme";
import { AuthenticatedUserContext, AuthenticatedUserProvider } from "@/contexts/auth-user-context";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Pressable } from "@/components/ui/themed";
import { AntDesign } from "@expo/vector-icons";
import colors from "@/constants/colors";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "auth",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsLoading(false);
    }
  }, [loaded]);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <AuthenticatedUserProvider>
      <RootLayoutNav />
    </AuthenticatedUserProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-event" options={{ headerBackTitle: "Back", headerTitle: "Add an event" }} />
        <Stack.Screen
          name="add-member"
          options={{
            headerBackTitle: "Back",
            headerTitle: "Add a new member",
          }}
        />
        <Stack.Screen
          name="edit-member"
          options={{
            headerBackTitle: "Back",
            headerTitle: "Edit this profile",
          }}
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
          name="event/[title]"
          options={{
            headerTitle: "Event details",
            presentation: "modal",
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="member/[email]"
          options={{
            headerTitle: "Profile",
            // presentation: "modal",
            headerBackTitle: "Back",
            animation: "fade",
            headerRight: () => {
              if (user?.email === "test@email.com") {
                return;
              }
              return (
                <Link href="/edit-member" asChild>
                  <Pressable>{({ pressed }) => <AntDesign name="edit" size={20} color={colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
                </Link>
              );
            },
          }}
        />
        <Stack.Screen
          name="memo/[title]"
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
