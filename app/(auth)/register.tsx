import { Link, useRouter } from "expo-router";
import { User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { MailIcon, LockIcon, ExternalLinkIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/auth";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login } = useAuth();

  const [isValid, setIsValid] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // if (email.length < 6) {
    //   setIsValid(true);
    // } else {
    //   setIsValid(false);
    // }
    login();
    router.push("/onboarding/genres");
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
        <FormControl isInvalid={isValid}>
          <VStack space="4xl">
            <Input className="" variant="underlined" size="lg">
              <InputSlot className="pr-2">
                <InputIcon as={User} />
              </InputSlot>
              <InputField
                type="text"
                placeholder="Jefferson Gutierritos"
                value={fullName}
                onChangeText={(value) => setFullName(value)}
              />
            </Input>
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
            <Button
              size="lg"
              className="bg-[#36A875] text-white font-medium pressed:bg-red-500"
              onPress={handleSubmit}
            >
              <ButtonText>Registrarse</ButtonText>
            </Button>
          </VStack>
        </FormControl>

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
