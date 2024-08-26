import React, { useContext, useState } from "react";
import { Pressable, Text, TextField, View, useThemeColor } from "@/components/ui/themed";
import { router } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "@/components/ui/button";
import { Dimensions } from "react-native";
import EventCoverImage from "@/assets/images/cover.jpg";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import { auth, db } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { AuthenticatedUserContext } from "@/contexts/auth-user-context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const borderColor = colors[colorScheme ?? "light"].grey;

  const validationSchema = yup.object().shape({
    email: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, values.email.trim(), values.password);

      const authUser = userCredential.user;

      setUser(authUser);

      setIsLoading(false);

      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      if (error instanceof FirebaseError) {
        alert("Invalid email or password");
      }
      console.error("<-- Error signing in -->", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverImageContainer}>
        <Image source={EventCoverImage} style={styles.coverImage} />
        <View style={styles.overlay} />
      </View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignIn(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <View style={[styles.form, { backgroundColor: "rgba(255,255,255,0.5)" }]}>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 20,
                  backgroundColor: "transparent",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>FEGO 81-83 A'LEVEL</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email</Text>
                <TextField style={{ borderColor: borderColor }} onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} placeholder="Enter your email address" />
                {touched.email && errors.email && <Text style={{ fontSize: 14, color: "red" }}>{errors.email}</Text>}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Password</Text>
                <TextField onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} placeholder="Enter your password" />
                {touched.password && errors.password && <Text style={{ fontSize: 14, color: "red" }}>{errors.password}</Text>}
              </View>
              <Pressable style={styles.button}>
                <Button onPress={() => handleSubmit()} text={isLoading ? "Loading..." : "Sign in"} />
              </Pressable>

              <Pressable style={styles.socialButton} onPress={() => null}>
                <Button onPress={() => console.log("Sign in with google")} text="Sign in with Google" />
              </Pressable>
              <Pressable style={styles.socialButton} onPress={() => null}>
                <Button onPress={() => console.log("sign in with facebook")} text="Sign in with Facebook" />
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImageContainer: {
    width: "100%",
    height: "100%",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // positions the overlay to cover the entire image
    backgroundColor: "rgba(3, 138, 255, 0.1)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
  },
  form: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -0.4 * windowWidth }, { translateY: -0.35 * windowHeight }],
    borderRadius: 20,
    width: "80%",
    // height: "70%",
    justifyContent: "flex-end",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  formGroup: {
    gap: 8,
    backgroundColor: "transparent",
  },
  formLabel: {
    fontSize: 14,
    color: "white",
  },
  socialButton: {
    gap: 5,
    backgroundColor: "transparent",
    // width: "50%",
  },
  button: {
    alignItems: "center",
    // marginTop: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
});
