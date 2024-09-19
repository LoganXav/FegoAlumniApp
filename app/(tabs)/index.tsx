// @ts-nocheck
import { StyleSheet } from "react-native";
import { Text, View, Pressable } from "@/components/ui/themed";
import { Agenda, AgendaEntry } from "react-native-calendars";
import { useColorScheme } from "@/utils/use-color-scheme";
import { CalendarData, RootTabScreenProps } from "@/types";
import { router } from "expo-router";
import colors from "@/constants/colors";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { Event, processEventForCalendar } from "@/utils";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"Events">) {
  const colorScheme = useColorScheme();
  const [events, setEvents] = useState<CalendarData>({});

  const backgroundColor = colors[colorScheme ?? "light"].background;
  const selectedBackgroundColor =
    colors[colorScheme ?? "light"].tabIconSelected;
  const textColor = colors[colorScheme ?? "light"].text;

  const renderItem = (event: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 20 : 18;

    return (
      <Pressable
        style={[styles.item, { height: event.height }]}
        onPress={() => router.push(`/event/${event.title}`)}
      >
        <Text
          style={{ fontSize, fontWeight: "bold", textTransform: "uppercase" }}
        >
          {event.title}
        </Text>
        {!isFirst && (
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Text style={{ fontSize: 15 }}>{event.desc}</Text>
            <Text style={{ fontSize: 15 }}>(activity)</Text>
          </View>
        )}
        {isFirst && (
          <>
            <Text style={{ fontSize: 15 }}>Venue: {event.venue}</Text>
            <Text style={{ fontSize: 15 }}>Tag: {event.tag}</Text>
          </>
        )}
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* <Image */}
        {/*   source={{ uri: "https://example.com/empty-calendar.png" }} // Replace with an actual image URL */}
        {/*   style={styles.image} */}
        {/* /> */}
        <Text style={styles.message}>
          No events scheduled for this day. Take some time to relax or plan
          something special!
        </Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents: CalendarData = {};

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          const startDate =
            docData.startDate instanceof Timestamp
              ? docData.startDate.toDate()
              : new Date(docData.startDate);
          const endDate =
            docData.endDate instanceof Timestamp
              ? docData.endDate.toDate()
              : new Date(docData.endDate);

          const event = {
            ...docData,
            startDate,
            endDate,
          } as unknown as Event;

          const processedEvent = processEventForCalendar(event);

          // Merge processed event data into fetchedEvents
          for (const [date, entries] of Object.entries(processedEvent)) {
            if (!fetchedEvents[date]) {
              fetchedEvents[date] = [];
            }
            fetchedEvents[date] = [...fetchedEvents[date], ...entries];
          }
        });

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Agenda
        items={events}
        showClosingKnob={true}
        minDate="2024-07-13"
        pastScrollRange={2}
        futureScrollRange={3}
        // selected="2024-07-15"
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        theme={{
          calendarBackground: backgroundColor,
          textSectionTitleColor: textColor,
          dayTextColor: textColor,
          todayTextColor: "#333",
          selectedDayBackgroundColor: selectedBackgroundColor,
          selectedDayTextColor: "#ffffff",
          monthTextColor: textColor,
          indicatorColor: selectedBackgroundColor,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f5",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity: 0.7, // Adds a subtle transparency effect
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    fontWeight: "600",
  },
});
