import { Heading } from "@/components/ui/heading";
import React from "react";
import { View } from "react-native";
import { SliderControls } from "../controls";
import { Link } from "expo-router";
import { Book } from "@/components/common/book";

type Book = {
  id: string;
  title: string;
  imageUrl: string;
};

type HomeSectionProps = {
  title: string;
  books: Book[];
};

export const HomeSection = ({ title, books }: HomeSectionProps) => {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Heading size="xl" className="text-[#9A7B62] text-lg font-semibold">
          {title}
        </Heading>
        <View className="flex-row items-center gap-4">
          <Link
            href={".."}
            className="bg-white py-1 px-2 rounded-full text-[#9A7B62]"
          >
            Ver más
          </Link>
          <SliderControls />
        </View>
      </View>
      {/* #002e48 #604300 #25a2c4 */}
      <View className="flex flex-row flex-wrap justify-between mt-4">
        {books.map((book) => (
          // <Link
          //   key={book.id}
          //   href={`/book/${book.id}`}
          // >
          <Book
            key={book.id}
            title={book.title}
            coverUrl={book.imageUrl}
            bookColor="#25a2c4"
          />
          // </Link>
        ))}
      </View>
    </View>
  );
};
