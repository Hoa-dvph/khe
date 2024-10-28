import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import ListComment from "./ListComment";
import { useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getCommentByid } from "@/service/comment";
import { IComment } from "@/types/post";
import { addComment } from "@/service/comment";
import { Link, useNavigate } from "react-router-dom";
interface Props {
  userObject: any;
  id: string | undefined;
}
const Comment = ({ userObject, id }: Props) => {
  const [comment, setComment] = useState<IComment[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCommentByid(id as string);
        console.log(data);
        setComment(data.comments);
      } catch (error) {
        console.error("Error fetching comment", error);
      }
    })();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    console.log(data);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn chưa đăng nhập");
      navigate(`/login`);
      return;
    }
    try {
      const dataValue = await addComment(id as string, data?.comment, token);
      setComment([...comment, dataValue.data.data]);
      console.log(dataValue);
      reset();
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  console.log(userObject);
  return (
    <div className="col-span-4 border border-gray-200">
      <div className="flex flex-col gap-3 p-7 border-b border-gray-200">
        {userObject === null ? (
          <div className="flex flex-col gap-3 p-7 border-b border-gray-200">
            <h3 className="font-bold text-2xl">
              Sign up to join the conversation
            </h3>
            <p>
              Add your feedback for Paulo Henrique Tirabassi’s project by
              signing in or signing up.
            </p>
            <div className="flex items-center gap-4">
              <Link to={`/login`}>
                <button className="rounded-full p-2 px-5 bg-blue-600 text-white">
                  Sign Up with Email
                </button>
              </Link>
              <p>or</p>
              <div className="cursor-pointer">
                <FaFacebook size={27} className="text-blue-500" />
              </div>
              <div className="cursor-pointer">
                <FaGoogle size={27} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-5 px-9">
            <h2 className="font-semibold text-xl">Hãy gửi bình luận</h2>
            <div className="flex gap-2 w-full">
              <img
                src={userObject?.avatar}
                alt=""
                className="w-9 h-9 rounded-full"
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 w-full"
              >
                <div className="relative flex-grow w-full">
                  <input
                    {...register("comment", { required: true })}
                    placeholder="First name"
                    className="w-full border border-gray-200 px-3 py-1 rounded-lg pr-16"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2  py-1 px-3 text-gray-200"
                  >
                    <IoSend />
                  </button>
                </div>
                {errors.comment && (
                  <span className="text-red-500">Hãy nhập bình luận</span>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
      <ListComment comment={comment} />
    </div>
  );
};

export default Comment;
