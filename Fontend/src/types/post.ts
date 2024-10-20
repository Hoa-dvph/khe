export interface IPostSort {
  title?: string;
  sortCreateAt?: string;
  sortLikes?: string;
}

export interface Author {
  _id: string;
  email: string;
  // password: string;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  tags: string[];
  status: string;
  images: string[];
  like_count: number;
  like: string[];
  topic: string;
  createdAt: string;
  updatedAt: string;
}

export type IComment = {
  _id: string;
  author: Author;
  createdAt: string;
  message: string;
  post: string;
  updatedAt: string;
};
