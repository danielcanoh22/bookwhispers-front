import { Link, useRouter } from "expo-router";
import { AlertTriangle, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { MailIcon, LockIcon, ExternalLinkIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { Alert } from "react-native";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = { fullName: "", username: "", email: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido.";
      isValid = false;
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Por favor, ingresa un correo válido.";
      isValid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      router.push({
        pathname: "/onboarding/genres",
        params: formData,
      });
    } else {
      Alert.alert("Formulario inválido", "Por favor corrige los errores.");
    }
  };

  return (
    <ThemedView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="p-2 h-screen"
    >
      <Box className="flex flex-col justify-center h-full px-4">
        <Box className="flex flex-col items-center gap-2 mb-10">
          <Heading className="text-slate-500 text-2xl">
            Crear una Cuenta
          </Heading>
        </Box>
        <VStack space="4xl">
          <FormControl isInvalid={!!errors.username}>
            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={User} />
              </InputSlot>
              <InputField
                type="text"
                placeholder="Nombre de usuario (ej. sarah25)"
                value={formData.username}
                onChangeText={(value) => handleInputChange("username", value)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="xs" />
              <FormControlErrorText>{errors.username}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={MailIcon} />
              </InputSlot>
              <InputField
                type="text"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="xs" />
              <FormControlErrorText>{errors.email}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={LockIcon} />
              </InputSlot>
              <InputField
                type="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="xs" />
              <FormControlErrorText>{errors.password}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            size="lg"
            className="bg-[#36A875] text-white font-medium"
            onPress={handleSubmit}
          >
            <ButtonText>Registrarse</ButtonText>
          </Button>
        </VStack>

        <Divider className="my-8" />

        <Box className="flex flex-row justify-end items-center mb-6">
          <Text>¿Ya tienes una cuenta? </Text>
          <Link
            href="/(auth)/login"
            className="text-[#36A875] font-medium text-base"
          >
            Ingresa aquí
          </Link>
        </Box>

        <Button size="lg" className="bg-[#c5b3a3] text-white font-medium">
          <ButtonIcon as={ExternalLinkIcon} />
          <ButtonText>Iniciar sesión con Google</ButtonText>
        </Button>
      </Box>
    </ThemedView>
  );
}
