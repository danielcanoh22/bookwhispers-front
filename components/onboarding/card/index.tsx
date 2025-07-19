import { CheckCircle2 } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from "react-native";

const genreImages: Record<string, any> = {
  fantasy: require("@/assets/images/genres/fantasy.png"),
  "science-fiction": require("@/assets/images/genres/scifi.png"),
  romance: require("@/assets/images/genres/romance.png"),
  terror: require("@/assets/images/genres/terror.png"),
  suspense: require("@/assets/images/genres/mystery.png"),
  history: require("@/assets/images/genres/adventure.png"),
  dystopia: require("@/assets/images/genres/juvenile.png"),
  drama: require("@/assets/images/genres/poetry.png"),
};

type GenreCardProps = {
  genre: string;
  genreKey: keyof typeof genreImages;
  isSelected: boolean;
  onPress: () => void;
};

export const GenreCard = ({
  genre,
  genreKey,
  isSelected,
  onPress,
}: GenreCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-xl overflow-hidden w-44 h-24 m-2"
    >
      <Box
        className={`flex-1 relative rounded-xl border-2 ${
          isSelected
            ? "border-[#9A7B62] bg-[#EADDD5]"
            : "border-[#9A7B6250] bg-[#EFE5DB]"
        }`}
      >
        <Image
          source={genreImages[genreKey]}
          size="xl"
          alt={`Imagen representativa del género ${genre}`}
          className="absolute opacity-25 -right-10"
        />

        {isSelected && (
          <Box className="absolute top-2 right-2 bg-white rounded-full">
            <CheckCircle2 size={24} color="#36A875" />
          </Box>
        )}

        <Box className="flex-1 justify-center px-4">
          <Text className="text-xl font-semibold text-[#6d4525]">{genre}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
