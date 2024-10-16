import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen } from "expo-router";
import AppLoading from "expo-app-loading";

export default function Profile() {
  return (
    <View style={style.container}>
      <Text style={{ fontFamily: "Bold" }} className="text-primary">
        profile
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    fontFamily: "Regular",
    display: "flex",
  },
});
