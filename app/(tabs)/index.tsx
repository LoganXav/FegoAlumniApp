import { StyleSheet } from "react-native";
import { Text, View, Pressable } from "@/components/ui/themed";
import { Agenda, AgendaEntry } from "react-native-calendars";
import { useColorScheme } from "@/utils/use-color-scheme";
import { CalendarData, RootTabScreenProps } from "@/types";
import { router } from "expo-router";
import colors from "@/constants/colors";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { Event, processEventForCalendar } from "@/utils";

export default function TabOneScreen({ navigation }: RootTabScreenProps<"Events">) {
  const colorScheme = useColorScheme();
  const [events, setEvents] = useState<CalendarData>({});

  const backgroundColor = colors[colorScheme ?? "light"].background;
  const selectedBackgroundColor = colors[colorScheme ?? "light"].tabIconSelected;
  const textColor = colors[colorScheme ?? "light"].text;

  const renderItem = (event: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 23 : 18;

    return (
      <Pressable style={[styles.item, { height: event.height }]} onPress={() => router.push(`/event/${event.title}`)}>
        <Text style={{ fontSize, fontWeight: "500" }}>{event.title}</Text>
        {!isFirst && <Text style={{ fontSize: 15 }}>{event.desc}</Text>}
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
      <View style={[styles.emptyDate, { backgroundColor: "lightgrey" }]}>
        <Text style={[{ color: "white" }]}>No event</Text>
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
          const startDate = docData.startDate instanceof Timestamp ? docData.startDate.toDate() : new Date(docData.startDate);
          const endDate = docData.endDate instanceof Timestamp ? docData.endDate.toDate() : new Date(docData.endDate);

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
  emptyDate: {
    height: 50,
    flex: 1,
    paddingTop: 30,
  },
});
