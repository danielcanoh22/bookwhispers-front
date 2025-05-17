import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";

const genreImages: Record<string, any> = {
  fantasy: require("@/assets/images/genres/fantasy.png"),
  "science-fiction": require("@/assets/images/genres/scifi.png"),
  romance: require("@/assets/images/genres/romance.png"),
  terror: require("@/assets/images/genres/terror.png"),
  mystery: require("@/assets/images/genres/mystery.png"),
  adventure: require("@/assets/images/genres/adventure.png"),
  juvenile: require("@/assets/images/genres/juvenile.png"),
  poetry: require("@/assets/images/genres/poetry.png"),
};

type GenreCardProps = {
  genre: string;
  imageKey: keyof typeof genreImages;
};

export const GenreCard = ({ genre, imageKey }: GenreCardProps) => {
  return (
    <TouchableOpacity
      // onPress={onPress}
      className="rounded-xl overflow-hidden w-44 h-24 m-2"
    >
      <Box className="flex-1 relative bg-[#EFE5DB] border-2 border-[#9A7B6250] rounded-xl">
        <Image
          source={genreImages[imageKey]}
          size="xl"
          alt={`Imagen representativa del género ${genre}`}
          className="absolute opacity-25 -right-10"
        />

        <Box className="flex-1 justify-center px-4">
          <Text className="text-xl font-semibold text-[#6d4525]">{genre}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
