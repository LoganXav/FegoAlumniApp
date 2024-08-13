import { Image, ScrollView, StyleSheet } from "react-native";
import ProfileImage from "@/assets/images/selfie.png";
import { useColorScheme } from "@/utils/use-color-scheme";
import { Text, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import Colors from "@/constants/colors";
import ImageCarousel from "@/components/carousel/image-carousel";

export default function TabFourScreen() {
  const user = { displayName: "Jason Mamoa", desc: "A 23 year old man from Victoria Island", extra: "fun fact about the person" };

  const colorScheme = useColorScheme();
  const cardBackgroundColor = Colors[colorScheme ?? "light"].grey;
  const shadowColor = Colors[colorScheme ?? "light"].text;

  const data = [
    {
      image: require("../../assets/images/selfie.png"),
    },
    {
      image: require("../../assets/images/selfie.png"),
    },
    {
      image: require("../../assets/images/selfie.png"),
    },
    {
      image: require("../../assets/images/selfie.png"),
    },
    {
      image: require("../../assets/images/selfie.png"),
    },
    {
      image: require("../../assets/images/selfie.png"),
    },
    {
      image: require("../../assets/images/selfie.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={ProfileImage} style={styles.avatar} />
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={{ fontSize: 16 }}>{user?.desc}</Text>
        <Text style={{ fontSize: 16 }}>{user?.extra}</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 30 }}>Personal Information</Text>
        {Array(4)
          .fill(0)
          .map((detail, idx) => (
            <View key={idx} style={[styles.infoCard, { borderColor: shadowColor }]}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Personal </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Information</Text>
            </View>
          ))}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 30 }}>Gallery</Text>
        <View style={{ height: 240 }}>
          <ImageCarousel data={data} autoPlay={false} pagination={true} />
        </View>
        <View style={styles.button}>
          <Button onPress={() => router.push("/")} text="Sign out" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 30,
    alignItems: "center",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
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
    marginHorizontal: 20,
    width: "100%",
    paddingBottom: 100,
    paddingTop: 20,
  },
  infoCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0.1,
    borderRadius: 3,
  },
});
