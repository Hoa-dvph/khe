import React from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
const DetailPost = () => {
  return (
    <div className="col-span-2 flex flex-col gap-10">
      <div className="border border-gray-200 p-7 flex flex-col gap-4">
        <p className="font-medium text-gray-300 text-xs">OWNER</p>
        <div className="flex gap-3">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold">Vân Hương</h2>
            <p className="text-sm text-gray-500 font-medium ">
              Thach That Ha Noi
            </p>
          </div>
        </div>
        <button className="w-full rounded-full p-2 px-5 bg-blue-600 text-white">
          <div className="flex justify-center items-center gap-1">
            <GoPlusCircle size={20} />
            <p>Follow</p>
          </div>
        </button>
        <button className="w-full rounded-full p-2 px-5 bg-white text-blue-400 border border-gray-200 hover:border-blue-200 hover:bg-blue-200 duration-200">
          <div className="flex justify-center items-center gap-1 ">
            <MdOutlineMail size={20} />
            <p>Follow</p>
          </div>
        </button>
      </div>
      <div className="border border-gray-200 p-7 flex flex-col gap-4">
        <h2 className="font-medium">Mi Nomina: Payroll Management</h2>
        <p className="text-sm">
          The Mi Nomina design project embodies an unwavering quest for
          simplicity and efficiency in payroll management for businesses. Our
          distinctive bra
        </p>
        <div className="flex items-center gap-1">
          <p className="text-sm">20</p>
          <AiFillLike />
          <p className="text-sm">20</p>
          <FaMessage />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
