import { View, Text, Image } from "react-native";
import React from "react";

export default function CategoryItem({ data }: any) {
  return (
    <View className="flex flex-col items-center justify-start w-[80px] h-full mx-2">
      <Image
        source={{ uri: data.image, width: 65, height: 65 }}
        resizeMode="contain"
        borderRadius={900}
        width={45}
        height={45}
      />
      <Text className="mt-2 text-center text-black text-[12px]">
        {data.name}
      </Text>
    </View>
  );
}
