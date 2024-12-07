export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female" | "other";
  dob: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
};

export type TPayload = {
  _id: string;
  name: string;
  email: string;
};
