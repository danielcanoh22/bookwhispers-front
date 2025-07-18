import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://192.168.20.31:3000";

export const selectImage = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    Alert.alert(
      "Permiso requerido",
      "Necesitas dar permiso para acceder a tus fotos."
    );
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });

  if (pickerResult.canceled === true) {
    return;
  }

  return pickerResult.assets[0].uri;
};

export const uploadImageToCloudinary = async (uri: string) => {
  const CLOUD_NAME = "du9gij9pp";
  const UPLOAD_PRESET = "personal-projects";
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  const fileType = uri.split(".").pop();

  formData.append("file", {
    uri,
    name: `upload.${fileType}`,
    type: `image/${fileType}`,
  } as any);

  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("La subida de la imagen falló.");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    Alert.alert("Error", "No se pudo subir la imagen.");
    throw error;
  }
};

type UserProfileUpdatePayload = {
  profile_picture?: string;
  bio?: string;
  favorite_genres?: string[];
};

export const updateUserProfile = async (
  updateData: UserProfileUpdatePayload
) => {
  console.log("Vamos a ejecutar la función");
  try {
    const token = await SecureStore.getItemAsync("userToken");

    console.log("El token: ", token);

    if (!token) {
      throw new Error("Usuario no autenticado.");
    }

    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo actualizar el perfil");
    }

    console.log("Pa actualizar: ", updateData);

    return response.json();
  } catch (error) {
    throw error;
  }
};
