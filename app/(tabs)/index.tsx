import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="p-2 h-screen"
    >
      <Heading className="text-green-500">BookWhispers</Heading>
    </ThemedView>
  );
}
