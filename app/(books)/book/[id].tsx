import React, { useEffect, useMemo, useRef } from "react";
import { Star, MessageCircle, Heart } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavoriteBook,
  getUserFavorites,
  removeFavoriteBook,
} from "@/services/favorites";
import { Book } from "@/types/global";
import { ReviewForm } from "@/components/reviews/review-form";

export default function BookScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, bookData } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;

  const book: Book | undefined = useMemo(() => {
    if (typeof bookData === "string") {
      try {
        return JSON.parse(bookData);
      } catch (e) {
        console.error("Error al parsear los datos del libro:", e);
        return null;
      }
    }
    return null;
  }, [bookData]);

  useEffect(() => {
    if (book === null) {
      router.replace("/(tabs)");
    }
  }, [book, router]);

  if (!book) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const { data: favoriteBooks, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getUserFavorites,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: addFavoriteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      Alert.alert("Favoritos", "El libro se agregó a favoritos correctamente");
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavoriteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      Alert.alert(
        "Favoritos",
        "El libro se eliminó de favoritos correctamente"
      );
    },
  });

  const isFavorited = useMemo(() => {
    if (!favoriteBooks) return false;
    return favoriteBooks.some((favBook) => favBook?.book_id === book.id);
  }, [favoriteBooks, book.id]);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFavoriteMutation.mutate(book.id);
    } else {
      const bookToAdd = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        description: book.description,
        coverUrl: book.coverUrl,
      };

      addFavoriteMutation.mutate(bookToAdd);
    }
  };

  const handleReviewFormFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <ThemedView
      style={{ paddingBottom: insets.bottom, flex: 1 }}
      className="h-screen"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Box className="grid grid-rows-2">
            <Box className="pb-6 flex flex-col">
              <Box className="flex flex-col items-center gap-6 mt-6">
                <Heading size="xl" className="text-[#9A7B62]">
                  {book.title}
                </Heading>
                <Box className="w-52 h-72 shadow-md">
                  <Image
                    size="full"
                    source={{
                      uri: book.coverUrl,
                    }}
                    alt={`Portada del libro ${book.title}`}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="bg-[#EFE5DB] border-t border-[#9A7B62] p-6">
              <Box className="flex flex-row justify-end mb-4">
                <Button
                  className="bg-white rounded-full p-1 w-14 h-14"
                  onPress={handleToggleFavorite}
                  isDisabled={
                    isLoadingFavorites ||
                    addFavoriteMutation.isLoading ||
                    removeFavoriteMutation.isLoading
                  }
                >
                  <Heart
                    color="#9A7B62"
                    fill={isFavorited ? "#9A7B62" : "transparent"}
                  />
                </Button>
              </Box>

              <Box className="py-6 flex flex-col gap-4 h-full">
                <Box className="flex flex-col gap-2">
                  <Text className="font-bold text-lg text-[#9A7B62]">
                    Autor
                  </Text>
                  <Text className="text-lg text-[#9A7B62]">
                    {book.authors?.join(", ")}
                  </Text>
                </Box>
                <Box className="flex flex-col gap-2">
                  <Text className="font-bold text-lg text-[#9A7B62]">
                    Descripción
                  </Text>
                  <Text className="text-lg text-[#9A7B62]">
                    {book.description}
                  </Text>
                </Box>

                <Divider className="bg-[#dbcec1] my-4 h-1" />
                <Box className="flex flex-row items-center gap-2">
                  <MessageCircle color="#9A7B62" />
                  <Text className="font-bold text-lg text-[#9A7B62]">
                    Deja tu opinión acerca de este libro
                  </Text>
                </Box>
                <Link
                  href={{
                    pathname: "/(books)/reviews/[id]",
                    params: { id: book.id },
                  }}
                  className="text-right"
                >
                  <Box className="flex flex-row items-center gap-2">
                    <Text className="text-lg my-2 text-[#36A875]">
                      Ver todas las reseñas
                    </Text>
                    <Star className="ml-4" color="#E1B919" />
                  </Box>
                </Link>

                <ReviewForm bookId={book.id} onFocus={handleReviewFormFocus} />
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
