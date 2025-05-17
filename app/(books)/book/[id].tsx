import React from "react";
import { Bookmark } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";

const TEST_BOOK = {
  id: "1",
  title: "Harry Potter y la Piedra Filosofal",
  author: "J.K. Rowling",
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
  imageUrl:
    "https://silverlibros.com/wp-content/uploads/2022/02/9788498382662-HARRY-POTTER-1-Y-LA-PIEDRA-FILOSOFAL-PORTADA-2010.jpg",
};

export default function BookScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  return (
    <ThemedView
      style={{ paddingBottom: insets.bottom, flex: 1 }}
      className="h-screen"
    >
      <ScrollView>
        <Box className="grid grid-rows-2">
          <Box className="pb-6 flex flex-col">
            <Button className="w-max bg-[#36A875] self-end my-6 mx-8">
              <ButtonText>Crear grupo</ButtonText>
            </Button>
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
          <Box className="bg-[#EFE5DB] border-t border-[#9A7B62]">
            <Button className="bg-white self-end mt-6 mr-8 rounded-full p-1 w-14 h-14">
              <Bookmark color="#9A7B62" />
            </Button>

            <Box className="px-8 py-6 flex flex-col gap-4 h-full">
              <Box className="flex flex-col gap-2">
                <Text className="font-bold text-lg text-[#9A7B62]">Autor</Text>
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
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </ThemedView>
  );
}
