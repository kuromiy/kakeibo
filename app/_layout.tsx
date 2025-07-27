import { db } from "@/features/database";
import { seedCategories } from "@/features/database/seed";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import migrations from "../drizzle/migrations";
import "../global.css";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      console.log("Migrations completed successfully");
      // マイグレーション成功後にカテゴリのシーディングを実行
      seedCategories();
    }
  }, [success]);

  if (error) {
    console.error("Migration error:", error);
  }

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-transaction"
          options={{
            headerShown: false,
            presentation: "modal",
            contentStyle: { backgroundColor: "#0A0A0A" }, // theme.colors.background
          }}
        />
        <Stack.Screen name="history" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
