import { User } from "../../types";

export interface MessageResponse {
  statusCode: number;
  data: {
    data?: User;
  };
  message: string;
  success: boolean;
}
