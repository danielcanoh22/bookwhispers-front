import { ScreenContainer } from "@/components/common/container";
import { GenreSelector } from "@/components/onboarding/genre-selector";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/auth";
import { registerUser } from "@/services/auth";
import { User } from "@/types/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GenreSelectionScreen() {
  const registrationData = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
          <GenreSelector
            onSubmit={handleFinishRegistration}
            onSkip={() => handleFinishRegistration([])}
            submitButtonText="Finalizar"
            isLoading={isLoading}
          />
        </ScreenContainer>
      </ScrollView>
    </ThemedView>
  );
}
