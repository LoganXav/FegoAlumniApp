import React, { useState } from "react";
import { Pressable, Text, TextField, View } from "@/components/ui/themed";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "@/components/ui/button";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSignIn = (values: any) => {
    console.log(values, "====");

    // router.push("/(tabs)")
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignIn(values)}
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
          <>
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Username</Text>
                <TextField
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholder="Enter your username"
                />
                {touched.username && errors.username && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.username}
                  </Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Password</Text>
                <TextField
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Enter your password"
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 14, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <Pressable style={styles.button}>
                <Button onPress={handleSubmit} text="Sign in" />
              </Pressable>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Pressable style={styles.socialButton} onPress={handleSignIn}>
                  <Button onPress={() => null} text="Sign in with Google" />
                </Pressable>
                <Pressable style={styles.socialButton} onPress={handleSignIn}>
                  <Button onPress={() => null} text="Sign in with Facebook" />
                </Pressable>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -0.4 * windowWidth },
      { translateY: -0.35 * windowHeight },
    ],
    borderRadius: 20,
    width: "80%",
    // height: "70%",
    backgroundColor: "red",
    justifyContent: "flex-end",
    gap: 10,
    paddingHorizontal: 10,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
  },
  socialButton: {
    gap: 5,
    // width: "50%",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
});
