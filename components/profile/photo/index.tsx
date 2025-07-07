import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";

type ProfilePhotoProps = {
  name: string;
  image?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

export const ProfilePhoto = ({ name, image }: ProfilePhotoProps) => {
  return (
    <Box className="flex items-center flex-col gap-2 bg-[#EFE5DB] p-4">
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
