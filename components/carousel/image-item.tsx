import { StyleSheet, Image, View, Modal, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const CustomImage = ({ item, x, index, size, spacer }: Record<string, any>) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={{ width: size }} key={index}>
        <TouchableOpacity onPress={handleImagePress}>
          <View style={[styles.imageContainer]}>
            <Image source={{ uri: item?.image }} style={[styles.image, { aspectRatio }]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal for full-screen image preview */}
      <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <AntDesign name="closecircle" size={30} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: item?.image }} style={styles.fullscreenImage} resizeMode="contain" />
        </View>
      </Modal>
    </>
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
    backgroundColor: "lightgray",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
