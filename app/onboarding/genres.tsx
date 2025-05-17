import { ScreenContainer } from "@/components/common/container";
import { GenresList } from "@/components/onboarding/genres-list";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GenreSelectionScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={{ paddingBottom: insets.bottom, paddingTop: insets.top, flex: 1 }}
      className="h-screen"
    >
      <ScrollView>
        <ScreenContainer>
          <Box className="flex flex-col gap-8">
            <Heading size="3xl" className="text-center mb-4 text-[#9A7B62]">
              Selecciona 3 o más géneros literarios que te gusten 😁
            </Heading>
            <GenresList />

            <Link
              href="/(tabs)"
              className="bg-[#36A875] text-center p-4 rounded-xl text-white text-xl font-semibold"
            >
              Finalizar
            </Link>
          </Box>
        </ScreenContainer>
      </ScrollView>
    </ThemedView>
  );
}
