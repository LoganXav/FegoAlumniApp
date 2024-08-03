import { Dimensions, FlatList, StyleSheet } from "react-native";

import * as Animatable from "react-native-animatable";
import { View } from "@/components/Themed";
import { useEffect, useRef } from "react";
import { useNavigation } from "expo-router";
import MemoListItem from "@/components/memo-list-item";
import { Animations } from "@/constants/animations";
import EmptyListInfo from "@/components/empty-list-info";

export default function TabThreeScreen() {
  const viewRef = useRef(null);
  const navigation = useNavigation();
  const animation = Animations[Math.floor(Math.random() * Animations.length)];

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
      <FlatList data={Array(30).fill({ name: "Micheal Myers", title: "Mr" })} keyExtractor={(_, i) => String(i)} numColumns={1} renderItem={renderItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} ListEmptyComponent={ListEmptyComponent} />
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
