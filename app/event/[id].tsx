import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";
import { Text, useThemeColor } from "@/components/Themed";
import { Link, router } from "expo-router";

export default function EventDetailScreen({ navigation }: { navigation: any }) {
  const [eventName, setEventName] = useState("");
  const backgroundColor = useThemeColor({}, "background");

  const isPresented = router.canGoBack();

  const handleSave = () => {
    // Handle saving the event (e.g., send to API or state management)
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {!isPresented && <Link href="/">Dismiss</Link>}
      <Text style={styles.label}>Event Name</Text>
      <TextInput style={[styles.input, {}]} placeholder="Enter event name" value={eventName} onChangeText={setEventName} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
