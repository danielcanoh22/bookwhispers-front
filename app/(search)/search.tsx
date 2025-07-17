import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Image,
  TextInput,
  Text,
  View,
  ScrollView,
} from "react-native";

import { searchBooks } from "@/services/books";
import { SearchBar } from "@/components/search/search-bar";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GridBooks } from "@/components/common/grid-books";
import { Box } from "@/components/ui/box";

const BOOKS = [
  {
    id: "1",
    title: "Harry Potter y la piedra filosofal",
    imageUrl:
      "https://silverlibros.com/wp-content/uploads/2022/02/9788498382662-HARRY-POTTER-1-Y-LA-PIEDRA-FILOSOFAL-PORTADA-2010.jpg",
  },
  {
    id: "2",
    title: "El Bosque Negro",
    imageUrl:
      "https://i.pinimg.com/originals/ab/ec/d5/abecd51b79366c089872d1e88e6c7424.jpg",
  },
  {
    id: "3",
    title: "El Zorro en el Bosque",
    imageUrl:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
  {
    id: "4",
    title: "Pasaje al Misterio",
    imageUrl:
      "https://i.pinimg.com/originals/6b/14/c8/6b14c8c4d0eabc88bdfb0b27a6eacf49.jpg",
  },
  {
    id: "5",
    title: "El Instituto",
    imageUrl:
      "https://th.bing.com/th/id/R.e6844511509c80973e2604658207a5d9?rik=uSLIhbbJKDHaHg&pid=ImgRaw&r=0",
  },
  {
    id: "6",
    title: "Pesadilla en el Hospital General",
    imageUrl:
      "https://i.pinimg.com/736x/fc/f3/10/fcf310f53ad727b77d9c8d790f60f8ae.jpg",
  },
  {
    id: "7",
    title: "Viaje al Centro de la Tierra",
    imageUrl: "https://i.blogs.es/211e7f/81tj3-swl7l/450_1000.jpg",
  },
  {
    id: "8",
    title: "El Último Pirata",
    imageUrl:
      "https://th.bing.com/th/id/OIP.ZbyigXGlQqdIv3WLLGF0NgHaLR?rs=1&pid=ImgDetMain",
  },
  {
    id: "9",
    title: "Alicia en el País de las Maravillas",
    imageUrl: "https://i.blogs.es/f5837f/81wnawk5erl/1024_2000.jpg",
  },
  {
    id: "10",
    title: "Harry Potter y la piedra filosofal",
    imageUrl:
      "https://silverlibros.com/wp-content/uploads/2022/02/9788498382662-HARRY-POTTER-1-Y-LA-PIEDRA-FILOSOFAL-PORTADA-2010.jpg",
  },
  {
    id: "11",
    title: "El Bosque Negro",
    imageUrl:
      "https://i.pinimg.com/originals/ab/ec/d5/abecd51b79366c089872d1e88e6c7424.jpg",
  },
  {
    id: "12",
    title: "El Zorro en el Bosque",
    imageUrl:
      "https://marketplace.canva.com/EAFGf9027eM/1/0/1003w/canva-portada-libro-infantil-bosque-ilustrado-azul-P3McSjgOm1I.jpg",
  },
  {
    id: "13",
    title: "Pasaje al Misterio",
    imageUrl:
      "https://i.pinimg.com/originals/6b/14/c8/6b14c8c4d0eabc88bdfb0b27a6eacf49.jpg",
  },
  {
    id: "14",
    title: "El Instituto",
    imageUrl:
      "https://th.bing.com/th/id/R.e6844511509c80973e2604658207a5d9?rik=uSLIhbbJKDHaHg&pid=ImgRaw&r=0",
  },
  {
    id: "15",
    title: "Pesadilla en el Hospital General",
    imageUrl:
      "https://i.pinimg.com/736x/fc/f3/10/fcf310f53ad727b77d9c8d790f60f8ae.jpg",
  },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

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
    <ThemedView
      style={{ paddingBottom: insets.bottom, flex: 1 }}
      className="h-screen"
    >
      <ScrollView>
        <View className="bg-[#EFE5DB] px-4 py-8">
          <SearchBar onSearch={handleSearch} />

          {/* 
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
        /> */}
        </View>
        <Box className="pt-4 p-4">
          <GridBooks books={BOOKS} />
        </Box>
      </ScrollView>
    </ThemedView>
  );
}
