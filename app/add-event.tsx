import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, TextArea, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign for icons
import * as yup from "yup";
import { Formik } from "formik";

export default function AddEventScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const [showDatePicker, setShowDatePicker] =
    useState<React.SetStateAction<any>>();

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    venue: yup.string().required("Venue is required"),
    tagline: yup.string().required("Tagline is required"),
    description: yup.string().required("Description is required"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup
      .date()
      .required("End date is required")
      .min(yup.ref("startDate"), "End date must be after start date"), // Custom condition for date
    activities: yup.array().of(
      yup.object().shape({
        title: yup.string().required("Activity title is required"),
        startTime: yup.date().required("Start time is required"),
        endTime: yup
          .date()
          .required("End time is required")
          .test(
            "is-after-start",
            "End time must be after start time",
            function (value) {
              return value > this.parent.startTime; // Custom condition for time
            },
          ),
      }),
    ),
  });

  const handleAddEvent = (values) => {
    console.log(values, "====");
  };

  return (
    <Formik
      initialValues={{
        title: "",
        venue: "",
        tagline: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        activities: [{ title: "", startTime: new Date(), endTime: new Date() }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleAddEvent(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.form}>
              <Text style={styles.sectionHeader}>Event Details</Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Event Title</Text>
                <TextField
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  value={values.title}
                  placeholder="Enter the event title"
                />
                {touched.title && errors.title && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.title}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Venue</Text>
                <TextField
                  onChangeText={handleChange("venue")}
                  onBlur={handleBlur("venue")}
                  value={values.venue}
                  placeholder="Enter the event venue"
                />
                {touched.venue && errors.venue && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.venue}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Event Tagline</Text>
                <TextField
                  onChangeText={handleChange("tagline")}
                  onBlur={handleBlur("tagline")}
                  value={values.tagline}
                  placeholder="Provide the event tagline here."
                />
                {touched.tagline && errors.tagline && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.tagline}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Event Description</Text>
                <TextArea
                  maxLength={500}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  placeholder="Provide the event description here..."
                />
                {touched.description && errors.description && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.description}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Start Date</Text>
                <TextField
                  placeholder="Select the start date"
                  value={values.startDate.toDateString()}
                  onFocus={() => setShowDatePicker("start")}
                />
                {touched.startDate && typeof errors.startDate === "string" && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.startDate}
                  </Text>
                )}
                {showDatePicker === "start" && (
                  <DateTimePicker
                    value={values.startDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setFieldValue(
                        "startDate",
                        selectedDate || values.startDate,
                      );
                      setShowDatePicker(null);
                    }}
                  />
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>End Date</Text>
                <TextField
                  placeholder="Select the end date"
                  value={values.endDate.toDateString()}
                  onFocus={() => setShowDatePicker("end")}
                />
                {touched.endDate && typeof errors.endDate === "string" && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.endDate}
                  </Text>
                )}
                {showDatePicker === "end" && (
                  <DateTimePicker
                    value={values.endDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setFieldValue("endDate", selectedDate || values.endDate);
                      setShowDatePicker(null);
                    }}
                  />
                )}
              </View>

              <Text style={styles.sectionHeader}>Day Activities</Text>
              {values.activities.map((activity, index) => (
                <View key={index} style={styles.activityContainer}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>
                      Activity {index + 1}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        const updatedActivities = values.activities.filter(
                          (_, i) => i !== index,
                        );
                        setFieldValue("activities", updatedActivities);
                      }}
                    >
                      <AntDesign name="closecircleo" size={20} color="red" />
                      <Text style={styles.deleteButtonText}>
                        Remove Activity
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Activity Title</Text>
                    <TextField
                      onChangeText={handleChange(`activities[${index}].title`)}
                      onBlur={handleBlur(`activities[${index}].title`)}
                      value={activity.title}
                      placeholder="Enter the activity title"
                    />
                    {touched.activities?.[index]?.title &&
                      typeof errors.activities?.[index] === "object" &&
                      errors.activities?.[index]?.title && (
                        <Text style={{ fontSize: 14, color: "red" }}>
                          {errors.activities[index].title}
                        </Text>
                      )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Start Time</Text>
                    <TextField
                      placeholder="Select the start time"
                      value={activity.startTime.toLocaleTimeString()}
                      onFocus={() => setShowDatePicker(`startTime-${index}`)}
                    />
                    {touched.activities?.[index]?.startTime &&
                      typeof errors.activities?.[index] === "object" &&
                      typeof errors.activities?.[index].startTime ===
                        "string" && (
                        <Text style={{ fontSize: 14, color: "red" }}>
                          {errors.activities[index].startTime}
                        </Text>
                      )}
                    {showDatePicker === `startTime-${index}` && (
                      <DateTimePicker
                        value={activity.startTime}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                          const updatedActivities = [...values.activities];
                          updatedActivities[index].startTime =
                            selectedTime || activity.startTime;
                          setFieldValue("activities", updatedActivities);
                          setShowDatePicker(null);
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>End Time</Text>
                    <TextField
                      placeholder="Select the end time"
                      value={activity.endTime.toLocaleTimeString()}
                      onFocus={() => setShowDatePicker(`endTime-${index}`)}
                    />
                    {touched.activities?.[index]?.endTime &&
                      typeof errors.activities?.[index] === "object" &&
                      typeof errors.activities?.[index].endTime ===
                        "string" && (
                        <Text style={{ fontSize: 14, color: "red" }}>
                          {errors.activities[index].endTime}
                        </Text>
                      )}
                    {showDatePicker === `endTime-${index}` && (
                      <DateTimePicker
                        value={activity.endTime}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                          const updatedActivities = [...values.activities];
                          updatedActivities[index].endTime =
                            selectedTime || activity.endTime;
                          setFieldValue("activities", updatedActivities);
                          setShowDatePicker(null);
                        }}
                      />
                    )}
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  setFieldValue("activities", [
                    ...values.activities,
                    { title: "", startTime: new Date(), endTime: new Date() },
                  ])
                }
              >
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={defaultBgColor}
                />
                <Text style={styles.addButtonText}>Add Another Activity</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerButton}>
              <Button onPress={handleSubmit} text="Register event" />
            </View>

            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          </ScrollView>
        </View>
      )}
    </Formik>
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
    alignItems: "center",
  },
  registerButton: {
    position: "absolute",
    bottom: 25,
    marginHorizontal: 20,
    width: "100%",
  },
});
