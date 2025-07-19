import React, { useState, useRef, useCallback } from "react";
import { FlatList, Switch, Text, TouchableOpacity } from "react-native";

import { SearchBar } from "@/components/search/search-bar";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import { Link } from "expo-router";
import { Book } from "@/components/common/book";

const renderEmptySearch = () => (
  <Box className="flex-1 justify-center items-center">
    <Text className="text-lg text-stone-500 mt-10">
      Aún no has realizado ninguna búsqueda.
    </Text>
    <Text className="text-base text-stone-400">
      Prueba buscar libros por su nombre o género 😀
    </Text>
  </Box>
);

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchByTitle, setSearchByTitle] = useState(true);

  const searchBy = searchByTitle ? "title" : "subject";
  const { searchResults, isLoading, isError } = useSearchBooks(
    searchTerm,
    searchBy
  );

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
  }, []);

  const renderHeader = useCallback(
    () => (
      <Box>
        <Box className="bg-[#EFE5DB] px-4 py-8">
          <SearchBar onSearch={handleSearch} />
        </Box>
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginVertical: 20,
          }}
        >
          <Text>Por Género</Text>
          <Switch
            value={searchByTitle}
            onValueChange={() => setSearchByTitle((prev) => !prev)}
          />
          <Text>Por Título</Text>
        </Box>
      </Box>
    ),
    [handleSearch, searchByTitle]
  );

  return (
    <ThemedView style={{ paddingBottom: insets.bottom, flex: 1 }}>
      <FlatList
        data={searchResults || []}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
        }}
        columnWrapperStyle={{
          justifyContent: "space-around",
          paddingHorizontal: 16,
          gap: 16,
        }}
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
        ListEmptyComponent={renderEmptySearch}
      />
    </ThemedView>
  );
}
