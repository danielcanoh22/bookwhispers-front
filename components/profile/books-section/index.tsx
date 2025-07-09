import { Book } from "@/components/common/book";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Book as BookType } from "@/types/global";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

type ProfileBooksSectionProps = {
  title: string;
  books: BookType[];
};

export const ProfileBooksSection = ({
  title,
  books,
}: ProfileBooksSectionProps) => {
  return (
    <Box>
      <Heading size="lg" className="mb-4">
        {title}
      </Heading>
      <Box className="flex flex-row justify-between">
        {books.map((book) => (
          <Box key={book.id}>
            <Link
              href={{
                pathname: "/(books)/book/[id]",
                params: { id: book.id },
              }}
              asChild
            >
              <TouchableOpacity>
                <Book
                  title={book.title}
                  coverUrl={book.imageUrl}
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
