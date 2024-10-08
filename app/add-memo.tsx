import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";

import { Text, TextArea, TextField, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import { router } from "expo-router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fetchImageAsBlob } from "@/utils";

export default function AddMemoScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleAddAnnouncement = async (values: any) => {
    try {
      setIsLoading(true);

      let imageUrl = null;

      if (imageUri) {
        const storageRef = ref(storage, `announcements/${values.title}-${Date.now()}`);
        const uploadResult = await uploadBytes(storageRef, await fetchImageAsBlob(imageUri));
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      await setDoc(doc(db, "memo", values.title), {
        title: values.title.trim(),
        desc: values.desc,
        link: values.link,
        details: values.details,
        time: new Date(),
        imageUrl,
      });
      setIsLoading(false);

      router.push("/memo");
    } catch (error) {
      setIsLoading(false);
      console.error("Error while adding memo", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      link: "",
      details: "",
      time: new Date(),
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Announcement title is required"),
      desc: yup.string().required("Announcement description is required"),
      details: yup.string().required("Announcement details is required"),
    }),
    onSubmit: (values) => {
      handleAddAnnouncement(values);
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Announcement Title</Text>
            <TextField value={formik.values.title} onChangeText={formik.handleChange("title")} onBlur={formik.handleBlur("title")} error={formik.touched.title && formik.errors.title} placeholder="What is the title of the announcement?" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Announcement Description</Text>
            <TextField value={formik.values.desc} onChangeText={formik.handleChange("desc")} onBlur={formik.handleBlur("desc")} error={formik.touched.desc && formik.errors.desc} placeholder="Type a short description of the announcement" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Link (Optional)</Text>
            <TextField value={formik.values.link} onChangeText={formik.handleChange("link")} onBlur={formik.handleBlur("link")} error={formik.touched.link && formik.errors.link} placeholder="Enter a link related to the announcement" />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Announcement Details</Text>
            <TextArea maxLength={500} value={formik.values.details} onChangeText={formik.handleChange("details")} onBlur={formik.handleBlur("details")} error={formik.touched.details && formik.errors.details} placeholder="Provide the announcement details here..." />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Picture (Optional)</Text>
            <ImageUpload onImageSelect={setImageUri} />
          </View>
        </View>
        <View style={styles.button}>
          <Button onPress={formik.handleSubmit} text={isLoading ? "Loading..." : "Publish announcement"} />
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
});
