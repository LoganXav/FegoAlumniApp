import { Image, ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "@/utils/use-color-scheme";
import { Text, View } from "@/components/ui/themed";
import Button from "@/components/ui/button";
import Colors from "@/constants/colors";
import ImageCarousel from "@/components/carousel/image-carousel";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { AuthenticatedUserContext } from "@/contexts/auth-user-context";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function TabFourScreen() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [authUser, setAuthUser] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchMember() {
      try {
        const docRef = doc(db, "members", user?.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setAuthUser(data);
        } else {
          console.log("No such member!");
        }
      } catch (error) {
        console.error("Error while fetching member <---->", error);
      }
    }
    fetchMember();
  }, [user]);

  async function handleSignOut() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("<-- Error signing out -->", error);
    }
  }

  const colorScheme = useColorScheme();
  const borderColor = Colors[colorScheme ?? "light"].grey;

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
        <Image source={authUser?.profileImageUrl && { uri: authUser?.profileImageUrl }} style={styles.avatar} />

        <Text style={styles.name}>
          {authUser?.title} {authUser?.firstName} {authUser?.lastName}
        </Text>
        <Text style={{ fontSize: 16 }}>{authUser?.bio || "-"}</Text>

        <View style={styles.info}>
          <Text style={styles.sectionHeader}>Personal Information</Text>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Date of Birth</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.dateOfBirth || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Email</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.email || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Phone number</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.phoneNumber || "-"}</Text>
          </View>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Location</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.address || "-"}</Text>
          </View>
          <Text style={styles.sectionHeader}>Professional</Text>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Organization name</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.currentEmployer || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Job title</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.jobTitle || "-"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Industry</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.industry || "-"}</Text>
          </View>

          <Text style={styles.sectionHeader}>Networking</Text>

          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Open to networking</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.networking === "yes" ? "Yes" : "No"}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Preferred contact method</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.preferredContact}</Text>
          </View>
          <View style={[styles.infoCard, { borderColor }]}>
            <Text style={{ fontSize: 16 }}>Industry</Text>
            <Text style={{ fontSize: 16 }}>{authUser?.mentorship === "yes" ? "Yes" : "No"}</Text>
          </View>
          {authUser?.galleryImageUrls && (
            <>
              <Text style={styles.sectionHeader}>Gallery</Text>
              <View style={{ height: 240, marginTop: 20 }}>
                <ImageCarousel data={authUser?.galleryImageUrls} autoPlay={false} pagination={true} />
              </View>
            </>
          )}
        </View>
        <View style={styles.button}>
          <Button onPress={handleSignOut} text="Sign out" />
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
});
