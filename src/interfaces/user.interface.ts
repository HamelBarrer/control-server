export interface User {
  userId?: number;
  username?: string;
  email: string;
}

export interface UserCreate extends User {
  password: string;
  passwordConfirm: string;
}
