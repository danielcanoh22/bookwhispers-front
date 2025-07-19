import { Heading } from "@/components/ui/heading";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Book } from "@/components/common/book";
import { Book as BookType } from "@/types/global";
import { Box } from "@/components/ui/box";

type HomeSectionProps = {
  title: string;
  category: string;
  books: BookType[] | undefined;
  allBooks?: BookType[];
};

export const HomeSection = ({
  title,
  category,
  books,
  allBooks,
}: HomeSectionProps) => {
  const seeMoreParams: {
    title: string;
    category: string;
    booksData?: string;
  } = {
    title,
    category,
  };

  if (allBooks) {
    seeMoreParams.booksData = JSON.stringify(allBooks);
  }

  return (
    <Box>
      <Box className="flex-row items-center justify-between">
        <Heading size="xl" className="text-[#9A7B62] text-lg font-semibold">
          {title}
        </Heading>
        <Box className="flex-row items-center gap-4">
          <Link
            href={{
              pathname: "/(books)/all-books/all-books",
              params: seeMoreParams,
            }}
            className="bg-white py-2 px-4 rounded-full text-[#9A7B62]"
          >
            Ver más
          </Link>
        </Box>
      </Box>

      <Box className="flex flex-row flex-wrap justify-between mt-4">
        {books?.map((book) => (
          <Box key={book.id}>
            <Link
              href={{
                pathname: "/(books)/book/[id]",
                params: { id: book.id, bookData: JSON.stringify(book) },
              }}
              asChild
            >
              <TouchableOpacity>
                <Book
                  title={book.title}
                  coverUrl={book.coverUrl}
                  bookColor="#25a2c4"
                />
              </TouchableOpacity>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
