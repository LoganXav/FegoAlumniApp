import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import ImageUpload from "@/components/image-upload";
import MultiImageUpload from "@/components/image-upload/multi-image-upload";

export default function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const [gender, setGender] = useState("male");
  const [preferredContact, setPreferredContact] = useState("whatsapp");
  const [networking, setNetworking] = useState("no");
  const [mentorship, setMentorship] = useState("no");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageUpload imagePreviewStyle={styles.imagePreview} imageStyle={styles.imagePreview} onImageSelect={() => null} />

        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>First Name</Text>
            <TextField placeholder="Type your first name" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Last Name</Text>
            <TextField placeholder="Type your last name" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Gender</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="male" status={gender === "male" ? "checked" : "unchecked"} onPress={() => setGender("male")} />
              <Text>Male</Text>
              <RadioButton.Android color={defaultBgColor} value="female" status={gender === "female" ? "checked" : "unchecked"} onPress={() => setGender("female")} />
              <Text>Female</Text>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Date of Birth</Text>
            <TextField placeholder="Select your date of birth" value={dateOfBirth.toDateString()} onPressIn={() => setShowDatePicker(true)} />
            {showDatePicker && <DateTimePicker value={dateOfBirth} mode="date" display="default" onChange={onChangeDate} />}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Bio</Text>
            <TextField placeholder="Type something fun about yourself" />
          </View>
          <Text style={styles.sectionHeader}>Contact Details</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextField placeholder="Type your email address" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Phone Number (Optional)</Text>
            <TextField placeholder="Type your phone number" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Address (Country, State, City)</Text>
            <TextField placeholder="Type your address" />
          </View>
          <Text style={styles.sectionHeader}>Professional</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Current Employer (Optional)</Text>
            <TextField placeholder="Type your organization name" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Job Title</Text>
            <TextField placeholder="Type your job title" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Industry</Text>
            <TextField placeholder="Type your organization's industry" />
          </View>
          <Text style={styles.sectionHeader}>Networking Preferences</Text>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Open to networking?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="yes" status={networking === "yes" ? "checked" : "unchecked"} onPress={() => setNetworking("yes")} />
              <Text>Yes</Text>
              <RadioButton.Android color={defaultBgColor} value="no" status={networking === "no" ? "checked" : "unchecked"} onPress={() => setNetworking("no")} />
              <Text>No</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Preferred Contact Method (Calls/WhatsApp/Email)</Text>

            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="calls" status={preferredContact === "calls" ? "checked" : "unchecked"} onPress={() => setPreferredContact("calls")} />
              <Text>Calls</Text>
              <RadioButton.Android color={defaultBgColor} value="whatsapp" status={preferredContact === "whatsapp" ? "checked" : "unchecked"} onPress={() => setPreferredContact("whatsapp")} />
              <Text>WhatsApp</Text>
              <RadioButton.Android color={defaultBgColor} value="email" status={preferredContact === "email" ? "checked" : "unchecked"} onPress={() => setPreferredContact("email")} />
              <Text>Email</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Willing to Mentor or Coach?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="yes" status={mentorship === "yes" ? "checked" : "unchecked"} onPress={() => setMentorship("yes")} />
              <Text>Yes</Text>
              <RadioButton.Android color={defaultBgColor} value="no" status={mentorship === "no" ? "checked" : "unchecked"} onPress={() => setMentorship("no")} />
              <Text>No</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Gallery</Text>
          <MultiImageUpload imageLimit={3} />
        </View>

        <View style={styles.button}>
          <Button onPress={() => null} text="Update Profile" />
        </View>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: 160,
    aspectRatio: 1,
    borderRadius: 100,
  },
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 20,
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
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
