import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/ui/themed";

import * as Animatable from "react-native-animatable";
import { router } from "expo-router";
import Icon from "@/utils/icons";
import ProfileImage from "@/assets/images/member.png";

export default function ClassListItem({
  item,
  index,
  animation,
}: {
  item: Record<string, any>;
  index: number;
  animation: string;
}) {
  return (
    <Animatable.View animation={animation} duration={300} delay={index * 100}>
      <View style={[styles.listItem, {}]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push(`/member/${item.email}`)}
        >
          <Image
            source={item?.profilePic || ProfileImage}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>
            {item?.firstName} {item?.lastName}
          </Text>
          {item?.isDeceased === "yes" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#5365",
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 1,
              }}
            >
              <Text style={{ fontSize: 12 }}>Deceased</Text>
              <Icon name="star" size={10} color={"gold"} />
            </View>
          )}
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
    width: Dimensions.get("window").width / 2 - 16,
    borderBottomWidth: 0.1,
    margin: 8,
    minHeight: 210,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
