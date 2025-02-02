export interface User {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  gender?: string;
  role?: string;
  dob?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LinkPreview {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string[];
  ogUrl?: string;
  _id?: string;
}
export interface PostRequest {
  title: string;
  description?: string;
  photo?: string;
  linkPreview?: LinkPreview[];
  owner?: string;
  readingTime?: string;
  isPublished?: string;
  _id?: string;
  createdAt: string;
  updatedAt: string;
}

export interface newPostRequest {
  formData: FormData;
}
