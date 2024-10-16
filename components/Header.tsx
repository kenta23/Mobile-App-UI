import { View, Text } from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Header() {
  return (
    <View className="flex flex-row items-center justify-between w-full py-2 my-3">
      <Feather name="chevron-left" size={32} color="black" />
      <Text style={{ fontFamily: "Medium" }} className="text-[22px]">
        Discover
      </Text>

      <View className="p-1 relative flex justify-center items-center size-[45px] rounded-full border-2 border-secondary">
        <Ionicons
          name="bag-handle-outline"
          size={26}
          color="#5548e4"
          className=""
        />

        <View className="p-1 absolute top-[-10px] size-[25px] flex justify-center items-center right-[-3px] rounded-full bg-[#2BDE27]">
          <Text className="text-sm text-white">3</Text>
        </View>
      </View>
    </View>
  );
}
