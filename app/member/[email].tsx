// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text, useThemeColor } from "@/components/ui/themed";
import ImageCarousel from "@/components/carousel/image-carousel";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import { useLocalSearchParams } from "expo-router";
import Colors from "@/constants/colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useUserStore } from "@/store";
import { ActivityIndicator } from "react-native-paper";

export default function MemberDetailsScreen() {
  const { email } = useLocalSearchParams();
  const { setEmail } = useUserStore();
  const backgroundColor = useThemeColor({}, "background");
  const colorScheme = useColorScheme();
  const borderColor = Colors[colorScheme ?? "light"].grey;
  const defaultBgColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<Record<string, any>>({});

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
      } finally {
        setIsLoading(false);
      }
    }
    fetchMember();
  }, [email]);

  if (isLoading) {
    // Show loading spinner in the center of the screen
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={defaultBgColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={user?.profileImageUrl && { uri: user?.profileImageUrl }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={{ fontSize: 16 }}>{user?.desc}</Text>
        <Text style={{ fontSize: 16 }}>{user?.extra}</Text>

        <View style={styles.info}>
          <Text style={styles.sectionHeader}>Personal Information</Text>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Date of Birth</Text>
            <Text style={{ fontSize: 16 }}>{user?.dateOfBirth || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Email</Text>
            <Text style={{ fontSize: 16 }}>{user?.email}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Phone number</Text>
            <Text style={{ fontSize: 16 }}>{user?.phoneNumber || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>School House</Text>
            <Text style={{ fontSize: 16 }}>{user?.house || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Location</Text>
            <Text style={{ fontSize: 16 }}>{user?.address || "-"}</Text>
          </View>
          <Text style={styles.sectionHeader}>Professional Information</Text>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Organization name</Text>
            <Text style={{ fontSize: 16 }}>{user?.currentEmployer || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Job title</Text>
            <Text style={{ fontSize: 16 }}>{user?.jobTitle || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Industry</Text>
            <Text style={{ fontSize: 16 }}>{user?.industry || "-"}</Text>
          </View>

          <Text style={styles.sectionHeader}>Networking Preferences</Text>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Open to networking</Text>
            <Text style={{ fontSize: 16 }}>
              {user?.networking === "yes" ? "Yes" : "No"}
            </Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Preferred contact method</Text>
            <Text style={{ fontSize: 16 }}>{user?.preferredContact}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Willing to Mentor</Text>
            <Text style={{ fontSize: 16 }}>
              {user?.mentorship === "yes" ? "Yes" : "No"}
            </Text>
          </View>
          <Text style={styles.sectionHeader}>Gallery</Text>
          <View style={{ height: 240, marginTop: 20 }}>
            <ImageCarousel
              data={user?.galleryImageUrls}
              autoPlay={false}
              pagination={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  info: {
    marginBottom: 30,
    gap: 10,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 20,
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
    backgroundColor: "lightgray",
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
    borderWidth: 0.1669,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
