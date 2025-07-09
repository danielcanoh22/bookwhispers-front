import React from "react";
import { FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";

import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { ReviewBubble } from "@/components/reviews/review-bubble";

const MOCK_REVIEWS = [
  {
    id: "1",
    text: "¡Un libro absolutamente mágico! La forma en que se construye el mundo es increíble y los personajes son inolvidables.",
    user: { id: "user-002", name: "Ana Morales" },
  },
  {
    id: "2",
    text: "Me ha encantado. Lo leí en un par de días porque no podía soltarlo. Lo recomiendo 100%.",
    user: { id: "user-003", name: "Carlos Diaz" },
  },
  {
    id: "3",
    text: "Esta fue mi reseña. La verdad es que esperaba un poco más del final, pero en general es una gran lectura.",
    user: { id: "current_user_id", name: "Tú" },
  },
  {
    id: "4",
    text: "Perfecto para una tarde de lluvia. Es una historia que te atrapa desde la primera página.",
    user: { id: "user-004", name: "Sofia Castro" },
  },
  {
    id: "5",
    text: "Un clásico moderno. No importa cuántas veces lo lea, siempre encuentro algo nuevo que me fascina.",
    user: { id: "user-005", name: "Luis Fer" },
  },
  {
    id: "6",
    text: "Un libro muy entretenido.",
    user: { id: "user-006", name: "Anónimo" },
  },
];

const BUBBLE_COLORS = ["#EFE5DB", "#D4E7C5", "#F0E5F3", "#D6EAF8"];

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();

  const { bookId } = useLocalSearchParams();
  const currentUserId = "current_user_id";

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <Box className="p-4">
        <Heading size="xl" className="text-center text-[#9A7B62]">
          Opiniones de los Lectores
        </Heading>
      </Box>

      <FlatList
        data={MOCK_REVIEWS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReviewBubble
            review={item}
            color={BUBBLE_COLORS[index % BUBBLE_COLORS.length]}
            isOwnReview={index % 2 !== 0}
          />
        )}
        ItemSeparatorComponent={() => <Box className="h-4" />}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingTop: 10,
        }}
      />
    </ThemedView>
  );
}
