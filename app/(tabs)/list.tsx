import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import { Heading } from "@/components/ui/heading";
import { FlatList, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Book } from "@/components/common/book";
import { Link } from "expo-router";

const MOCK_FAVORITES = [
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
];

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
          data={MOCK_FAVORITES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box key={item.id}>
              <Link
                href={{
                  pathname: "/(books)/book/[id]",
                  params: { id: item.id },
                }}
                asChild
              >
                <TouchableOpacity>
                  <Book
                    title={item.title}
                    coverUrl={item.imageUrl}
                    bookColor="#25a2c4"
                  />
                </TouchableOpacity>
              </Link>
            </Box>
          )}
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
