import { Dimensions, FlatList, StyleSheet } from "react-native";

import { View } from "@/components/ui/themed";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef } from "react";
import { Animations } from "@/constants/animations";
import EmptyListInfo from "@/components/empty-list-info";
import { useNavigation } from "expo-router";
import ClassListItem from "@/components/class-list-item";

export default function TabTwoScreen({}) {
  const navigation = useNavigation();
  const viewRef = useRef(null);
  const animation = Animations[Math.floor(Math.random() * Animations.length)];

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

  return (
    <Animatable.View ref={viewRef} easing={"ease-in-out-circ"} duration={500}>
      <FlatList data={Array(30).fill({ name: "Micheal Myers", title: "Mr" })} keyExtractor={(_, i) => String(i)} numColumns={2} renderItem={renderItem} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} ListEmptyComponent={ListEmptyComponent} />
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
