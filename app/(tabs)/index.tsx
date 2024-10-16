import {
  View,
  Text,
  Button,
  StatusBar,
  StyleSheet,
  FlatList,
  ScrollView,
  VirtualizedList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Search from "@/components/Search";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "@/components/Header";
import axios from "axios";
import Categories from "@/components/Categories";
import CategoryItem from "@/components/CategoryItem";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ProductsList from "@/components/ProductsList";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export type CategoriesType =
  | {
      id: number | string;
      creationAt: string;
      image: string;
      name: string;
      updatedAt: string;
    }
  | undefined;

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
    image: string;
  };
  images: string[];
};

export default function Index() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offsetProduct, setOffsetProduct] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);

  console.log("offset products", offsetProduct);
  //console.log("offset categories", offset);

  async function loadMoreProduct() {
    if (!loadingProducts) {
      setLoadingProducts(true); // Start loading
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/products?offset=${offsetProduct}&limit=10`
        );

        setProductList([...productList, ...res.data]); // Append data correctly
        setLoadingProducts(false); // Stop loading
      } catch (error) {
        console.log(error);
        setLoadingProducts(false);
      }
    }
  }

  async function loadMoreCategories() {
    if (!loading) {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/categories?offset=${offset}&limit=10`
        );

        setCategories((prevCategories) => [...prevCategories, ...res.data]); // Append new categories
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  const handleOffsetChange = () => {
    setOffset(offset + 10);
    console.log("load more categories");
  };

  const handleOffsetProductChange = () => {
    setOffsetProduct(offsetProduct + 10);
    console.log("load more...");
  };

  //fetch fakestore api
  useEffect(() => {
    loadMoreCategories();
  }, [offset]);

  useEffect(() => {
    loadMoreProduct();
  }, [offsetProduct]);

  // console.log("Product list", productList);
  // console.log("categories", categories);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View className="mb-10">
          <Header />
          <Search />
        </View>

        <FlatList
          className="flex-row mb-12"
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CategoryItem data={item} />}
          onEndReached={handleOffsetChange}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          keyExtractor={(item, index) => `${item?.id.toString() || index}`} // Ensure to provide a unique key
        />

        <ProductsList
          data={productList}
          loading={loadingProducts}
          handleOffsetProductChange={handleOffsetProductChange}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
