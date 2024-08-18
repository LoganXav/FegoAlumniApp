import React, { useState } from "react";
import { Image, StyleSheet, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text, View } from "@/components/ui/themed"; // Assuming you're using the Text component from your UI library
import Button from "../ui/button";

type ImageUploadProps = {
  onImageSelect: (uri: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageSelection = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert("Permission Denied", "You need to grant permission to access the media library.");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setImageUri(pickerResult.assets[0].uri);
        onImageSelect(pickerResult.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleCapturePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert("Permission Denied", "You need to grant permission to access the camera.");
        return;
      }

      const cameraResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!cameraResult.canceled) {
        setImageUri(cameraResult.assets[0].uri);
        onImageSelect(cameraResult.assets[0].uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>{imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <Text style={styles.placeholderText}>No image selected</Text>}</View>
      <View style={styles.buttonContainer}>
        <Button text="Select Image" onPress={handleImageSelection} />
        <Button text="Use Camera" onPress={handleCapturePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholderText: {
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});

export default ImageUpload;
