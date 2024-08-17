// @ts-nocheck
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { Text, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import colors from "@/constants/colors";

export default function AddEventScreen() {
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
        <Text style={styles.title}>Fill out this form to register a new event</Text>

        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>First Name</Text>
            <TextField placeholder="Type your name" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Last Name</Text>
            <TextField placeholder="Type your name" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Gender</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android value="male" color={defaultBgColor} status={gender === "male" ? "checked" : "unchecked"} onPress={() => setGender("male")} />
              <Text>Male</Text>
              <RadioButton.Android value="female" color={defaultBgColor} status={gender === "female" ? "checked" : "unchecked"} onPress={() => setGender("female")} />
              <Text>Female</Text>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Date of Birth</Text>
            <TextField placeholder="Select your date of birth" value={dateOfBirth.toDateString()} onPressIn={() => setShowDatePicker(true)} />
            {showDatePicker && <DateTimePicker value={dateOfBirth} mode="date" display="default" onChange={onChangeDate} />}
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
              <RadioButton.Android value="yes" color={defaultBgColor} status={networking === "yes" ? "checked" : "unchecked"} onPress={() => setNetworking("yes")} />
              <Text>Yes</Text>
              <RadioButton.Android value="no" color={defaultBgColor} status={networking === "no" ? "checked" : "unchecked"} onPress={() => setNetworking("no")} />
              <Text>No</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Preferred Contact Method (Calls/WhatsApp/Email)</Text>

            <View style={styles.radioGroup}>
              <RadioButton.Android value="calls" color={defaultBgColor} status={preferredContact === "calls" ? "checked" : "unchecked"} onPress={() => setPreferredContact("calls")} />
              <Text>Calls</Text>
              <RadioButton.Android value="whatsapp" color={defaultBgColor} status={preferredContact === "whatsapp" ? "checked" : "unchecked"} onPress={() => setPreferredContact("whatsapp")} />
              <Text>WhatsApp</Text>
              <RadioButton.Android value="email" color={defaultBgColor} status={preferredContact === "email" ? "checked" : "unchecked"} onPress={() => setPreferredContact("email")} />
              <Text>Email</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Willingness to Mentor or Coach</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android value="yes" color={defaultBgColor} status={mentorship === "yes" ? "checked" : "unchecked"} onPress={() => setMentorship("yes")} />
              <Text>Yes</Text>
              <RadioButton.Android value="no" color={defaultBgColor} status={mentorship === "no" ? "checked" : "unchecked"} onPress={() => setMentorship("no")} />
              <Text>No</Text>
            </View>
          </View>
        </View>

        <View style={styles.button}>
          <Button onPress={() => null} text="Add Event" />
        </View>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
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
    paddingTop: 30,
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
    marginVertical: 30,
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
  radio: {
    color: "#6200ee", // Set a color for the radio button (e.g., purple)
  },
});
