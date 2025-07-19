import { Book } from "@/components/common/book";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { ProfileBooksSection } from "../books-section";

const RECENT_BOOKS = [
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

const POPULAR_BOOKS = [
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

export const ProfileBooks = () => {
  return (
    <Box className="mt-6">
      <ProfileBooksSection title="Recientes" books={RECENT_BOOKS} />
      <ProfileBooksSection title="Populares" books={POPULAR_BOOKS} />
    </Box>
  );
};
