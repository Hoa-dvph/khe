import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IPostSort, Post } from "@/types/post";
import { sortHome } from "@/service/post";
import ProductPageSort from "./ProductPageSort";
const ProductHomeSort = () => {
  const [objectSeatch, setObjectSeatch] = useState<IPostSort>(() => {
    return {
      title: "",
      sortCreateAt: "",
      sortLikes: "",
    };
  });
  const [dataPost, setDataPost] = useState<Post[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await sortHome(objectSeatch);
        console.log(data);
        setDataPost(data.posts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [objectSeatch]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-8 px-4">
        <div className="col-span-4">
          <div className="flex items-center border border-gray-300 overflow-hidden rounded-full">
            <input
              type="text"
              placeholder="Search the creative world at work"
              className="py-3 px-4 w-full focus:outline-none rounded-full"
            />

            <button className="bg-gray-100 p-3 mx-1 hover:bg-gray-200 border-l rounded-full">
              <IoSearch />
            </button>
          </div>
        </div>
        <div className="col-span-1 justify-self-end">
          <div className="relative inline-block w-64">
            <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-3 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Mặc định</option>
              <option value="a">Mới nhất</option>
              <option value="a">Cũ nhất</option>
              <option value="a">Like nhiều nhất</option>
              <option value="a">Like ít nhất</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaSortDown className="fill-current h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 w-full py-5">
        {dataPost.map((post: Post) => (
          <ProductPageSort key={post._id} post={post} />
        ))}
      </div>
      <div className="relative group">
        <span className="hover:text-blue-500 cursor-pointer">Hover vào đây</span>
        <div className="absolute left-0 mt-2 w-48 p-4 bg-gray-200 border border-gray-400 rounded hidden group-hover:block group-focus-within:block">
          Đây là nội dung của menu
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductHomeSort;
