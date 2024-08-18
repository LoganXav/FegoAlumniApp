import React from "react";
import { StyleSheet, ScrollView, Platform, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View, useThemeColor } from "@/components/ui/themed";
import { AntDesign } from "@expo/vector-icons";
import EventCoverImage from "@/assets/images/cover.jpg";

export default function EventDetailScreen() {
  const backgroundColor = useThemeColor({}, "background");

  const event = {
    title: "FEGO ANNUAL REUNION EVENT",
    tagline: "The future is our to live",
    activities: [
      {
        title: "Q & A Session",
        startTime: "Now",
        endTime: "Then",
      },
      {
        title: "Q & A Session",
        startTime: "Now",
        endTime: "Then",
      },
      {
        title: "Q & A Session",
        startTime: "Now",
        endTime: "Then",
      },
    ],
    startDate: "Today",
    endDate: "Tommorrow",
    venue: "Google Meet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa facilis rem laudantium deleniti accusamus sed explicabo at repellat, fugiat ea, tempora suscipit. Perferendis tempore modi voluptatibus quibusdam aliquam ea illum natus autem repellat soluta, culparepellendus aspernatur inventore deleniti sapiente saepe alias, totam nesciunt ducimus asperiores voluptatem. Voluptatum impedit at quasi, perferendis consequatur minima expedita? Est, magnam quibusdam cum, iusto aspernatur libero laboriosam incidunt optio molestias sapiente similiquequo, quis impedit repellendus dicta expedita. Nesciunt alias provident praesentium unde vero dolor accusantium, assumenda labore autem quo. Voluptates exercitationem assumenda non. Perferendis repellat at officiis cum placeat possimus ea commodi. Porro? repellendus aspernatur inventoredeleniti sapiente saepe alias, totam nesciunt ducimus asperiores voluptatem. Voluptatum impedit at quasi, perferendis consequatur minima expedita? Est, magnam quibusdam cum, iusto aspernatur libero laboriosam incidunt optio molestias sapiente similique quo, quis impedit repellendus dicta",
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.coverImageContainer}>
        <Image source={EventCoverImage} style={styles.coverImage} />
        <View style={styles.overlay} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.tagline}>{event.tagline}</Text>
        <View style={styles.detailGroup}>
          <AntDesign name="find" size={15} color="grey" />
          <Text>{event.venue}</Text>
        </View>
        <View style={styles.detailGroup}>
          <AntDesign name="calendar" size={15} color="grey" />
          <Text>
            {event.startDate} - {event.endDate}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>About this Programme</Text>
          <Text style={{ fontSize: 18 }}>{event.description}</Text>
        </View>
        <Text style={styles.sectionHeader}>Day Activities</Text>
        {event.activities.map((activity, index) => (
          <View key={index} style={styles.activityContainer}>
            <Text style={styles.activityTitle}>
              {(index + 1).toString()}. {activity.title}
            </Text>
            <View style={styles.timeContainer}>
              <AntDesign name="clockcircleo" size={15} color="grey" />
              <Text style={styles.timeValue}>
                {activity.startTime} - {activity.endTime}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
  },
  detailGroup: {
    marginBottom: 15,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  activityContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeValue: {
    fontSize: 16,
  },
});
