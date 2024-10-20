import { instance } from "@/configs/instance.ts";

export const addComment = (id: string, message: string, token: string) => {
  const data = instance.post(
    `/comment`,
    { post: id, message: message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getCommentByid = (id: string) => {
  return instance.get(`/comment/${id}`);
};

