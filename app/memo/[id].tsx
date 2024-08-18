import React from "react";
import { StyleSheet, ScrollView, Platform, Image, Linking, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View, useThemeColor } from "@/components/ui/themed";
import { AntDesign } from "@expo/vector-icons";
import EventCoverImage from "@/assets/images/cover.jpg";

export default function MemoDetailScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const announcement = {
    title: "SAMPLE ANNOUNCEMENT",
    desc: "This announcement is concerning xyz",
    link: "https://meet.google.com/txv-mwgz-fsv",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facilis rem laudantium deleniti accusamus sed explicabo at repellat, fugiat ea, tempora suscipit. Perferendis tempore modi voluptatibus quibusdam aliquam ea illum natus autem repellat soluta, culparepellendus aspernatur inventore deleniti sapiente saepe alias, totam nesciunt ducimus asperiores voluptatem. Voluptatum impedit at quasi, perferendis consequatur minima expedita? Est, magnam quibusdam cum, iusto aspernatur libero laboriosam incidunt optio molestias sapiente similiquequo, quis impedit repellendus dicta expedita. Nesciunt alias provident praesentium unde vero dolor accusantium, assumenda labore autem quo. Voluptates exercitationem assumenda non. Perferendis repellat at officiis cum placeat possimus ea commodi. Porro? repellendus aspernatur inventoredeleniti sapiente saepe alias, totam nesciunt ducimus asperiores voluptatem. Voluptatum impedit at quasi, perferendis consequatur minima expedita? Est, magnam quibusdam cum, iusto aspernatur libero laboriosam incidunt optio molestias sapiente similique quo, quis impedit repellendus dicta",
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.coverImageContainer}>
        <Image source={EventCoverImage} style={styles.coverImage} />
        <View style={styles.overlay} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.desc}>{announcement.desc}</Text>

        <View>
          <Text style={styles.label}>Announcement</Text>
          <Text style={{ fontSize: 18 }}>{announcement.details}</Text>
        </View>
        {announcement.link && (
          <View style={styles.detailGroup}>
            <Text style={styles.label}>Related Link: </Text>
            <TouchableOpacity onPress={() => handleLinkPress(announcement.link)}>
              <Text style={styles.link}>{announcement.link}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
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
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    fontWeight: "500",
  },
  link: {
    fontSize: 18,
    color: "#1e90ff", // Styling the link color to be blue
    textDecorationLine: "underline", // Underline the link to make it more identifiable
  },
});
