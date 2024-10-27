import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postTopic } from "@/service/topic";
const AddTopic = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn chưa đăng nhập");
      navigate(`/login`);
      return;
    }
    try {
      await postTopic(data?.name, token);
      alert("Thêm mới thành công");
      navigate(`/admin/topic`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/admin/topic")}
          className="my-6 flex py-3 items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          <p>Trở về</p>
        </button>
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-10 px-8">
            <h1 className="text-4xl font-extrabold text-white text-center">
              Thêm mới Topic
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Tên là bắt buộc" })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.name?.message && (
                <p className="text-red-500">{String(errors.name.message)}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
              >
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTopic;
