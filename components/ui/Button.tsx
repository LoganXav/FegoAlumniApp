import Colors from "@/constants/colors";
import React from "react";
import { Text, StyleSheet, Pressable, useColorScheme } from "react-native";

type ButtonProps = {
  onPress: () => void;
  text: string;
  type?: "PRIMARY" | "SECONDARY" | "TERTIARY";
  disabled?: boolean;
  bgColor?: string;
  fgColor?: string;
};

const Button = ({ onPress, disabled, text, type = "PRIMARY", bgColor, fgColor }: ButtonProps) => {
  const colorScheme = useColorScheme();
  const defaultBgColor = Colors[colorScheme ?? "light"].tabIconSelected;

  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.container, styles[`container_${type}`], bgColor ? { backgroundColor: bgColor } : { backgroundColor: defaultBgColor }]}>
      <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 25,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },

  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
    fontFamily: "JakartaSans",
  },

  text_PRIMARY: {},

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    color: "gray",
  },
});

export default Button;
