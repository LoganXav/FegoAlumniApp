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

export default function AddMemberScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const [gender, setGender] = useState("male");
  const [hasAdmin, setHasAdmin] = useState("no");
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
          {/* <Text style={styles.sectionHeader}>Professional</Text>
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
          </View> */}

          <Text style={styles.sectionHeader}>Admin Priviledges</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Should have Admin Priviledges?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="yes" status={hasAdmin === "yes" ? "checked" : "unchecked"} onPress={() => setHasAdmin("yes")} />
              <Text>Yes</Text>
              <RadioButton.Android color={defaultBgColor} value="no" status={hasAdmin === "no" ? "checked" : "unchecked"} onPress={() => setHasAdmin("no")} />
              <Text>No</Text>
            </View>
          </View>
        </View>

        <View style={styles.button}>
          <Button onPress={() => null} text="Add Member" />
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
