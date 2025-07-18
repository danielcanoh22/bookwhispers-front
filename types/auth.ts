export type UserLoginData = {
  id: string;
  username: string;
  email: string;
  bio: string;
  favorite_genres: string[] | [];
  profile_picture: string;
};

export type AuthLoginResponse = {
  token: string;
  user: UserLoginData;
};
