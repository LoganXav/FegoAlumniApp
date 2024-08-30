import { Dimensions, FlatList, StyleSheet } from "react-native";

import * as Animatable from "react-native-animatable";
import { View } from "@/components/ui/themed";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import MemoListItem from "@/components/memo-list-item";
import { Animations } from "@/constants/animations";
import EmptyListInfo from "@/components/empty-list-info";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { formatDateTime, formatTime } from "@/utils";
import { format } from "date-fns";

export default function TabThreeScreen() {
  const viewRef = useRef(null) as any;
  const navigation = useNavigation();
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
});
