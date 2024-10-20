import { instance } from "@/configs/instance.ts";
import { IPostSort } from "@/types/post";
export const sortHome = (obj: IPostSort) =>
  instance.post(`/posts/sortPorts`, obj);

export const likePost = (id: string, token: string) => {
  const data = instance.post(
    `/like/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getByidPost = (id: string) => {
  return instance.get(`/posts/${id}`);
};
