import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import ImageUpload from "@/components/image-upload";
import MultiImageUpload from "@/components/image-upload/multi-image-upload";
import { useFormik } from "formik";
import * as yup from "yup";

export default function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      dateOfBirth: new Date(),
      bio: "",
      email: "",
      phoneNumber: "",
      address: "",
      currentEmployer: "",
      jobTitle: "",
      industry: "",
      networking: "no",
      preferredContact: "whatsapp",
      mentorship: "no",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      // gender: yup.string().required("Gender is required"),
      // dateOfBirth: yup.date().required("Date of birth is required"),
      // bio: yup.string(),
      // email: yup.string().email("Invalid email address").required("Email is required"),
      // phoneNumber: yup.string(),
      // currentEmployer: yup.string(),
      // networking: yup.string().required("Networking preference is required"),
      // preferredContact: yup.string().required("Preferred contact method is required"),
      // mentorship: yup.string().required("Mentorship preference is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || formik.values.dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    formik.setFieldValue("dateOfBirth", currentDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageUpload
          imagePreviewStyle={styles.imagePreview}
          imageStyle={styles.imagePreview}
          onImageSelect={() => null}
        />

        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>First Name</Text>
            <TextField
              placeholder="Type your first name"
              value={formik.values.firstName}
              onChangeText={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              error={formik.touched.firstName && formik.errors.firstName}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Last Name</Text>
            <TextField
              placeholder="Type your last name"
              value={formik.values.lastName}
              onChangeText={formik.handleChange("lastName")}
              onBlur={formik.handleBlur("lastName")}
              error={formik.touched.lastName && formik.errors.lastName}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Gender</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="male"
                status={
                  formik.values.gender === "male" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("gender", "male")}
              />
              <Text>Male</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="female"
                status={
                  formik.values.gender === "female" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("gender", "female")}
              />
              <Text>Female</Text>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Date of Birth</Text>
            <TextField
              placeholder="Select your date of birth"
              value={formik.values.dateOfBirth.toDateString()}
              onPressIn={() => setShowDatePicker(true)}
              error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            />
            {showDatePicker && (
              <DateTimePicker
                value={formik.values.dateOfBirth}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Bio</Text>
            <TextField
              placeholder="Type something fun about yourself"
              value={formik.values.bio}
              onChangeText={formik.handleChange("bio")}
              onBlur={formik.handleBlur("bio")}
              error={formik.touched.bio && formik.errors.bio}
            />
          </View>
          <Text style={styles.sectionHeader}>Contact Details</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextField
              placeholder="Type your email address"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              error={formik.touched.email && formik.errors.email}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Phone Number (Optional)</Text>
            <TextField
              placeholder="Type your phone number"
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange("phoneNumber")}
              onBlur={formik.handleBlur("phoneNumber")}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Address (Country, State, City)</Text>
            <TextField
              placeholder="Type your address"
              value={formik.values.address}
              onChangeText={formik.handleChange("address")}
              onBlur={formik.handleBlur("address")}
              error={formik.touched.address && formik.errors.address}
            />
          </View>
          <Text style={styles.sectionHeader}>Professional</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Current Employer (Optional)</Text>
            <TextField
              placeholder="Type your organization name"
              value={formik.values.currentEmployer}
              onChangeText={formik.handleChange("currentEmployer")}
              onBlur={formik.handleBlur("currentEmployer")}
              error={
                formik.touched.currentEmployer && formik.errors.currentEmployer
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Job Title (Optional)</Text>
            <TextField
              placeholder="Type your job title"
              value={formik.values.jobTitle}
              onChangeText={formik.handleChange("jobTitle")}
              onBlur={formik.handleBlur("jobTitle")}
              error={formik.touched.jobTitle && formik.errors.jobTitle}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Industry (Optional)</Text>
            <TextField
              placeholder="Type your organization's industry"
              value={formik.values.industry}
              onChangeText={formik.handleChange("industry")}
              onBlur={formik.handleBlur("industry")}
              error={formik.touched.industry && formik.errors.industry}
            />
          </View>
          <Text style={styles.sectionHeader}>Networking Preferences</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Open to networking?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="yes"
                status={
                  formik.values.networking === "yes" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("networking", "yes")}
              />
              <Text>Yes</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="no"
                status={
                  formik.values.networking === "no" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("networking", "no")}
              />
              <Text>No</Text>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>
              Preferred Contact Method (Calls/WhatsApp/Email)
            </Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="calls"
                status={
                  formik.values.preferredContact === "calls"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() =>
                  formik.setFieldValue("preferredContact", "calls")
                }
              />
              <Text>Calls</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="whatsapp"
                status={
                  formik.values.preferredContact === "whatsapp"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() =>
                  formik.setFieldValue("preferredContact", "whatsapp")
                }
              />
              <Text>WhatsApp</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="email"
                status={
                  formik.values.preferredContact === "email"
                    ? "checked"
                    : "unchecked"
                }
                onPress={() =>
                  formik.setFieldValue("preferredContact", "email")
                }
              />
              <Text>Email</Text>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Willing to Mentor or Coach?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="yes"
                status={
                  formik.values.mentorship === "yes" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("mentorship", "yes")}
              />
              <Text>Yes</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="no"
                status={
                  formik.values.mentorship === "no" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("mentorship", "no")}
              />
              <Text>No</Text>
            </View>
          </View>
          <Text style={styles.sectionHeader}>Gallery</Text>
          <MultiImageUpload imageLimit={5} />
        </View>

        <View style={styles.button}>
          <Button onPress={formik.handleSubmit} text="Update profile" />
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
    gap: 5,
  },
});
