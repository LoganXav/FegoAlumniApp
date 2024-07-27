/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { TextInput as DefaultTextInput, Text as DefaultText, View as DefaultView, Pressable as DefaultPressable, PressableStateCallbackType, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import React, { useState } from "react";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type PressableProps = ThemeProps & React.ComponentProps<typeof DefaultPressable>;

export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Pressable(props: PressableProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  const computedStyle = typeof style === "function" ? (state: PressableStateCallbackType) => [style(state), { backgroundColor }] : [{ backgroundColor }, style];

  return <DefaultPressable style={computedStyle} {...otherProps} />;
}

export function TextField(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const [isFocused, setIsFocused] = useState(false);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const colorScheme = useColorScheme();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <DefaultView
      style={[
        styles.container,
        {
          borderColor: isFocused ? Colors[colorScheme ?? "light"].tint : Colors[colorScheme ?? "light"].grey,
        },
      ]}
    >
      <DefaultTextInput style={[styles.textInput, { color }, style]} onFocus={handleFocus} onBlur={handleBlur} {...otherProps} />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    width: "100%",
    height: "100%",
  },
});
