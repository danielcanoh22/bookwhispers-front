import { ImageSourcePropType } from "react-native";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";

type InformationAchievementProps = {
  achievement: ImageSourcePropType;
};

export const ProfileInformationAchievement = ({
  achievement,
}: InformationAchievementProps) => {
  return (
    <Box className="w-20 h-20 bg-[#b0bd9b] p-2 flex flex-row items-center justify-center rounded-full">
      <Image
        size="sm"
        source={achievement}
        alt="image"
        className="rounded-full"
      />
    </Box>
  );
};
