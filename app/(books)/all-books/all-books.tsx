import React, { useMemo } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import {
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookCard } from "@/components/common/book-card";
import { searchBooks } from "@/services/search";
import { Book as BookType } from "@/types/global";
import { Book } from "@/components/common/book";

export default function AllBooksScreen() {
  const insets = useSafeAreaInsets();

  const { title, category, booksData } = useLocalSearchParams<{
    title: string;
    category: string;
    booksData?: string;
  }>();

  const passedBooks: BookType[] | null = useMemo(() => {
    if (booksData) {
      try {
        return JSON.parse(booksData);
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [booksData]);

  const {
    data: fetchedBooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["books", category],
    queryFn: () => searchBooks({ subject: category }),
    enabled: !passedBooks && !!category,
  });

  const booksToDisplay = passedBooks || fetchedBooks;

  if (isLoading && !passedBooks) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (isError) {
    return <Text>Error al cargar los libros.</Text>;
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <Box className="p-4 border-b border-stone-200">
        <Heading size="2xl" className="text-center text-[#9A7B62] font-bold">
          {title}
        </Heading>
      </Box>

      <FlatList
        data={booksToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(books)/book/[id]",
              params: { id: item.id, bookData: JSON.stringify(item) },
            }}
            asChild
          >
            <TouchableOpacity>
              <Book
                title={item.title}
                coverUrl={item.coverUrl}
                bookColor="#25a2c4"
              />
            </TouchableOpacity>
          </Link>
        )}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-around", gap: 16 }}
        ItemSeparatorComponent={() => <Box className="h-6" />}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 20,
        }}
      />
    </ThemedView>
  );
}
