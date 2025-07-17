import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { useAuth } from "@/context/auth";
import { useRouter } from "expo-router";

type ProfilePhotoProps = {
  name: string;
  image?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

export const ProfilePhoto = ({ name, image }: ProfilePhotoProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/(auth)/login");
  };

  return (
    <Box className="flex items-center flex-col gap-2 bg-[#EFE5DB] p-4">
      <Button className="bg-[#36A875] self-end" onPress={handleLogout}>
        <ButtonText>Cerrar sesión</ButtonText>
      </Button>

      <Image
        size="xl"
        source={{
          uri: image || DEFAULT_IMAGE,
        }}
        alt="image"
        className="rounded-full"
      />
      <Heading size="lg">{name}</Heading>
    </Box>
  );
};
