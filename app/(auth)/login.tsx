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
// import { Link, LinkText } from "@/components/ui/link";
import { HStack } from "@/components/ui/hstack";
import { Link } from "expo-router";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email.length < 6 || password.length < 6) {
      setIsValid(true);
    } else {
      setIsValid(false);
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
        <FormControl isInvalid={isValid}>
          <VStack space="4xl">
            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={MailIcon} />
              </InputSlot>
              <InputField
                type="text"
                placeholder="correo@ejemplo.com"
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
            </Input>

            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={LockIcon} />
              </InputSlot>
              <InputField
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                No se pudo iniciar sesión. Verifica tu correo y contraseña.
              </FormControlErrorText>
            </FormControlError>

            <Button
              size="lg"
              className="bg-[#36A875] text-white font-medium pressed:bg-red-500"
              onPress={handleSubmit}
            >
              <ButtonText>Ingresar</ButtonText>
            </Button>
          </VStack>
        </FormControl>

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
