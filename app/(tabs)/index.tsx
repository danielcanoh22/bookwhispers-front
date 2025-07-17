import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";

import { HomeSection } from "@/components/homepage/section";
import { HomeHeader } from "@/components/homepage/header";
import { ScreenContainer } from "@/components/common/container";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, View } from "react-native";
import { QueryProvider } from "../../providers/QueryProviders";
import { FloatingActionButton } from "@/components/homepage/floating-button";

const RECOMMENDED_BOOKS = [
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
];

const MYSTERY_BOOKS = [
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

const ADVENTURE_BOOKS = [
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
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <QueryProvider>
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
              <HomeSection title="Recomendados" books={RECOMMENDED_BOOKS} />
              <HomeSection title="Misterio" books={MYSTERY_BOOKS} />
              <HomeSection title="Aventura" books={ADVENTURE_BOOKS} />
            </VStack>
          </ScreenContainer>
        </ScrollView>
        <FloatingActionButton />
      </ThemedView>
    </QueryProvider>
  );
}
