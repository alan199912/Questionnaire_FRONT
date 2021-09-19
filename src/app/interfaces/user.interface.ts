export interface ResponseData {
  status: string;
  message: string;
}

export interface LoginUser {
  status: string;
  user: UserData;
  token?: string;
  message?: string;
}

export interface UserData {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface ResponseId {
  status: string;
  id: string;
}
