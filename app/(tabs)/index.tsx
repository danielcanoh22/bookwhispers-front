import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";

import { HomeSection } from "@/components/homepage/section";
import { HomeHeader } from "@/components/homepage/header";
import { ScreenContainer } from "@/components/common/container";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { FloatingActionButton } from "@/components/homepage/floating-button";
import { useRecommendedBooks } from "@/hooks/useRecommendedBooks";
import { Message } from "@/components/common/message";
import { useQueries } from "@tanstack/react-query";
import { searchBooks } from "@/services/search";
import { Text } from "@/components/ui/text";

const icon = require("/assets/images/robot.png");

const genresToFetch = [
  { title: "Misterio", key: "mystery" },
  { title: "Aventura", key: "adventure" },
  { title: "Ciencia Ficción", key: "sci-fi" },
  { title: "Terror", key: "terror" },
  { title: "Historia", key: "history" },
];
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const { recommendedBooks, isLoading, isError, error } = useRecommendedBooks();

  const genreQueries = useQueries({
    queries: genresToFetch.map((genre) => {
      return {
        queryKey: ["books", genre.key],
        queryFn: () => searchBooks({ subject: genre.title }), //
      };
    }),
  });

  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
    >
      <ScrollView>
        <HomeHeader />

        <ScreenContainer>
          <VStack space="4xl">
            {isLoading ? (
              <Message text="Cargando libros recomendados..." />
            ) : (
              <HomeSection
                title="Recomendados"
                category="Recomendados"
                books={recommendedBooks?.slice(0, 3)}
                allBooks={recommendedBooks}
              />
            )}

            {genreQueries.map((queryResult, index) => {
              const genre = genresToFetch[index];

              if (queryResult.isLoading) {
                return <ActivityIndicator key={genre.key} />;
              }

              if (queryResult.isError) {
                return (
                  <Text key={genre.key}>
                    Error al cargar la sección de {genre.title}
                  </Text>
                );
              }

              return (
                <HomeSection
                  key={genre.key}
                  title={genre.title}
                  category={genre.title}
                  books={queryResult.data?.slice(0, 3)}
                />
              );
            })}
          </VStack>
        </ScreenContainer>
      </ScrollView>
      <FloatingActionButton iconSource={icon} href="/chat/ai-chat" />
    </ThemedView>
  );
}
