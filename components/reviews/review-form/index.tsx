import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/services/reviews";
import { Box } from "@/components/ui/box";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Button, ButtonText } from "@/components/ui/button";
import { Alert } from "react-native";

type ReviewFormProps = {
  bookId: string;
  onFocus: () => void;
};

export function ReviewForm({ bookId, onFocus }: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      Alert.alert("Éxito", "Tu reseña ha sido publicada.");
      queryClient.invalidateQueries({ queryKey: ["reviews", bookId] });
      setText("");
    },
    onError: (error) => {
      Alert.alert("Error", "No se pudo publicar la reseña.");
    },
  });

  const handlePublish = () => {
    if (text.trim().length < 10) {
      Alert.alert(
        "Reseña muy corta",
        "Por favor, escribe al menos 10 caracteres."
      );
      return;
    }
    createReviewMutation.mutate({ text, bookId });
  };

  return (
    <Box className="flex flex-col gap-2">
      <Textarea
        size="md"
        isInvalid={false}
        isDisabled={createReviewMutation.isLoading}
      >
        <TextareaInput
          className="bg-white"
          placeholder="Escribe tu reseña..."
          value={text}
          onChangeText={setText}
          onFocus={onFocus}
        />
      </Textarea>
      <Button
        className="bg-[#36A875] self-end px-8"
        onPress={handlePublish}
        isDisabled={createReviewMutation.isLoading}
      >
        <ButtonText>
          {createReviewMutation.isLoading ? "Publicando..." : "Enviar"}
        </ButtonText>
      </Button>
    </Box>
  );
}
