import ProductDetailPage from "@/pages/client/product-detail/ProductDetailPage";
import React from "react";

import { BiSolidLike } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductPage = () => {
  return (
    <div className="relative group mb-2"> 
      <img
        src="https://picsum.photos/200"
        alt=""
        className="rounded-sm cursor-pointer w-full h-[250px] object-cover transition duration-300 ease-in-out group-hover:brightness-50 mb-4" // Thêm margin-bottom cho ảnh
      />
      <div className="absolute top-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
        <FaSave />
        <span>Save</span>
      </div>

      <div className="flex justify-between mt-0"> 
        <div className="flex flex-col pt-0">
          <h2 className="text-lg font-medium cursor-pointer">
            <Link to={`/product/1`}>Product 1</Link>
          </h2>
          <p className="text-xs cursor-pointer">Description of Product 1</p>
        </div>
        <div className="flex gap-3 mt-2"> 
          <div className="flex items-center gap-2">
            <BiSolidLike size={15} className="text-gray-500" />
            <span className="text-sm text-gray-500 font-medium">100</span>
          </div>
          <div className="flex items-center gap-2">
            <IoEyeOutline size={15} className="text-gray-500" />
            <span className="text-sm text-gray-500 font-medium">100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
