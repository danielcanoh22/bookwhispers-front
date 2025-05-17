import React, { useState, useEffect, useRef } from "react";
import { FlatList, Image, TextInput, Text, View } from "react-native";
import { SearchBar } from "@/components/search/SearchBar";
import { searchBooks } from "@/services/search/api/books";

export default function SearchScreen() {
  const [books, setBooks] = useState<any[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const results = await searchBooks(query, controller.signal);
      setBooks(results);
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error("Error al buscar libros:", err);
    }
  };

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 32 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View className="w-[48%] bg-gray-100 rounded-xl p-2 mb-4 items-center">
            <Image
              source={{ uri: item.coverUrl }}
              style={{ width: 100, height: 150, borderRadius: 8 }}
              resizeMode="cover"
            />
            <Text className="text-sm font-semibold mt-2 text-center">
              {item.title}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-10">
            No se encontraron resultados.
          </Text>
        }
      />
    </View>
  );
}
