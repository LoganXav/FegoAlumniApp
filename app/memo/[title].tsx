import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Platform, Image, Linking, TouchableOpacity, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View, useThemeColor } from "@/components/ui/themed";
import { AntDesign } from "@expo/vector-icons";

import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import { ActivityIndicator } from "react-native-paper";
import { formatDateTime } from "@/utils";

export default function MemoDetailScreen() {
  const { title } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const defaultBgColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const [isLoading, setIsLoading] = useState(true);

  const [memo, setMemo] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchMemo() {
      try {
        const docRef = doc(db, "memo", title);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.time && data.time.seconds) {
            const date = new Date(data.time.seconds * 1000 + data.time.nanoseconds / 1000000);
            data.time = formatDateTime(date);
          }

          setMemo(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error while fetching memo <---->", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMemo();
  }, [title]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={handleImagePress}>
        <View style={styles.coverImageContainer}>
          <Image source={memo?.imageUrl && { uri: memo?.imageUrl }} style={styles.coverImage} />
          <View style={styles.overlay} />
        </View>
      </TouchableOpacity>

      {isLoading ? (
        // Show loading spinner in the center of the screen
        <View style={[styles.loadingContainer, { backgroundColor }]}>
          <ActivityIndicator size="large" color={defaultBgColor} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>{memo?.title}</Text>
          <Text style={styles.desc}>{memo?.desc}</Text>

          <View style={styles.detailGroup}>
            <AntDesign name="calendar" size={15} color="grey" />
            <Text>{memo?.time}</Text>
          </View>

          <View>
            <Text style={styles.label}>Announcement</Text>
            <Text style={{ fontSize: 18 }}>{memo?.details}</Text>
          </View>
          {memo?.link && (
            <View style={styles.detailGroup}>
              <Text style={styles.label}>Related Link: </Text>
              <TouchableOpacity onPress={() => handleLinkPress(memo?.link)}>
                <Text style={styles.link}>{memo?.link}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}

      <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <AntDesign name="closecircle" size={30} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: memo?.imageUrl }} style={styles.fullscreenImage} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImageContainer: {
    width: "100%",
    height: 200,
  },
  coverImage: {
    width: "100%",
    height: 200,
    backgroundColor: "lightgray",
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
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  desc: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailGroup: {
    marginVertical: 15,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  link: {
    fontSize: 18,
    color: "#1e90ff",
    textDecorationLine: "underline",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
