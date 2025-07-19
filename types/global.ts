export type Book = {
  id: string;
  book_id?: string;
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
  profile_picture: string;
};

export type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

export type Review = {
  id: string;
  text: string;
  created_at: string;
  user: {
    username: string;
    profile_picture: string;
  };
};
