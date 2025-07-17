export type Book = {
  id: string;
  title: string;
  imageUrl: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
  favorite_genres?: string[];
};
