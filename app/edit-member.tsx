import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import * as yup from "yup";
import { useFormik } from "formik";
import { db } from "../firebase/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { router } from "expo-router";
import { useUserStore } from "@/store";

export default function EditMemberScreen() {
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const { email, clearEmail } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleEditUser = async (values: any) => {
    try {
      setIsLoading(true);

      if (!email) {
        Alert.alert("Something went wrong!");
        router.push("/class");
        return;
      }

      const userRef = doc(db, "members", email);
      await updateDoc(userRef, {
        hasAdmin: values.hasAdmin,
        isDeceased: values.isDeceased,
      });

      clearEmail();
      setIsLoading(false);

      router.push("/class");
    } catch (error) {
      setIsLoading(false);
      console.error("Error while updating member", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!email) {
      Alert.alert("Something went wrong!");
      router.push("/class");
      return;
    }

    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this member?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              setIsLoading(true);

              const userRef = doc(db, "members", email);
              await deleteDoc(userRef);

              Alert.alert("Success", "User deleted successfully");
              clearEmail(); // Clear the email from the store
              setIsLoading(false);
            } catch (error) {
              setIsLoading(false);
              console.error("Error while deleting member", error);
              Alert.alert("Error", "Failed to delete user");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const formik = useFormik({
    initialValues: {
      hasAdmin: "no",
      isDeceased: "yes",
    },
    validationSchema: yup.object().shape({
      hasAdmin: yup.string().required("Admin privileges selection is required"),
      isDeceased: yup.string().required("Life status selection is required"),
    }),
    onSubmit: (values) => {
      handleEditUser(values);
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Admin Privileges</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Should have Admin Privileges?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="yes" status={formik.values.hasAdmin === "yes" ? "checked" : "unchecked"} onPress={() => formik.setFieldValue("hasAdmin", "yes")} />
              <Text>Yes</Text>
              <RadioButton.Android color={defaultBgColor} value="no" status={formik.values.hasAdmin === "no" ? "checked" : "unchecked"} onPress={() => formik.setFieldValue("hasAdmin", "no")} />
              <Text>No</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Life Status</Text>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Is this member still with us?</Text>
            <View style={styles.radioGroup}>
              <RadioButton.Android color={defaultBgColor} value="yes" status={formik.values.isDeceased === "yes" ? "checked" : "unchecked"} onPress={() => formik.setFieldValue("isDeceased", "yes")} />
              <Text>Yes</Text>
              <RadioButton.Android color={defaultBgColor} value="no" status={formik.values.isDeceased === "no" ? "checked" : "unchecked"} onPress={() => formik.setFieldValue("isDeceased", "no")} />
              <Text>No</Text>
            </View>
          </View>
          <View style={{ paddingTop: 30 }}>
            <Button bgColor="red" disabled={isLoading} onPress={handleDeleteUser} text={"Delete member"} />
          </View>
        </View>

        <View style={styles.button}>
          <Button disabled={isLoading} onPress={formik.handleSubmit} text={isLoading ? "Loading..." : "Update profile"} />
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
