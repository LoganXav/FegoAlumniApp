// @ts-nocheck

import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Platform, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View, useThemeColor } from "@/components/ui/themed";
import EventCoverImage from "@/assets/images/cover.jpg";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useLocalSearchParams } from "expo-router";
import { formatDate, formatTime } from "@/utils";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/utils/use-color-scheme.web";

export default function EventDetailScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  const defaultBgColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const [isLoading, setIsLoading] = useState(true);
  const { title } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const docRef = doc(db, "events", title);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          data.startDate instanceof Timestamp
            ? formatDate(data.startDate.toDate())
            : new Date(data.startDate);

          data.endDate instanceof Timestamp
            ? formatDate(data.endDate.toDate())
            : new Date(data.endDate);

          data.activities.forEach((activity: any) => {
            activity.startTime = formatTime(activity.startTime);
            activity.endTime = formatTime(activity.endTime);
          });

          setEvent(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error while fetching event <---->", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvent();
  }, [title]);

  if (isLoading) {
    // Show loading spinner in the center of the screen
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={defaultBgColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* <View style={styles.coverImageContainer}>
        <Image source={EventCoverImage} style={styles.coverImage} />
        <View style={styles.overlay} />
      </View> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{event?.title}</Text>
        {event?.tagline && <Text style={styles.tagline}>{event?.tagline}</Text>}
        <View style={styles.detailGroup}>
          <AntDesign name="find" size={18} color="grey" />
          <Text>{event?.venue}</Text>
        </View>
        <View style={styles.detailGroup}>
          <AntDesign name="calendar" size={18} color="grey" />
          <Text>
            FROM: {event?.startDate} {"        "} TO: {event?.endDate}
          </Text>
        </View>
        {event?.description && (
          <View>
            <Text style={styles.sectionHeader}>About this Programme</Text>
            <Text style={{ fontSize: 18 }}>{event?.description}</Text>
          </View>
        )}
        {event?.activities.length && (
          <Text style={styles.sectionHeader}>Day Activities</Text>
        )}
        {event?.activities.map((activity: any, index: any) => (
          <View key={index} style={styles.activityContainer}>
            <Text style={styles.activityTitle}>
              {(index + 1).toString()}. {activity?.title}
            </Text>
            <View style={styles.timeContainer}>
              <AntDesign name="clockcircleo" size={15} color="grey" />
              <Text style={styles.timeValue}>
                {activity?.startTime} - {activity?.endTime}
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
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
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
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
  },
  detailGroup: {
    marginBottom: 15,
    flexDirection: "row",
    gap: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
