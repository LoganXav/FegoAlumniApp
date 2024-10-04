import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/utils/use-color-scheme";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "@/contexts/auth-user-context";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { Pressable } from "@/components/ui/themed";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "auth",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JakartaSans: require("../assets/fonts/PlusJakartaSans-VariableFont.ttf"),
    JakartaSansBold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    JakartaSansExtraBold: require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
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
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
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
  const [authUser, setAuthUser] = useState<Record<string, any>>({});
  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    async function fetchMember() {
      try {
        const docRef = doc(db, "members", user?.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setAuthUser(data);
        } else {
          console.log("No such member!");
        }
      } catch (error) {
        console.error("Error while fetching member <---->", error);
      }
    }
    fetchMember();
  }, [user]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-event"
          options={{ headerBackTitle: "Back", headerTitle: "Add an event" }}
        />
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
              if (authUser?.hasAdmin !== "yes") {
                return;
              }
              return (
                <Link href="/edit-member" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <AntDesign
                        name="edit"
                        size={20}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: "transparent",
                        }}
                      />
                    )}
                  </Pressable>
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
