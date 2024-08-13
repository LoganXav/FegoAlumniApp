import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View, useThemeColor } from "@/components/ui/themed";

import * as Animatable from "react-native-animatable";
import Colors from "@/constants/colors";
import { router } from "expo-router";
import Icon from "@/utils/icons";
import { useColorScheme } from "@/utils/use-color-scheme";

const colorAr = ["#637aff", "#60c5a8", "#CCCCCC", "#ff5454", "#039a83", "#dcb834", "#8f06e4", "skyblue", "#ff4c98"];
const bgColor = (i: number) => colorAr[i % colorAr.length];

export default function ClassListItem({ item, index, animation }: { item: Record<string, any>; index: number; animation: string }) {
  const colorScheme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const shadowColor = Colors[colorScheme ?? "light"].text;
  return (
    <Animatable.View animation={animation} duration={300} delay={index * 100}>
      <View style={[styles.listItem, { borderColor: shadowColor }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/member/1")}>
          <View style={[styles.image, { backgroundColor: bgColor(index) }]} />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>
            {item.title} {item.name}
          </Text>
          {item.title === "Mr" && <Icon name="frowno" size={16} color={textColor} />}
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listItem: {
    height: 200,
    width: Dimensions.get("window").width / 2 - 16,
    borderBottomWidth: 0.1,
    margin: 8,
    borderRadius: 5,
  },
  image: {
    height: 150,
    marginBottom: 5,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
