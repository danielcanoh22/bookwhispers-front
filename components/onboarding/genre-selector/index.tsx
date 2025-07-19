import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { GenresList } from "../genres-list";
import { GENRES } from "@/utils/constants";

type GenreSelectorProps = {
  initialSelectedGenres?: string[];
  onSubmit: (selectedGenres: string[]) => void;
  submitButtonText: string;
  onSkip?: () => void;
  isLoading?: boolean;
};

export const GenreSelector = ({
  initialSelectedGenres = [],
  onSubmit,
  submitButtonText,
  onSkip,
  isLoading = false,
}: GenreSelectorProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialSelectedGenres
  );

  return (
    <Box className="flex flex-col gap-8">
      {onSkip && (
        <Button
          className="self-end bg-[#36A875]"
          onPress={onSkip}
          isDisabled={isLoading}
        >
          <ButtonText>Omitir</ButtonText>
        </Button>
      )}

      {onSkip && (
        <Heading size="3xl" className="text-center mb-4 text-[#9A7B62]">
          Selecciona 3 o más géneros literarios que te gusten 😁
        </Heading>
      )}

      <GenresList
        genres={GENRES}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <Button
        className="bg-[#36A875]"
        onPress={() => onSubmit(selectedGenres)}
        isDisabled={isLoading || selectedGenres.length < 3}
      >
        <ButtonText>{isLoading ? "Guardando..." : submitButtonText}</ButtonText>
      </Button>
    </Box>
  );
};
