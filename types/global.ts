export type Book = {
  id: string;
  title: string;
  authors?: string[];
  coverUrl: string;
  description?: string | string[];
};

export type User = {
  username: string;
  email: string;
  password: string;
  favorite_genres?: string[];
};

export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};
