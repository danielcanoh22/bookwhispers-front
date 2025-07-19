import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ProfileInformationAchievement } from "../information-achievement";

const achievement1 = require("/assets/images/achievements/achievement1.png");
const achievement2 = require("/assets/images/achievements/achievement2.png");
const achievement3 = require("/assets/images/achievements/achievement3.png");

type InformationSectionProps = {
  type: "info" | "achievements";
  heading: string;
  text?: string;
};

export const ProfileInformationSection = ({
  type,
  heading,
  text,
}: InformationSectionProps) => {
  if (type === "info")
    return (
      <Box className="flex flex-col gap-2">
        <Heading size="lg">{heading}</Heading>
        <Text className="text-lg">{text}</Text>
      </Box>
    );

  return (
    <Box className="flex flex-col gap-2">
      <Heading size="lg">{heading}</Heading>
      <Box className="flex flex-row items-center gap-4 flex-wrap">
        <ProfileInformationAchievement achievement={achievement1} />
        <ProfileInformationAchievement achievement={achievement2} />
        <ProfileInformationAchievement achievement={achievement3} />
      </Box>
    </Box>
  );
};
