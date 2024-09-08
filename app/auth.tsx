import React, { useCallback, useContext, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextField, View } from "@/components/ui/themed";
import { router } from "expo-router";
import { Alert, Image, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
// import Button from "@/components/ui/button";
// import { Dimensions } from "react-native";
import EventCoverImage from "@/assets/images/cover.avif";
import LogoImage from "@/assets/images/logo.png";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";
import { auth, db } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { AuthenticatedUserContext } from "@/contexts/auth-user-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const borderColor = colors[colorScheme ?? "light"].grey;
  const backgroundColor = colors[colorScheme ?? "light"].tabIconSelected;

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "81%"], []);

  const handleSheetChange = useCallback((index: number) => {
    console.log("BottomSheet position changed:", index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, values.email.trim(), values.password);

      const authUser = userCredential?.user;

      setUser(authUser);

      setIsLoading(false);

      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      if (error instanceof FirebaseError) {
        Alert.alert("Invalid email or password");
      }
      console.error("<-- Error signing in -->", error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.coverImageContainer}>
          <Image source={EventCoverImage} style={styles.coverImage} />
          <View style={styles.overlay} />
        </View>
        <View style={styles.logoImageContainer}>
          <Image source={LogoImage} style={styles.logoImage} />
        </View>
        <View style={styles.logoText}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: 500, textAlign: "center" }}>FEGO 81-83 A'level Set</Text>
        </View>
        {/* <View style={styles.introText}>
          <Text style={{ color: "white", fontSize: 65, fontFamily: "JakartaBold", lineHeight: 65 }}>The future is ours to live</Text>
        </View> */}

        <View style={styles.getStarted}>
          <View />
          <Pressable style={styles.socialButton} onPress={() => handleSnapPress(0)}>
            <View style={[styles.getStartedButton, { backgroundColor }]}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>Get Started</Text>
            </View>
          </Pressable>
        </View>

        <BottomSheet ref={sheetRef} snapPoints={snapPoints} onChange={handleSheetChange} enablePanDownToClose={true}>
          <BottomSheetView style={styles.contentContainer}>
            <Text style={[styles.sheetHeader, { borderColor }]}>Let's get started</Text>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSignIn(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.form}>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextField style={{ borderColor: borderColor, color: "black" }} onChangeText={handleChange("email")} onFocus={() => handleSnapPress(1)} onBlur={() => handleBlur("email")} value={values.email} placeholder="Enter your email address" />
                    {touched.email && errors.email && <Text style={{ fontSize: 14, color: "red" }}>{errors.email}</Text>}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Password</Text>
                    <TextField style={{ color: "black" }} onChangeText={handleChange("password")} onFocus={() => handleSnapPress(1)} onBlur={handleBlur("password")} value={values.password} placeholder="Enter your password" />
                    {touched.password && errors.password && <Text style={{ fontSize: 14, color: "red" }}>{errors.password}</Text>}
                  </View>

                  <View style={styles.socialButtonContainer}>
                    <Pressable style={styles.socialButton} disabled={isLoading} onPress={() => handleSubmit()}>
                      <View style={[styles.getStartedButton, { backgroundColor }]}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>Sign in</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
            <View style={{ width: "100%", height: "100%", marginTop: 50 }}>
              <Image source={LogoImage} style={styles.bottomImage} />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
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
  logoImageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    top: "15%",
    backgroundColor: "transparent",
  },
  logoImage: {
    marginHorizontal: "auto",
    width: "30%",
    height: "20%",
  },
  bottomImage: {
    marginHorizontal: "auto",
    width: "30%",
    height: "20%",
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
  logoText: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    top: "35%",
    backgroundColor: "transparent",
  },
  introText: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    bottom: "25%",
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  getStarted: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "10%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
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
  getStartedButton: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 20,
    width: "100%",
  },

  sheetHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  socialButtonContainer: {
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  form: {
    width: "80%",
    gap: 10,
    backgroundColor: "transparent",
  },
  formGroup: {
    gap: 8,
    backgroundColor: "transparent",
  },
  formLabel: {
    fontSize: 14,
    color: "black",
  },
});
