import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

export const Icons = {
  AntDesign,
};

export interface IconProps {
  name: any;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Icon = ({ name, color, size = 20, style }: IconProps) => {
  const fontSize = 24;
  return <>{name && <AntDesign name={name} size={size || fontSize} color={color} style={style} />}</>;
};

export default Icon;
