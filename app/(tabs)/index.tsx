import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { QueryProvider } from "../../providers/QueryProviders";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <QueryProvider>
      <ThemedView
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="p-2 h-screen"
      >
        <Heading className="text-green-500">BookWhispers</Heading>
        <Link href="/search/search" asChild>
          <TouchableOpacity>
            <View className="bg-gray-200 p-3 rounded-lg mt-4">
              <Text className="text-gray-500">Buscar un libro...</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </QueryProvider>
  );
}
