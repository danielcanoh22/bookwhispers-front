import React, { useRef } from "react";
import { Star, MessageCircle, Heart } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Link, useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

const TEST_BOOK = {
  id: "1",
  title: "Harry Potter y la Piedra Filosofal",
  author: "J.K. Rowling",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
  imageUrl:
    "https://silverlibros.com/wp-content/uploads/2022/02/9788498382662-HARRY-POTTER-1-Y-LA-PIEDRA-FILOSOFAL-PORTADA-2010.jpg",
};

export default function BookScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  console.log(id);

  const scrollViewRef = useRef<ScrollView>(null);
  const headerHeight = 80;

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
                  {TEST_BOOK.title}
                </Heading>
                <Box className="w-52 h-72 shadow-md">
                  <Image
                    size="full"
                    source={{
                      uri: TEST_BOOK.imageUrl,
                    }}
                    alt={`Portada del libro ${TEST_BOOK.title}`}
                  />
                </Box>
              </Box>
            </Box>
            <Box className="bg-[#EFE5DB] border-t border-[#9A7B62] p-6">
              <Box className="flex flex-row justify-end mb-4">
                <Button className="bg-white rounded-full p-1 w-14 h-14">
                  <Heart color="#9A7B62" />
                </Button>
              </Box>

              <Box className="py-6 flex flex-col gap-4 h-full">
                <Box className="flex flex-col gap-2">
                  <Text className="font-bold text-lg text-[#9A7B62]">
                    Autor
                  </Text>
                  <Text className="text-lg text-[#9A7B62]">
                    {TEST_BOOK.author}
                  </Text>
                </Box>
                <Box className="flex flex-col gap-2">
                  <Text className="font-bold text-lg text-[#9A7B62]">
                    Descripción
                  </Text>
                  <Text className="text-lg text-[#9A7B62]">
                    {TEST_BOOK.description}
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
                    params: { id: String(id) },
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
                <Box className="flex flex-col gap-2">
                  <Textarea
                    size="md"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                    className="w-full bg-white"
                  >
                    <TextareaInput
                      placeholder="Escribe tu reseña..."
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollToEnd({
                            animated: true,
                          });
                        }, 100);
                      }}
                    />
                  </Textarea>
                  <Button className="bg-[#36A875] self-end px-8">
                    <ButtonText>Enviar</ButtonText>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
