import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold leading-8 text-text mb-4">
          This screen does not exist.
        </Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-base leading-8 text-primary font-medium">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
