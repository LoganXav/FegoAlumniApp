import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Platform, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text, View, useThemeColor } from "@/components/ui/themed";
import { AntDesign } from "@expo/vector-icons";
import EventCoverImage from "@/assets/images/cover.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useLocalSearchParams } from "expo-router";
import { formatDate, formatTime } from "@/utils";

export default function EventDetailScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { title } = useLocalSearchParams();
  const [event, setEvent] = useState<any>(null);

  console.log(event, "==++");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const docRef = doc(db, "events", title);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          data.startDate = formatDate(data.startDate.toDate());
          data.endDate = formatDate(data.endDate.toDate());

          data.activities.forEach((activity: any) => {
            activity.startTime = formatTime(activity.startTime);
            activity.endTime = formatTime(activity.endTime);
          });

          setEvent(data);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error while fetching event <---->", error);
      }
    }
    fetchEvent();
  }, [title]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.coverImageContainer}>
        <Image source={EventCoverImage} style={styles.coverImage} />
        <View style={styles.overlay} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{event?.title}</Text>
        <Text style={styles.tagline}>{event?.tagline}</Text>
        <View style={styles.detailGroup}>
          <AntDesign name="find" size={15} color="grey" />
          <Text>{event?.venue}</Text>
        </View>
        <View style={styles.detailGroup}>
          <AntDesign name="calendar" size={15} color="grey" />
          <Text>
            {event?.startDate} - {event?.endDate}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>About this Programme</Text>
          <Text style={{ fontSize: 18 }}>{event?.description}</Text>
        </View>
        <Text style={styles.sectionHeader}>Day Activities</Text>
        {event?.activities.map((activity, index) => (
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
