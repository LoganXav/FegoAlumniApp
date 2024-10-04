import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";
import { Text, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import * as yup from "yup";
import { useFormik } from "formik";
import { auth, db } from "../firebase/firebaseConfig";
import {
  and,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { REGULAR_PASSWORD } from "@/constants/auth";
import { ADMIN_PASSWORD } from "@/constants/auth";

export default function AddMemberScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = async (values: any) => {
    try {
      setIsLoading(true);
      const formattedDate = new Date(values.dateOfBirth)
        .toISOString()
        .split("T")[0];

      const eventsRef = collection(db, "members");
      const q = query(eventsRef, where("email", "==", values.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert(`An member with this email already exists.`);
        setIsLoading(false);
        return;
      }

      await setDoc(doc(db, "members", values.email), {
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        house: values.house,
        dateOfBirth: formattedDate,
        email: values.email.trim(),
        phoneNumber: values.phoneNumber,
        address: values.address,
        hasAdmin: values.hasAdmin,
        isDeceased: values.isDeceased,
      });

      createUserWithEmailAndPassword(
        auth,
        values?.email,
        values.hasAdmin === "yes" ? ADMIN_PASSWORD : REGULAR_PASSWORD,
      );

      setIsLoading(false);

      router.push("/class");
    } catch (error) {
      setIsLoading(false);
      console.error("Error while adding member", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      gender: "male",
      house: "",
      dateOfBirth: new Date(),
      email: "",
      phoneNumber: "",
      address: "",
      hasAdmin: "no",
      isDeceased: "no",
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      // gender: yup.string().required("Gender is required"),
      // dateOfBirth: yup.date().required("Date of birth is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      // phoneNumber: yup.string(),
      // address: yup.string().required("Address is required"),
      hasAdmin: yup.string().required("Admin privileges selection is required"),
      isDeceased: yup.string().required("Life status selection is required"),
    }),
    onSubmit: (values) => {
      handleAddUser(values);
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
        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Title</Text>
            <TextField
              placeholder="Type your title (e.g Mr, Mrs, Engr, Chief)"
              value={formik.values.title}
              onChangeText={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("title")}
              error={formik.touched.title && formik.errors.title}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>First Name</Text>
            <TextField
              placeholder="Type your name"
              value={formik.values.firstName}
              onChangeText={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              error={formik.touched.firstName && formik.errors.firstName}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Last Name</Text>
            <TextField
              placeholder="Type your name"
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
            <Text style={styles.formLabel}>School House</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="Chad"
                status={
                  formik.values.house === "Chad" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("house", "Chad")}
              />
              <Text>Chad</Text>

              <RadioButton.Android
                color={defaultBgColor}
                value="Cross"
                status={
                  formik.values.house === "Cross" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("house", "Cross")}
              />
              <Text>Cross</Text>

              <RadioButton.Android
                color={defaultBgColor}
                value="Niger"
                status={
                  formik.values.house === "Niger" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("house", "Niger")}
              />
              <Text>Niger</Text>

              <RadioButton.Android
                color={defaultBgColor}
                value="Osun"
                status={
                  formik.values.house === "Osun" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("house", "Osun")}
              />
              <Text>Osun</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Date of Birth</Text>
            <TextField
              placeholder="Select your date of birth"
              value={formik.values.dateOfBirth.toDateString()}
              onPressIn={() => setShowDatePicker(true)}
              onBlur={formik.handleBlur("dateOfBirth")}
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
              placeholder="Type your address (e.g. Lagos, Nigeria)"
              value={formik.values.address}
              onChangeText={formik.handleChange("address")}
              onBlur={formik.handleBlur("address")}
              error={formik.touched.address && formik.errors.address}
            />
          </View>

          <Text style={styles.sectionHeader}>Admin Privileges</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Should have Admin Privileges?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="yes"
                status={
                  formik.values.hasAdmin === "yes" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("hasAdmin", "yes")}
              />
              <Text>Yes</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="no"
                status={
                  formik.values.hasAdmin === "no" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("hasAdmin", "no")}
              />
              <Text>No</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Life Status</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Is this member still with us?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                color={defaultBgColor}
                value="yes"
                status={
                  formik.values.isDeceased === "yes" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("isDeceased", "yes")}
              />
              <Text>Yes</Text>
              <RadioButton.Android
                color={defaultBgColor}
                value="no"
                status={
                  formik.values.isDeceased === "no" ? "checked" : "unchecked"
                }
                onPress={() => formik.setFieldValue("isDeceased", "no")}
              />
              <Text>No</Text>
            </View>
          </View>
        </View>

        <View style={styles.button}>
          <Button
            disabled={isLoading}
            onPress={formik.handleSubmit}
            text={isLoading ? "Loading..." : "Add member"}
          />
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
