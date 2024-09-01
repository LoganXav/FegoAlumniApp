import React, { useContext, useEffect, useState } from "react";
import { Link, router, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/utils/use-color-scheme";
import { useClientOnlyValue } from "@/utils/use-client-only-value";
import TabBar from "@/components/layout/tab-bar";
import { AntDesign } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "@/contexts/auth-user-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof AntDesign>["name"]; color: string }) {
  return <AntDesign size={18} style={{ marginBottom: 3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [authUser, setAuthUser] = useState<Record<string, any>>({});
  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    if (user === null) {
      const timer = setTimeout(() => {
        router.replace("/auth");
      }, 100); // Short delay to ensure navigation context is ready
      return () => clearTimeout(timer);
    } else {
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
    }
  }, [user]);

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Upcoming Events",
          title: "Events",
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          headerRight: () => {
            if (authUser?.hasAdmin !== "yes") {
              return;
            }
            return (
              <Link href="/add-event" asChild>
                <Pressable>{({ pressed }) => <AntDesign name="addfolder" size={20} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="class"
        options={{
          headerTitle: "Class Directory",
          title: "Directory",
          tabBarIcon: ({ color }) => <TabBarIcon name="team" color={color} />,
          headerRight: () => {
            if (authUser?.hasAdmin !== "yes") {
              return;
            }
            return (
              <Link href="/add-member" asChild>
                <Pressable>{({ pressed }) => <AntDesign name="adduser" size={20} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="memo"
        options={{
          headerTitle: "Announcements",
          title: "Memo",
          tabBarIcon: ({ color }) => <TabBarIcon name="notification" color={color} />,
          headerRight: () => {
            if (authUser?.hasAdmin !== "yes") {
              return;
            }
            return (
              <Link href="/add-memo" asChild>
                <Pressable>{({ pressed }) => <AntDesign name="pluscircleo" size={25} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          // headerShown: false,
          headerTitle: "My Profile",
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => {
            if (authUser?.hasAdmin !== "yes") {
              return;
            }
            return (
              <Link href="/edit-profile" asChild>
                <Pressable>{({ pressed }) => <AntDesign name="edit" size={20} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
              </Link>
            );
          },
        }}
      />
    </Tabs>
  );
}
