import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";

export default function AddEventScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill out this form to register a new event</Text>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.formText}>Event Title</Text>
          <TextField placeholder="What is the name of the event?" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formText}>Event Title</Text>
          <TextField placeholder="What is the name of the event?" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formText}>Event Title</Text>
          <TextField placeholder="What is the name of the event?" />
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={() => null} text="Add Event" />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
  },
  button: {
    position: "absolute",
    bottom: 25,
    marginHorizontal: 20,
    width: "100%",
  },
  form: {
    marginVertical: 30,
    gap: 10,
  },
  formGroup: {
    gap: 8,
  },
  formText: {
    fontSize: 16,
  },
});
