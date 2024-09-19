import { Dimensions, FlatList, StyleSheet } from "react-native";

import * as Animatable from "react-native-animatable";
import { useThemeColor, View } from "@/components/ui/themed";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import MemoListItem from "@/components/memo-list-item";
import { Animations } from "@/constants/animations";
import EmptyListInfo from "@/components/empty-list-info";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { formatDateTime } from "@/utils";
import Colors from "@/constants/colors";
import { useColorScheme } from "@/utils/use-color-scheme.web";
import { ActivityIndicator } from "react-native-paper";

export default function TabThreeScreen() {
  const viewRef = useRef(null) as any;
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const defaultBgColor = Colors[colorScheme ?? "light"].tabIconSelected;
  const [isLoading, setIsLoading] = useState(true);
  const animation = Animations[Math.floor(Math.random() * Animations.length)];

  const [memo, setMemo] = useState<any>([]);

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "memo"));
        const memoArray: any[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (data.time && data.time.seconds) {
            const date = new Date(data.time.seconds * 1000 + data.time.nanoseconds / 1000000);
            data.time = formatDateTime(date);
          }

          memoArray.push(data);
        });

        setMemo(memoArray);
      } catch (error) {
        console.error("Error fetching memo <----->", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemo();
  }, []);

  const renderItem = ({ item, index }: { item: Record<string, any>; index: number }) => <MemoListItem item={item} index={index} animation={animation} />;

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
      <FlatList data={memo} keyExtractor={(_, i) => String(i)} numColumns={1} renderItem={renderItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} ListEmptyComponent={ListEmptyComponent} />
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
