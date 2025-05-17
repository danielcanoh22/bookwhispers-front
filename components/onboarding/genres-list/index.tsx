import { Box } from "@/components/ui/box";
import React from "react";
import { GenreCard } from "../card";

const TEST_GENRES = [
  {
    id: "1",
    name: "Fantasía",
    imageKey: "fantasy",
  },
  {
    id: "2",
    name: "Ciencia Ficción",
    imageKey: "science-fiction",
  },
  {
    id: "3",
    name: "Romance",
    imageKey: "romance",
  },
  {
    id: "4",
    name: "Terror",
    imageKey: "terror",
  },
  {
    id: "5",
    name: "Misterio",
    imageKey: "mystery",
  },
  {
    id: "6",
    name: "Aventura",
    imageKey: "adventure",
  },
  {
    id: "7",
    name: "Juvenil",
    imageKey: "juvenile",
  },
  {
    id: "8",
    name: "Poesía",
    imageKey: "poetry",
  },
];

export const GenresList = () => {
  return (
    <Box className="flex-row flex-wrap justify-between">
      {TEST_GENRES.map((genre) => (
        <GenreCard
          key={genre.id}
          genre={genre.name}
          imageKey={genre.imageKey}
        />
      ))}
    </Box>
  );
};
