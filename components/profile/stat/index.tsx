import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

type ProfileStatProps = {
  text: string;
  value: number;
};

export const ProfileStat = ({ text, value }: ProfileStatProps) => {
  return (
    <Box className="flex flex-col items-center">
      <Text className="font-semibold text-xl text-gray-800">{text}</Text>
      <Text className="text-[#4c5a38] text-lg font-semibold">{value}</Text>
    </Box>
  );
};
