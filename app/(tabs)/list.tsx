import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { FlatList, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Book } from "@/components/common/book";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getUserFavorites } from "@/services/favorites";

const renderEmptyList = () => (
  <Box className="flex-1 justify-center items-center">
    <Text className="text-lg text-stone-500 mt-10">
      Aún no tienes libros favoritos.
    </Text>
    <Text className="text-base text-stone-400">
      ¡Anímate a agregar algunos!
    </Text>
  </Box>
);

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  const { data: favoriteBooks, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getUserFavorites,
  });

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <Box className="p-4 border-b border-stone-200">
        <Heading size="2xl" className="text-center text-[#9A7B62] font-bold">
          Mis Libros Favoritos
        </Heading>
      </Box>
      <Box className="p-6">
        <Text className="text-2xl text-center text-stone-500 mb-4">
          Aquí están los que se ganaron un lugar especial 😃
        </Text>

        <FlatList
          data={favoriteBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const bookForNavigation = {
              id: item.book_id,
              title: item.title,
              authors: item.authors,
              coverUrl: item.coverUrl,
              description: item.description,
            };

            return (
              <Box key={item.id}>
                <Link
                  href={{
                    pathname: "/(books)/book/[id]",
                    params: {
                      id: item.book_id || "",
                      bookData: JSON.stringify(bookForNavigation),
                    },
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
              </Box>
            );
          }}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          ItemSeparatorComponent={() => <Box className="h-6" />}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: insets.bottom + 20,
          }}
          ListEmptyComponent={renderEmptyList}
        />
      </Box>
    </ThemedView>
  );
}
