import { instance } from "@/configs/instance.ts";
import { IPostSort } from "@/types/post";
export const sortHome = (obj: IPostSort) =>
  instance.post(`/posts/sortPorts`, obj);
