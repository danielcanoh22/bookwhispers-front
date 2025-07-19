import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image"; // 👈 Importa el componente Image
import { Review } from "@/types/global";
import { Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";

type ReviewBubbleProps = {
  review: Review;
  color: string;
  isOwnReview: boolean;
  onDelete?: () => void;
};

export const ReviewBubble = ({
  review,
  color,
  isOwnReview,
  onDelete,
}: ReviewBubbleProps) => {
  const imageComponent = (
    <Image
      source={{ uri: review.user.profile_picture }}
      alt={`Foto de perfil de ${review.user.username}`}
      size="xs"
      className="rounded-full"
    />
  );

  const bubbleComponent = (
    <Box
      style={{ backgroundColor: color }}
      className="max-w-[85%] rounded-2xl p-4 shadow-sm"
    >
      <Text className="text-base text-stone-800">{review.text}</Text>
      <Text className="mt-2 self-end text-xs font-bold text-stone-600">
        - {review.user.username}
      </Text>
    </Box>
  );

  return (
    <Box
      className={`w-full px-4 ${
        isOwnReview ? "justify-end" : "justify-start"
      } flex-row`}
    >
      <Box className="flex-row items-end gap-2 max-w-[90%]">
        {!isOwnReview && imageComponent}

        {isOwnReview && (
          <Pressable onPress={onDelete} hitSlop={10}>
            <Trash2 size={18} color="#ef4444" />
          </Pressable>
        )}

        {bubbleComponent}
        {isOwnReview && imageComponent}
      </Box>
    </Box>
  );
};
