import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../ui/themed";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "@/utils/use-color-scheme";
import colors from "@/constants/colors";

export default function MultiImageUpload({ onImageSelect, imageLimit }: { onImageSelect: (uri: string[]) => void; imageLimit: number }) {
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  const defaultBgColor = colors[colorScheme ?? "light"].tabIconSelected;

  const pickGalleryImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      const newPhotos = [...galleryPhotos, ...selectedUris].slice(0, imageLimit);
      setGalleryPhotos(newPhotos);
      onImageSelect(newPhotos);
    }
  };

  const removeGalleryImage = (uri: string) => {
    const updatedPhotos = galleryPhotos.filter((photo) => photo !== uri);
    setGalleryPhotos(updatedPhotos);
    onImageSelect(updatedPhotos);
  };

  return (
    <>
      <FlatList
        data={galleryPhotos}
        renderItem={({ item }) => (
          <View style={styles.galleryImageContainer}>
            <Image source={{ uri: item }} style={styles.galleryImage} />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeGalleryImage(item)}>
              <AntDesign name="closecircleo" size={15} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
      {/* <Button onPress={pickGalleryImage} text="Add Photo" disabled={galleryPhotos.length >= imageLimit} /> */}
      <TouchableOpacity style={styles.addButton} onPress={pickGalleryImage}>
        <AntDesign name="pluscircleo" size={24} color={defaultBgColor} />
        <Text style={styles.addButtonText}>Add Photo</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  galleryImageContainer: {
    position: "relative",
    marginRight: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 2,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
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
});
