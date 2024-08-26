import { Stack } from "expo-router";
import React from "react";

function ProtectedStack() {
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-event" options={{ headerBackTitle: "Back", headerTitle: "Add an event", headerShown: false }} />
      <Stack.Screen
        name="add-member"
        options={{
          headerBackTitle: "Back",
          headerTitle: "Add a new member",
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
  );
}

export default ProtectedStack;
