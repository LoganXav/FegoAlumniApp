import { Image, StyleSheet } from "react-native";
import ProfileImage from "../../assets/images/selfie.png";
import Icon from "@/components/icons";
import { useColorScheme } from "@/components/useColorScheme";
import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import Colors from "@/constants/colors";

export default function TabFourScreen() {
  const user = { displayName: "Jason Mamoa", desc: "A 23 year old man from Victoria Island", extra: "fun fact about the person" };

  const colorScheme = useColorScheme();
  const cardBackgroundColor = Colors[colorScheme ?? "light"].grey;
  const shadowColor = Colors[colorScheme ?? "light"].text;

  return (
    <View style={styles.container}>
      <Image source={ProfileImage} style={styles.avatar} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={{ fontSize: 16 }}>{user?.desc}</Text>
      <Text style={{ fontSize: 16 }}>{user?.extra}</Text>
      <View style={{ width: "100%", marginVertical: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Personal Information</Text>
      </View>
      {[1, 2, 3].map((idx) => (
        <View key={idx} style={[styles.infoCard, { borderColor: shadowColor }]}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Personal </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Information</Text>
        </View>
      ))}
      <View style={{ width: "100%", marginVertical: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Gallery</Text>
      </View>
      <View style={styles.button}>
        <Button onPress={() => router.push("/")} text="Sign out" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 150,
    aspectRatio: 1,
    borderRadius: 100,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 15,
    color: "dimgray",
  },
  button: {
    position: "absolute",
    bottom: 100,
    marginHorizontal: 20,
    width: "100%",
  },
  infoCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0.1,
    borderRadius: 5,
  },
});
