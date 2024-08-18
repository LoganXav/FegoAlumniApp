import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View, useThemeColor } from "@/components/ui/themed";

import * as Animatable from "react-native-animatable";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/utils/use-color-scheme";
import { router } from "expo-router";
import EventCoverImage from "@/assets/images/cover.jpg";

const colorAr = ["#637aff", "#60c5a8", "#CCCCCC", "#ff5454", "#039a83", "#dcb834", "#8f06e4", "skyblue", "#ff4c98"];
const bgColor = (i: number) => colorAr[i % colorAr.length];

export default function MemoListItem({ item, index, animation }: { item: Record<string, any>; index: number; animation: string }) {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const shadowColor = Colors[colorScheme ?? "light"].text;
  return (
    <Animatable.View animation={animation} duration={300} delay={index * 100}>
      <View style={[styles.listItem, { borderColor: shadowColor }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/memo/1")}>
          <Image source={EventCoverImage} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.name, { color: textColor, fontWeight: "bold" }]}>
            Announcement Title
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.name, { color: textColor }]}>
            Announcement Description
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.name, { color: textColor, fontSize: 14 }]}>
            08/24 11:00pm
          </Text>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    flexShrink: 1,
  },
  listItem: {
    height: 100,
    flexDirection: "row",
    width: Dimensions.get("window").width - 16,
    borderBottomWidth: 0.1,
    borderTopWidth: 0.1,
    margin: 8,
    borderRadius: 5,
    padding: 4,
  },
  image: {
    height: "90%",
    width: 100,
    margin: 5,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },
});
