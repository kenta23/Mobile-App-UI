import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  OpaqueColorValue,
  StatusBar,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  Entypo,
  Ionicons,
  Feather,
  FontAwesome6,
} from "@expo/vector-icons";
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

type IconEntry = {
  name: string;
  component: () => JSX.Element;
};

interface IconProps {
  color: string | OpaqueColorValue | undefined;
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const icons: Record<string, (props: IconProps) => React.JSX.Element> = {
    index: (props) => (
      <Entypo name="home" className="text-center" size={24} {...props} />
    ),
    scan: (props) => <Ionicons name="scan-sharp" size={24} {...props} />,
    favorites: (props) => <Feather name="heart" size={24} {...props} />,
    profile: (props) => <FontAwesome6 name="user" size={24} {...props} />,
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItems}
          >
            {icons[route?.name]({ color: isFocused ? "#E44881" : "#000" })}
            <Text
              className="text-sm"
              style={{ color: isFocused ? "#E44881" : "#000" }}
            >
              {label.toString()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <>
      <Tabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{ tabBarActiveTintColor: "#E44881", headerShown: false }}
      />
      <StatusBar backgroundColor="#24252a" barStyle={"light-content"} />
    </>
  );
}

const styles = StyleSheet.create({
  tabItems: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    height: 65,
    shadowColor: "#E4DADE",
    borderTopWidth: 1,
    borderColor: "#E4DADE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
