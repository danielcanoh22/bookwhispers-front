import { ScreenContainer } from "@/components/common/container";
import { GenresList } from "@/components/onboarding/genres-list";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useAuth } from "@/context/auth";
import { registerUser } from "@/services/auth/api";
import { User } from "@/types/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TEST_GENRES = [
  {
    id: "1",
    name: "Fantasía",
    genreKey: "fantasy",
  },
  {
    id: "2",
    name: "Ciencia Ficción",
    genreKey: "science-fiction",
  },
  {
    id: "3",
    name: "Romance",
    genreKey: "romance",
  },
  {
    id: "4",
    name: "Terror",
    genreKey: "terror",
  },
  {
    id: "5",
    name: "Suspenso",
    genreKey: "suspense",
  },
  {
    id: "6",
    name: "Historia",
    genreKey: "history",
  },
  {
    id: "7",
    name: "Drama",
    genreKey: "drama",
  },
  {
    id: "8",
    name: "Distopía",
    genreKey: "dystopia",
  },
];

export default function GenreSelectionScreen() {
  const registrationData = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleFinishRegistration = async (genresToSubmit: string[]) => {
    if (isLoading) return;
    setIsLoading(true);

    const finalUserData = {
      ...(registrationData as Omit<User, "favorite_genres">),
      favorite_genres: genresToSubmit,
    };

    console.log("Datos: ", finalUserData);

    try {
      await registerUser(finalUserData);

      await login({
        usernameOrEmail: finalUserData.email || finalUserData.username,
        password: finalUserData.password,
      });

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el registro.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView
      style={{ paddingBottom: insets.bottom, paddingTop: insets.top, flex: 1 }}
      className="h-screen"
    >
      <ScrollView>
        <ScreenContainer>
          <Box className="flex flex-col gap-8">
            <Button
              className="self-end bg-[#36A875]"
              onPress={() => handleFinishRegistration([])}
            >
              <ButtonText>Omitir</ButtonText>
            </Button>

            <Heading size="3xl" className="text-center mb-4 text-[#9A7B62]">
              Selecciona 3 o más géneros literarios que te gusten 😁
            </Heading>
            <GenresList
              genres={TEST_GENRES}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />

            <Button
              className="bg-[#36A875] text-center text-white text-xl font-semibold"
              onPress={() => handleFinishRegistration(selectedGenres)}
              isDisabled={isLoading || selectedGenres.length < 3}
            >
              <ButtonText>Finalizar</ButtonText>
            </Button>
          </Box>
        </ScreenContainer>
      </ScrollView>
    </ThemedView>
  );
}
