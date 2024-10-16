import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Dynamicuser() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Hello user: {id}</Text>
    </View>
  );
}
