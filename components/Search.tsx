import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Search() {
  const [searchVal, setSearchVal] = useState<string>("");
  return (
    <View className="flex items-center justify-center">
      <View className="flex-row items-center justify-center w-[350px] mt-8 py-2 gap-2 px-6 rounded-full  border-2 border-primary">
        <Feather name="search" size={24} color="#DFAABD" className={""} />
        <TextInput
          value={searchVal}
          onChangeText={(text: string) => setSearchVal(text)}
          aria-label="search"
          blurOnSubmit
          className={`h-full w-full max-w-full`}
          placeholder="Search"
          placeholderTextColor={"#DFAABD"}
        />
      </View>
    </View>
  );
}
