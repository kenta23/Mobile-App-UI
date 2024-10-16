import {
  useFonts,
  MajorMonoDisplay_400Regular,
  InterTight_400Regular,
  Inter_600SemiBold,
  InterTight_300Light,
  InterTight_500Medium,
  Inter_900Black,
} from "@expo-google-fonts/dev";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../globals.css";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [mainFont, error] = useFonts({
    Bold: Inter_900Black,
    Light: InterTight_300Light,
    Regular: InterTight_400Regular,
    Medium: InterTight_500Medium,
    SemiBold: Inter_600SemiBold,
    MajorMonoDisplay: MajorMonoDisplay_400Regular,
  });

  useEffect(() => {
    if (mainFont || error) {
      SplashScreen.hideAsync();
    }
  }, [mainFont, error]);

  if (!mainFont && !error) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="user/[id]"
        getId={({ params }) => String(Date.now())}
        options={{ title: "User", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="product/[id]"
        getId={({ params }) => String(Date.now())}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
