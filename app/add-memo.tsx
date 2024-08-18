import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";

import { Text, TextArea, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";

export default function AddMemoScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Announcement Title</Text>
            <TextField placeholder="What is the title of the announcement?" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Announcement Description</Text>
            <TextField placeholder="Type a short description of the announcement" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Link (Optional)</Text>
            <TextField placeholder="Enter a link related to the announcement" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Announcement Details</Text>
            <TextArea maxLength={500} placeholder="Provide the announcement details here..." />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Picture (Optional)</Text>
            <ImageUpload onImageSelect={() => null} />
          </View>
        </View>
        <View style={styles.button}>
          <Button onPress={() => null} text="Publish Announcement" />
        </View>

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 100,
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
    marginBottom: 30,
    gap: 10,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
  },
});
