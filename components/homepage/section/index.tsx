import { Heading } from "@/components/ui/heading";
import React from "react";
import { TouchableOpacity, View } from "react-native";
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
            className="bg-white py-2 px-4 rounded-full text-[#9A7B62]"
          >
            Ver más
          </Link>
          {/* <SliderControls /> */}
        </View>
      </View>
      {/* #002e48 #604300 #25a2c4 */}

      <View className="flex flex-row flex-wrap justify-between mt-4">
        {books.map((book) => (
          <View key={book.id}>
            <Link
              href={{
                pathname: "/(books)/book/[id]",
                params: { id: book.id },
              }}
              asChild
            >
              <TouchableOpacity>
                <Book
                  title={book.title}
                  coverUrl={book.imageUrl}
                  bookColor="#25a2c4"
                />
              </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
};
