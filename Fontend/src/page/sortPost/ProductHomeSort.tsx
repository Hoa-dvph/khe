import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IPostSort, Post } from "@/types/post";
import { sortHome } from "@/service/post";
import ProductPageSort from "./ProductPageSort";
import { useForm } from "react-hook-form";
import SortTopic from "./SortTopic";
import clsx from "clsx";
import { GrPowerReset } from "react-icons/gr";
const ProductHomeSort = () => {
  const [dataPost, setDataPost] = useState<Post[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const { register, handleSubmit } = useForm();
  console.log(paramsObject);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await sortHome(paramsObject);
        console.log(data);
        setDataPost(data.posts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchParams]);
  const onSubmit = (data: any) => {
    searchParams.set("title", data.title);
    setSearchParams(searchParams);
  };
  const resetParams = () => {
    setSearchParams(new URLSearchParams({}));
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueCheck = e.target.value;
    console.log(e.target.value);
    switch (valueCheck) {
      case "createAtNew":
        searchParams.set("sortCreateAt", "createAtNew");
        setSearchParams(searchParams);
        break;
      case "createAtOld":
        searchParams.set("sortCreateAt", "createAtOld");
        setSearchParams(searchParams);
        break;
      case "mostLike":
        searchParams.set("sortLikes", "mostLike");
        setSearchParams(searchParams);
        break;
      case "leastLike":
        searchParams.set("sortLikes", "leastLike");
        setSearchParams(searchParams);
        break;
      default:
        setSearchParams(new URLSearchParams({}));
        break;
    }
  };
  return (
    <div>
      <div className="grid grid-cols-8 gap-12">
        <div className="col-span-5">
          <div className="w-full">
            <form
              action=""
              className="flex items-center border border-gray-300 overflow-hidden rounded-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Search the creative world at work"
                className="py-3 px-7 w-full focus:outline-none rounded-full bg-gray-100 font-semibold placeholder-black "
                {...register("title")}
              />

              <button className="bg-gray-100 p-3 mx-1 hover:bg-gray-200 border-l rounded-full">
                <IoSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="col-span-1 justify-self-end">
          <div className="relative inline-block">
            <select
              className="block appearance-none w-full bg-gray-100 border border-gray-300 hover:border-gray-400 font-semibold cursor-pointer px-4 py-3 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleChangeSelect}
            >
              <option value="createAtNew" className="cursor-pointer">
                Mới nhất
              </option>
              <option value="createAtOld" className="cursor-pointer">
                Cũ nhất
              </option>
              <option value="mostLike" className="cursor-pointer">
                Like nhiều nhất
              </option>
              <option value="leastLike" className="cursor-pointer">
                Like ít nhất
              </option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaSortDown className="fill-current h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="col-span-1 justify-self-end">
          <SortTopic />
        </div>
        <div className="col-span-1 justify-self-end h-full">
          <button
            className="bg-gray-100 p-2 h-full rounded-full border-gray-200 px-4 hover:bg-slate-200 transition-transform flex items-center gap-3"
            onClick={resetParams}
          >
            <GrPowerReset />
            Reset
          </button>
        </div>
      </div>
      {dataPost.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 w-full py-5">
          {dataPost.map((post: Post) => (
            <ProductPageSort key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="h-[50vh] flex justify-center items-center">
          <p className="font-bold text-lg">Không có bài viết nào phù hợp</p>
        </div>
      )}
    </div>
  );
};

export default ProductHomeSort;
