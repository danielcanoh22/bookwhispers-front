import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import {
  AlertCircleIcon,
  MailIcon,
  LockIcon,
  ExternalLinkIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/auth";
import { AlertTriangle } from "lucide-react-native";
import { Alert } from "react-native";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = { usernameOrEmail: "", password: "" };
    let isValid = true;

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail =
        "El nombre de usuario o correo electrónico es requerido.";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    if (validateForm()) {
      setIsLoading(true);

      try {
        await login({
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        });

        router.push({
          pathname: "/(tabs)",
        });
      } catch (error) {
        Alert.alert(
          "Error al Iniciar Sesión",
          "No se pudo iniciar sesión. Por favor, intenta de nuevo."
        );
      } finally {
        setIsLoading(false);
      }
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
          <Image
            size="xl"
            source={{
              uri: "https://th.bing.com/th/id/OIP.tIgd6r8_AncWDtVMUZFLbQHaGx?rs=1&pid=ImgDetMain",
            }}
            alt="image"
          />
          <Heading className="text-slate-500 text-2xl">BookWhispers</Heading>
        </Box>
        <VStack space="4xl">
          <FormControl isInvalid={!!errors.usernameOrEmail}>
            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={MailIcon} />
              </InputSlot>
              <InputField
                type="text"
                placeholder="Nombre de usuario o correo electrónico"
                value={formData.usernameOrEmail}
                onChangeText={(value) =>
                  handleInputChange("usernameOrEmail", value)
                }
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} size="xs" />
              <FormControlErrorText>
                {errors.usernameOrEmail}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
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
            className="bg-[#36A875] text-white font-medium pressed:bg-red-500"
            onPress={handleSubmit}
          >
            <ButtonText>Ingresar</ButtonText>
          </Button>
        </VStack>

        <Divider className="my-6" />

        <Box className="flex flex-row justify-end items-center mb-6">
          <Text>¿No tienes una cuenta? </Text>
          <Link
            href="/(auth)/register"
            className="text-[#36A875] font-medium text-base"
          >
            Regístrate
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
