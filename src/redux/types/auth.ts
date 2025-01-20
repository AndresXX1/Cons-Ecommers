import { UserProps } from "../../utils/interface";

export interface IAuthState {
  authenticated: boolean;
  loading: boolean;
  user: UserProps | null;
}

export interface IErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
