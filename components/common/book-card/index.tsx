import React from "react";

import { Pressable } from "react-native";
import { Link, RelativePathString } from "expo-router";
import { Book as BookType } from "@/types/global";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";

type BookCardProps = {
  book: BookType;
  path: RelativePathString;
};

export function BookCard({ book, path }: BookCardProps) {
  return (
    <Link
      href={{
        pathname: path,
        params: { bookData: JSON.stringify(book) },
      }}
      asChild
    >
      <Pressable>
        <Box className="flex-1 flex-col items-center gap-2">
          <Box className="w-24 h-36 rounded-lg overflow-hidden shadow-lg">
            <Image
              size="full"
              source={{ uri: book.coverUrl }}
              alt={`Portada de ${book.title}`}
            />
          </Box>
          <Text
            className="text-center font-semibold text-stone-700 mt-1 text-xs"
            numberOfLines={2}
          >
            {book.title}
          </Text>
        </Box>
      </Pressable>
    </Link>
  );
}
