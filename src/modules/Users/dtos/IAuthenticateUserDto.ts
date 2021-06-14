export interface IAuthenticateUserdto {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
