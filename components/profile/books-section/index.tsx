import { Book } from "@/components/common/book";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Book as BookType } from "@/types/global";

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
          <Book
            key={book.id}
            title={book.title}
            bookColor="#25a2c4"
            coverUrl={book.imageUrl}
          />
        ))}
      </Box>
    </Box>
  );
};
