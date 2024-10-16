import { ProductType } from "@/app/(tabs)";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  SectionList,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductsList({
  handleOffsetProductChange,
  data,
  loading,
}: {
  handleOffsetProductChange: () => void;
  data: ProductType[] | undefined;
  loading: boolean;
}) {
  if (!data?.length) {
    return (
      <View className="items-center justify-center w-full h-full">
        <Text className="text-center">No Products Found</Text>
      </View>
    );
  }

  const bottomTabbarInsets = useSafeAreaInsets();

  return (
    <FlatList
      className="h-full px-4 mt-4 space-x-4 space-y-4"
      contentContainerStyle={{
        paddingBottom: bottomTabbarInsets.bottom,
      }}
      onEndReached={handleOffsetProductChange}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size={"large"} /> : null
      }
      ListHeaderComponent={
        <Text
          style={{ fontFamily: "MajorMonoDisplay" }}
          className="text-[20px] mb-3"
        >
          Trends
        </Text>
      }
      numColumns={2}
      columnWrapperStyle={styles.row}
      data={data}
      keyExtractor={(item, index) => `${item?.id.toString() || index}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/product/[id]",
              params: { id: item.id.toString() },
            })
          }
          className="cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          <View className="flex flex-col items-start justify-start w-1/2 gap-3 m-2">
            <View className="w-[150px] border-[1px] border-lightPrimary bg-slate-500 h-[200px] rounded-tr-[18px] rounded-bl-[18px] relative">
              <Image
                source={{ uri: item.images[0] }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                resizeMethod="scale"
                className="rounded-tr-[18px] rounded-bl-[18px]"
                loadingIndicatorSource={{
                  uri: "../assets/images/react-logo@3x.png",
                }}
              />

              <View className="p-2 absolute top-2 right-1 flex justify-center items-center size-[40px] rounded-full bg-primary">
                <AntDesign name="hearto" size={18} color="#ffff" />
              </View>
            </View>

            {/* PRODUCT TITLE AND PRICES DISPLAY HERE */}
            <View>
              {/* Price and discounts */}

              <Text className="font-semibold text-[14px]">{item.price}</Text>
              <Text
                className="font-normal text[12px] max-w-[170px]"
                lineBreakMode="tail"
              >
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
});
