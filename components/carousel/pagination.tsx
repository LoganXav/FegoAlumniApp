import { StyleSheet, View } from "react-native";
import React from "react";
import Dot from "./dot";

const Pagination = ({ data, x, size }: Record<string, any>) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_: any, i: number) => {
        return <Dot key={i} x={x} index={i} size={size} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
