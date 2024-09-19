import { Dimensions, FlatList, StyleSheet } from "react-native";

import { useThemeColor, View } from "@/components/ui/themed";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef, useState } from "react";
import { Animations } from "@/constants/animations";
import EmptyListInfo from "@/components/empty-list-info";
import { useNavigation } from "expo-router";
import ClassListItem from "@/components/class-list-item";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import { ActivityIndicator } from "react-native-paper";

export default function TabTwoScreen({}) {
  const navigation = useNavigation();
  const viewRef = useRef(null) as any;
  const animation = Animations[Math.floor(Math.random() * Animations.length)];
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const defaultBgColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersArray: any[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          membersArray.push(data);
        });

        setMembers(membersArray);
      } catch (error) {
        console.error("Error fetching members <----->", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const renderItem = ({ item, index }: { item: Record<string, any>; index: number }) => <ClassListItem item={item} index={index} animation={animation} />;

  const ListEmptyComponent = () => {
    return (
      <View style={styles.listEmpty}>
        <EmptyListInfo path="add a member" />
      </View>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (viewRef.current) {
        viewRef.current.transition({ opacity: 0.5 }, { opacity: 1 }, 500, "ease-in-out-circ");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  if (isLoading) {
    // Show loading spinner in the center of the screen
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={defaultBgColor} />
      </View>
    );
  }

  return (
    <Animatable.View ref={viewRef} easing={"ease-in-out-circ"} duration={500}>
      <FlatList data={members} keyExtractor={(_, i) => String(i)} numColumns={2} renderItem={renderItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} ListEmptyComponent={ListEmptyComponent} />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  listEmpty: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
