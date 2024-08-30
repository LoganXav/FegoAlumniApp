// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text, useThemeColor } from "@/components/ui/themed";
import ImageCarousel from "@/components/carousel/image-carousel";
import Button from "@/components/ui/button";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import ProfileImage from "@/assets/images/member.png";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { formatDate } from "@/utils";
import { useUserStore } from "@/store";

export default function MemberDetailsScreen() {
  const { email } = useLocalSearchParams();
  const { setEmail } = useUserStore();

  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchMember() {
      try {
        const docRef = doc(db, "members", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setUser(data);
          setEmail(email);
        } else {
          console.log("No such member!");
        }
      } catch (error) {
        console.error("Error while fetching member <---->", error);
      }
    }
    fetchMember();
  }, [email]);

  const colorScheme = useColorScheme();

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
        <Image source={user?.profilePic || ProfileImage} style={styles.avatar} />
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
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
