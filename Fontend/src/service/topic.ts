import { instance } from "@/configs/instance.ts";

export const getAllTopic = () => instance.get(`/topic`);

export const postTopic = (name: string, token: string) =>
  instance.post(
    `/topic`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const putTopic = (id: string, name: string, token: string) =>
  instance.put(
    `/topic/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getByidTopic = (id: string, token: string) =>
  instance.get(`/topic/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
