import {
  useFonts,
  Inter_900Black,
  InterTight_300Light,
  InterTight_400Regular,
  InterTight_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/dev";

export const useFont = () => {
  return useFonts({
    Inter_900Black,
    InterTight_300Light,
    InterTight_400Regular,
    InterTight_500Medium,
    Inter_600SemiBold,
  });
};
