import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TasksDataLayout() {
  return (
    <SafeAreaView style={{flex:1}}>
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#e5a0a0ff" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    />
    </SafeAreaView>
  );
}