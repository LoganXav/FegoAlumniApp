import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";
import { Text, useThemeColor } from "@/components/ui/themed";

export default function EventDetailScreen() {
  const [eventName, setEventName] = useState("");
  const backgroundColor = useThemeColor({}, "background");

  const handleSave = () => {};

  return (
    <View style={[styles.container, { backgroundColor }]}>
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
