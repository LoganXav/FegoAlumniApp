import { Alert, Pressable, StyleSheet } from "react-native";

// import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Agenda, AgendaEntry } from "react-native-calendars";
import events from "@/assets/data/events.json";

export default function TabOneScreen() {
  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <Pressable style={[styles.item, { height: reservation.height }]} onPress={() => Alert.alert(reservation.name)}>
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
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
      {/* <Text style={styles.title}>Tab One</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/*
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <Agenda items={events} selected="2024-07-14" renderItem={renderItem} renderEmptyDate={renderEmptyDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: "80%",
  // },

  item: {
    backgroundColor: "white",
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
