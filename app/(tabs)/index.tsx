import { Alert, StyleSheet } from "react-native";
import { Text, View, Pressable, useThemeColor } from "@/components/Themed";
import { Agenda, AgendaEntry } from "react-native-calendars";
import events from "@/assets/data/events.json";
import { useColorScheme } from "@/components/useColorScheme.web";
import { RootTabScreenProps } from "@/types";
import { router } from "expo-router";

export default function TabOneScreen({ navigation }: RootTabScreenProps<"Events">) {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    // const color = isFirst ? "black" : "#43515c";

    return (
      <Pressable style={[styles.item, { height: reservation.height }]} onPress={() => router.push("/event/1")}>
        <Text style={{ fontSize }}>{reservation.name}</Text>
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={events}
        showClosingKnob={true}
        minDate="2024-07-13"
        pastScrollRange={2}
        futureScrollRange={3}
        selected="2024-07-15"
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        theme={{
          calendarBackground: backgroundColor,
          textSectionTitleColor: textColor,
          dayTextColor: textColor,
          todayTextColor: "#00adf5",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          monthTextColor: textColor,
          indicatorColor: textColor,
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
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
