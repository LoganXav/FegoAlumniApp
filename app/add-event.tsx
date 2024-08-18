// @ts-nocheck
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import colors from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign for icons

export default function AddEventScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const [showDatePicker, setShowDatePicker] = useState(false);

  // New State Variables for Event Form
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [activities, setActivities] = useState([{ title: "", startTime: new Date(), endTime: new Date() }]);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
  };

  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const handleActivityChange = (index: number, key: string, value: any) => {
    const updatedActivities = [...activities];
    updatedActivities[index][key] = value;
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    setActivities([...activities, { title: "", startTime: new Date(), endTime: new Date() }]);
  };

  const deleteActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Event Details</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Event Title</Text>
            <TextField placeholder="Enter the event title" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Venue</Text>
            <TextField placeholder="Enter the event venue" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Start Date</Text>
            <TextField placeholder="Select the start date" value={startDate.toDateString()} />
            {showDatePicker === "start" && <DateTimePicker value={startDate} mode="date" display="default" onChange={onChangeStartDate} />}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>End Date</Text>
            <TextField placeholder="Select the end date" value={endDate.toDateString()} />
            {showDatePicker === "end" && <DateTimePicker value={endDate} mode="date" display="default" onChange={onChangeEndDate} />}
          </View>

          <Text style={styles.sectionHeader}>Day Activities</Text>
          {activities.map((activity, index) => (
            <View key={index} style={styles.activityContainer}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>Activity {index + 1}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteActivity(index)}>
                  <AntDesign name="delete" size={20} color="red" />
                  <Text style={styles.deleteButtonText}>Remove Activity</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Activity Title</Text>
                <TextField placeholder="Enter the activity title" value={activity.title} onChangeText={(text) => handleActivityChange(index, "title", text)} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Start Time</Text>
                <TextField placeholder="Select the start time" value={activity.startTime.toLocaleTimeString()} />
                {showDatePicker === `startTime-${index}` && <DateTimePicker value={activity.startTime} mode="time" display="default" onChange={(event, selectedTime) => handleActivityChange(index, "startTime", selectedTime)} />}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>End Time</Text>
                <TextField placeholder="Select the end time" value={activity.endTime.toLocaleTimeString()} />
                {showDatePicker === `endTime-${index}` && <DateTimePicker value={activity.endTime} mode="time" display="default" onChange={(event, selectedTime) => handleActivityChange(index, "endTime", selectedTime)} />}
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addActivity}>
            <AntDesign name="pluscircleo" size={24} color={defaultBgColor} />
            <Text style={styles.addButtonText}>Add Another Activity</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerButton}>
          <Button onPress={() => null} text="Register Event" />
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
  activityContainer: {
    paddingTop: 15,
    borderRadius: 8,
    marginBottom: 10,
    gap: 10,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  deleteButton: {
    flexDirection: "row",
  },
  registerButton: {
    position: "absolute",
    bottom: 25,
    marginHorizontal: 20,
    width: "100%",
  },
});
