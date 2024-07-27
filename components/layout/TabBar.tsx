import React from "react";
import { Text, useThemeColor, View } from "../Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

function TabBar({ state, descriptors, navigation }: any) {
  const textColor = useThemeColor({}, "text");
  const colorScheme = useColorScheme();
  const shadowColor = Colors[colorScheme ?? "light"].text;

  return (
    <View style={[styles.tabBar, { shadowColor }]}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];

        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const color = isFocused ? Colors[colorScheme ?? "light"].tabIconSelected : textColor;
        const icon = options.tabBarIcon ? options.tabBarIcon({ color }) : null;

        return (
          <TouchableOpacity key={index} accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} testID={options.tabBarTestID} onPress={onPress} onLongPress={onLongPress} style={styles.tabBarItem}>
            {icon}
            <Text style={{ color, fontSize: 12 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderCurve: "continuous",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
