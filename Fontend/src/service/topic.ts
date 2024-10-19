import { instance } from "@/configs/instance.ts";

export const getAllTopic = () => instance.get(`/topic`);
