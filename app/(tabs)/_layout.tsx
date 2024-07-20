import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
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
          headerRight: () => (
            <Link href="/add-event" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="calendar-plus-o" size={20} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="class"
        options={{
          headerTitle: "Class Directory",
          title: "Directory",
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          headerRight: () => (
            <Link href="/add-member" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="user-plus" size={20} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="memo"
        options={{
          headerTitle: "Announcements",
          title: "Memo",
          tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
          headerRight: () => (
            <Link href="/add-memo" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="plus-circle" size={25} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Link href="/edit-profile" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="edit" size={20} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
