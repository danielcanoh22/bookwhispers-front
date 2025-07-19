import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export const Message = ({ text }: { text: string }) => {
  return (
    <Box className="bg-blue-200 p-4 rounded-lg">
      <Text className="text-blue-800">{text}</Text>
    </Box>
  );
};
