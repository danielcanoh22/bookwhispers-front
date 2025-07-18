import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { useAuth } from "@/context/auth";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

export const ProfilePhoto = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/(auth)/login");
  };

  return (
    <Box className="flex items-center flex-col gap-2 bg-[#EFE5DB] p-4">
      <Button className="bg-[#9A7B62] self-end" onPress={handleLogout}>
        <ButtonText>
          <LogOut color="#ffffff" />
        </ButtonText>
      </Button>

      <Image
        size="xl"
        source={{
          uri: currentUser?.user.profile_picture || DEFAULT_IMAGE,
        }}
        alt="image"
        className="rounded-full"
      />
      <Heading size="lg">{currentUser?.user.username}</Heading>
    </Box>
  );
};
