import React from "react";
import { Alert, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";

import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { ReviewBubble } from "@/components/reviews/review-bubble";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getReviewsForBook } from "@/services/reviews";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/auth";

const BUBBLE_COLORS = ["#EFE5DB", "#D4E7C5", "#F0E5F3", "#D6EAF8"];

const renderEmptyReview = () => (
  <Box className="flex-1 justify-center items-center">
    <Text className="text-lg text-stone-500 mt-10">
      Este libro aún no tiene reseñas.
    </Text>
    <Text className="text-base text-stone-400">¡Anímate a escribir una!</Text>
  </Box>
);

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams();
  const { currentUser } = useAuth();

  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsForBook(id as string),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      Alert.alert("Éxito", "Tu reseña ha sido eliminada.");
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    },
    onError: (error) => {
      Alert.alert("Error", "No se pudo eliminar la reseña.");
    },
  });

  const handleDelete = (reviewId: string) => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que quieres eliminar esta reseña?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => deleteReviewMutation.mutate(reviewId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <Box className="p-4">
        <Heading size="xl" className="text-center text-[#9A7B62]">
          Opiniones de los Lectores
        </Heading>
      </Box>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item: review, index }) => {
          const isOwnReview =
            review.user.username === currentUser?.user.username;

          return (
            <ReviewBubble
              review={review}
              color={BUBBLE_COLORS[index % BUBBLE_COLORS.length]}
              isOwnReview={isOwnReview}
              onDelete={isOwnReview ? () => handleDelete(review.id) : undefined}
            />
          );
        }}
        ItemSeparatorComponent={() => <Box className="h-4" />}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingTop: 10,
        }}
        ListEmptyComponent={renderEmptyReview}
      />
    </ThemedView>
  );
}
