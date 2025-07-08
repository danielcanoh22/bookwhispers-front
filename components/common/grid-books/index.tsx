import { Box } from "@/components/ui/box";
import { Book as BookType } from "@/types/global";
import { Book } from "../book";
import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

type GridBooksProps = {
  heading?: string;
  books: BookType[];
};

export const GridBooks = ({ heading, books }: GridBooksProps) => {
  return (
    <Box>
      {heading && (
        <Heading
          size="xl"
          className="text-[#9A7B62] text-lg font-semibold mb-4"
        >
          {heading}
        </Heading>
      )}

      <Box className="flex flex-row justify-evenly flex-wrap gap-4">
        {books.map((book) => (
          <Link
            href={{
              pathname: "/(books)/book/[id]",
              params: { id: book.id },
            }}
            key={book.id}
            asChild
          >
            <TouchableOpacity>
              <Book coverUrl={book.imageUrl} bookColor="#25a2c4" />
            </TouchableOpacity>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

{
  /* <Grid
  className="gap-5"
  _extra={{
    className: "grid-cols-8",
  }}
>
  <GridItem
    className="bg-background-50 p-6 rounded-md"
    _extra={{
      className: "col-span-3",
    }}
  />
  <GridItem
    className="bg-background-50 p-6 rounded-md"
    _extra={{
      className: "col-span-5",
    }}
  />
  <GridItem
    className="bg-background-50 p-6 rounded-md"
    _extra={{
      className: "col-span-6",
    }}
  />
</Grid>; */
}
