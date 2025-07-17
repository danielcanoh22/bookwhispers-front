type UserLoginData = {
  id: string;
  username: string;
  email: string;
};

export type AuthLoginResponse = {
  token: string;
  user: UserLoginData;
};
