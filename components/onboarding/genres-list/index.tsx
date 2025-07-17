import { Box } from "@/components/ui/box";
import React, { Dispatch, SetStateAction } from "react";
import { GenreCard } from "../card";

type Genre = {
  id: string;
  name: string;
  genreKey: string;
};

type GenresListProps = {
  genres: Genre[];
  selectedGenres: string[];
  setSelectedGenres: Dispatch<SetStateAction<string[]>>;
};

export const GenresList = ({
  genres,
  selectedGenres,
  setSelectedGenres,
}: GenresListProps) => {
  const handleToggleGenre = (genreKey: string) => {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genreKey)) {
        return prevSelected.filter((key) => key !== genreKey);
      } else {
        return [...prevSelected, genreKey];
      }
    });
  };

  return (
    <Box className="flex-row flex-wrap justify-between">
      {genres.map((genre) => (
        <GenreCard
          key={genre.id}
          genre={genre.name}
          genreKey={genre.genreKey}
          isSelected={selectedGenres.includes(genre.genreKey)}
          onPress={() => handleToggleGenre(genre.genreKey)}
        />
      ))}
    </Box>
  );
};
