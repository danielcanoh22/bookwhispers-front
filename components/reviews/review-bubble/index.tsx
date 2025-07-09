import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

type Review = {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
  };
};

type ReviewBubbleProps = {
  review: Review;
  color: string;
  isOwnReview: boolean;
};

export const ReviewBubble = ({
  review,
  color,
  isOwnReview,
}: ReviewBubbleProps) => {
  const alignment = isOwnReview ? "flex-end" : "flex-start";

  return (
    <Box
      className={`w-full flex-col px-4 ${
        isOwnReview ? "items-end" : "items-start"
      }`}
    >
      <Box
        style={{ backgroundColor: color }}
        className="max-w-[85%] rounded-2xl p-4 shadow-sm"
      >
        <Text className="text-base text-stone-800">{review.text}</Text>
        <Text className="mt-2 self-end text-xs font-bold text-stone-600">
          - {review.user.name}
        </Text>
      </Box>
    </Box>
  );
};
