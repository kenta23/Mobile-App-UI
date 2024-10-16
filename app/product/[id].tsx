import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, UnknownOutputParams, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
  withSafeAreaInsets,
} from "react-native-safe-area-context";
import axios from "axios";
import { ProductType } from "../(tabs)";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function SingleProduct() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType>();
  const [viewAll, setViewAll] = useState<boolean>(false);

  useEffect(() => {
    async function getProductById() {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id.toString()}`
        );

        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      }

      const intervalID = setTimeout(getProductById, 120000);
      return () => clearInterval(intervalID);
    }

    getProductById();
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <ScrollView className="relative h-full">
        {/* Product Image */}
        <FlatList
          data={product?.images}
          horizontal
          contentContainerStyle={{
            position: "relative",
            height: "100%",
          }}
          pagingEnabled
          snapToAlignment="center"
          className="relative"
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%" }}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item: img }) => (
            <View className="h-[457px] border-[1px] w-[500px] relative">
              <Image
                source={{ uri: img.toString() }}
                style={{ height: "100%" }}
                resizeMode="cover"
              />
            </View>
          )}
        />

        <View className="absolute flex flex-row items-center justify-between w-full px-3 top-4">
          {/* Back btn */}
          <Pressable
            onPress={() => router.back()}
            className="p-1 flex items-center justify-center size-12 rounded-full bg-white shadow-lg shadow-[#958E8E]"
          >
            <Entypo
              name="chevron-small-left"
              className="text-center"
              size={24}
              color="black"
            />
          </Pressable>

          {/* Cart btn */}

          <View className="p-1 flex items-center justify-center size-12 rounded-full bg-white shadow-lg shadow-[#958E8E]">
            <Ionicons
              name="bag-handle-outline"
              className="text-center"
              size={24}
              color="#000"
            />
          </View>
        </View>

        <View className="flex-1 px-6 ">
          {/* Title */}
          <View className="flex flex-row items-center justify-between mt-4">
            <View className="flex-col w-3/4 h-full gap-2">
              <Text className="text-[30px] text-[#662C48] font-normal text-wrap">
                {product?.title}
              </Text>

              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center gap-1">
                  <Entypo name="star" size={14} color="#F7DC6F" />
                  <Text className="text-sm font-semibold">4.7</Text>
                </View>

                <Text className="text-sm font-medium">117 reviews</Text>
              </View>
            </View>

            <View className="items-end justify-center flex-1 w-full">
              <Text className="text-[18px] font-semibold">
                ${product?.price}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="flex-col items-start gap-3 mt-6 mb-10 space-y-4">
            <Text className="text-[22px] font-normal">Description</Text>

            <View>
              <Text className="text-wrap">
                {!viewAll
                  ? product?.description.slice(0, 200)
                  : product?.description}
              </Text>
              {product?.description && product?.description.length >= 200 && (
                <TouchableOpacity onPress={() => setViewAll((prev) => !prev)}>
                  <Text className="text-blue-500">
                    {!viewAll ? "Read more.." : "Close.."}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <SafeAreaView
          mode="margin"
          style={{
            paddingBottom: insets.bottom,
            height: "auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: insets.top,
          }}
          edges={{ bottom: "maximum" }}
        >
          <View className="flex flex-row items-center justify-around w-full gap-2 px-4 mt-10 ">
            <Pressable className="flex px-6 py-3 min-w-[180px] rounded-full justify-center flex-row border-[1px] border-[#E23F8D] items-center gap-2">
              <Ionicons
                name="bag-handle-outline"
                className="text-center"
                size={20}
                color="#E23F8D"
              />
              <Text className="text-[#E23F8D] font-normal text-lg">
                Add to cart
              </Text>
            </Pressable>

            <Pressable className="flex bg-[#EB9AB7] flex-row rounded-full px-6 py-3 justify-center items-center gap-2">
              <Text className="text-lg min-w-[180px] font-normal text-center text-white">
                Buy Now
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}
