export type Book = {
  id: string;
  title: string;
  imageUrl: string;
};

export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};
