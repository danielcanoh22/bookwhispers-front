import React, { forwardRef, useImperativeHandle, useState } from "react";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { GenresList } from "@/components/onboarding/genres-list"; // Reutilizamos el componente de géneros
import { useAuth } from "@/context/auth";
import {
  selectImage,
  updateUserProfile,
  uploadImageToCloudinary,
} from "@/services/profile";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Button, ButtonText } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { UserLoginData } from "@/types/auth";
import { useRouter } from "expo-router";
import { GENRES } from "@/utils/constants";

export const EditProfileForm = forwardRef((props, ref) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [bio, setBio] = useState(currentUser?.user.bio);
  const [localImageUri, setLocalImageUri] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    currentUser?.user.favorite_genres || []
  );

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUserData) => {
      if (currentUser) {
        updateCurrentUser({
          token: currentUser?.token,
          user: {
            ...currentUser?.user,
            ...updatedUserData,
          },
        });
        Alert.alert("Éxito", "Tu perfil ha sido guardado.");
        queryClient.invalidateQueries({ queryKey: ["userData"] });
        router.back();
      }
    },
    onError: (error) => {
      Alert.alert("Error", "No se pudieron guardar los cambios.");
    },
  });

  const handleSelectImage = async () => {
    const uri = await selectImage();
    if (uri) {
      setLocalImageUri(uri);
    }
  };

  useImperativeHandle(ref, () => ({
    async submit() {
      let finalImageUrl = currentUser?.user.profile_picture;

      if (localImageUri) {
        try {
          finalImageUrl = await uploadImageToCloudinary(localImageUri);
        } catch (error) {
          Alert.alert("Error", "No se pudo subir la nueva foto de perfil.");
          return;
        }
      }

      const updatedData: Partial<UserLoginData> = {
        bio,
        profile_picture: finalImageUrl,
        favorite_genres: selectedGenres,
      };

      updateProfileMutation.mutate(updatedData);
    },
  }));

  const imageToShow = localImageUri || currentUser?.user.profile_picture;

  return (
    <VStack space="lg">
      <Box className="items-center gap-4">
        {imageToShow && (
          <Image
            source={{ uri: imageToShow }}
            alt="Foto de perfil"
            size="xl"
            className="rounded-full mb-2"
          />
        )}
        <Button
          variant="outline"
          action="secondary"
          onPress={handleSelectImage}
          isDisabled={updateProfileMutation.isLoading}
        >
          <ButtonText>Cambiar Foto</ButtonText>
        </Button>
      </Box>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Biografía</FormControlLabelText>
        </FormControlLabel>
        <Textarea>
          <TextareaInput
            value={bio}
            onChangeText={setBio}
            placeholder="Cuéntanos un poco sobre ti..."
          />
        </Textarea>
      </FormControl>

      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>
            Géneros Favoritos (Escoge al menos 3)
          </FormControlLabelText>
        </FormControlLabel>

        <GenresList
          genres={GENRES}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </FormControl>
    </VStack>
  );
});
