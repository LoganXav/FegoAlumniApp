import { StyleSheet } from "react-native";
import React from "react";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/colors";
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated";

const Dot = ({ x, index, size }) => {
  const colorScheme = useColorScheme();
  const dotBackgroundColor = Colors[colorScheme ?? "light"].tabIconSelected;

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(x.value, [(index - 1) * size, index * size, (index + 1) * size], [10, 20, 10], Extrapolation.CLAMP);
    const opacityAnimation = interpolate(x.value, [(index - 1) * size, index * size, (index + 1) * size], [0.5, 1, 0.5], Extrapolation.CLAMP);
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });
  return <Animated.View style={[styles.dots, animatedDotStyle, { backgroundColor: dotBackgroundColor }]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
