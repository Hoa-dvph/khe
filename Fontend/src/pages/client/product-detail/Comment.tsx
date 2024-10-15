import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import ListComment from "./ListComment";
import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
const Comment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="col-span-4 border border-gray-200">
      <div className="flex flex-col gap-3 p-7 border-b border-gray-200">
        <h3 className="font-bold text-2xl">Sign up to join the conversation</h3>
        <p>
          Add your feedback for Paulo Henrique Tirabassi’s project by signing in
          or signing up.
        </p>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 px-5 bg-blue-600 text-white">
            Sign Up with Email
          </button>
          <p>or</p>
          <div className="cursor-pointer">
            <FaFacebook size={27} />
          </div>
          <div className="cursor-pointer">
            <FaGoogle size={27} />
          </div>
        </div>
        <h2 className="font-semibold text-xl">Hãy gửi bình luận</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
          <input
            {...register("comment", { required: true })}
            placeholder="First name"
            className="border border-gray-200 px-3 py-1 rounded-sm"
          />
          {errors.comment && <span>Hãy nhập bình luận</span>}
          <button className="rounded-full py-1 px-5 bg-blue-600 text-white">
            Gửi bình luận
          </button>
        </form>
      </div>
      <ListComment />
    </div>
  );
};

export default Comment;
