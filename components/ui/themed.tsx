/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { TextInput as DefaultTextInput, Text as DefaultText, View as DefaultView, Pressable as DefaultPressable, PressableStateCallbackType, StyleSheet } from "react-native";
import { useColorScheme } from "../../utils/use-color-scheme";
import React, { useState } from "react";
import Colors from "@/constants/colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ErrorProp = {
  error?: any;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"] & ErrorProp;
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

  return <DefaultText style={[{ color }, style, { fontFamily: "JakartaSans" }]} {...otherProps} />;
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
  const { style, error, lightColor, darkColor, ...otherProps } = props;
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
    <>
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
      {error && <Text style={{ fontSize: 14, color: "red" }}>{error}</Text>}
    </>
  );
}

export function TextArea({ maxLength, style, lightColor, darkColor, error, ...otherProps }: TextInputProps & { maxLength?: number }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const colorScheme = useColorScheme();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (inputText: string) => {
    if (!maxLength || inputText.length <= maxLength) {
      setText(inputText);
    }
  };

  return (
    <>
      <DefaultView
        style={[
          styles.textAreaContainer,
          {
            borderColor: isFocused ? Colors[colorScheme ?? "light"].tint : Colors[colorScheme ?? "light"].grey,
          },
        ]}
      >
        <DefaultTextInput style={[styles.textArea, { color }, style]} onFocus={handleFocus} onBlur={handleBlur} multiline={true} value={text} onChangeText={handleChangeText} {...otherProps} />
        {maxLength && (
          <DefaultText style={[styles.charCount, { color: Colors[colorScheme ?? "light"].grey }]}>
            {text.length}/{maxLength}
          </DefaultText>
        )}
      </DefaultView>
      {error && <Text style={{ fontSize: 14, color: "red" }}>{error}</Text>}
    </>
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
  textAreaContainer: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  textArea: {
    fontSize: 16,
    width: "100%",
    height: 100, // or adjust the height as needed
    textAlignVertical: "top", // to ensure text starts at the top
  },
  charCount: {
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 8,
  },
});
