import { StyleSheet, Image, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";

const CustomImage = ({ item, x, index, size, spacer }: Record<string, any>) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useLayoutEffect(() => {
    if (item?.image) {
      const source = Image.resolveAssetSource(item?.image);

      // Ensure the source is valid and has width and height properties
      if (source && source.width && source.height) {
        setAspectRatio(source.width / source.height);
      } else {
        console.warn("Image source could not be resolved", item?.image);
        setAspectRatio(1);
      }
    }
  }, [item?.image]);

  // useLayoutEffect(() => {
  //   if (item?.image) {
  //     const { width, height } = Image.resolveAssetSource(item?.image);
  //     setAspectRatio(width / height);
  //   }
  // }, [item?.image]);

  // const style = useAnimatedStyle(() => {
  //   const scale = interpolate(x.value, [(index - 2) * size, (index - 1) * size, index * size], [0.8, 1, 0.8]);
  //   return {
  //     transform: [{ scale }],
  //   };
  // });

  const style = {};

  if (!item?.image) {
    return <View style={{ width: spacer }} key={index} />;
  }
  return (
    <View style={{ width: size }} key={index}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Image source={item?.image && { uri: item?.image }} style={[styles.image, { aspectRatio: aspectRatio }]} />
      </Animated.View>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: undefined,
  },
});
