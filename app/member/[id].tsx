import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useThemeColor } from "@/components/ui/themed";

export default function MemberDetailsScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const handleSave = () => {};

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.label}>Member Name</Text>
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
