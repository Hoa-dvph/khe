import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebook,
  FaInstagram,
  FaSave,
  FaTwitter,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import Comment from "./Comment";
import DetailPost from "./DetailPost";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import DialogCopy from "./DialogCopy";
import { CiSaveDown2 } from "react-icons/ci";
import { getByidPost, likePost } from "@/service/post";
import { Post } from "@/types/post";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getByidPost(id as string);
        setPost(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {})();
  }, []);

  const handleLike = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn chưa đăng nhập");
      return;
    }

    try {
      const data = await likePost(id, token);
      console.log("Like post thành công:", data);
    } catch (error) {
      console.error("Lỗi khi like post:", error);
    }
  };
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="px-[100px] relative mt-20 mb-4">
      <div className="flex flex-col">
        <div className="flex gap-3">
          <img
            src={post?.author?.avatar}
            alt=""
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <h2 className="text-base font-medium">{post?.author?.email}</h2>
            <p className="text-gray-600 hover:text-blue-400">Flow</p>
          </div>
        </div>
        <div className="relative group pt-5">
          <img
            src={post?.images[0] || "https://picsum.photos/200"}
            alt=""
            className="cursor-pointer w-full h-[500px] object-cover"
          />
          <div className="absolute top-9 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
            <FaSave />
            <span>Save</span>
          </div>
        </div>
        <div className="bg-[#000622] px-52 py-24 flex flex-col gap-4">
          <h2 className="text-white text-2xl font-medium">Description</h2>

          <p className="text-gray-300 text-sm tracking-widest">
            {post?.content}
          </p>
          <p className="text-gray-300 text-sm tracking-widest">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet enim vel ipsum tincidunt bibendum. Donec non egestas neque, vel
            congue turpis. Nullam vitae turpis vel justo tincidunt consectetur.
            Nulla facilisi. Vestibulum vel neque vel ipsum tincidunt
            consectetur. Sed sit amet enim vel ipsum tincidunt bibendum. Donec
            non egestas neque, vel congue turpis. Nullam vitae turpis vel justo
            tincidunt consectetur. Nulla facilisi. Vestibulum vel neque vel
            ipsum tincidunt consectetur. Sed sit amet enim vel ipsum tincidunt
            bibendum. Donec non egestas neque, vel congue turpis. Nullam vitae
            turpis vel justo tincidunt consectetur. Nulla facilisi. Vestibulum
            vel neque vel ipsum tincidunt consectetur. Sed sit amet enim vel
            ipsum tincidunt
          </p>
        </div>
        <div className="relative group">
          <img
            src={post?.images[1] || "https://picsum.photos/200"}
            alt=""
            className="cursor-pointer w-full h-[500px] object-cover"
          />
          <div className="absolute top-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
            <FaSave />
            <span>Save</span>
          </div>
        </div>
        <div className="flex gap-4 w-full bg-[#e3e3e3] py-20 px-5 ">
          <div className="relative group w-1/3">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="cursor-pointer w-full h-[350px] object-cover rounded-lg"
            />
            <div className="absolute top-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
              <FaSave />
              <span>Save</span>
            </div>
          </div>
          <div className="relative group w-1/3">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="cursor-pointer w-full h-[350px] object-cover rounded-lg"
            />
            <div className="absolute top-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
              <FaSave />
              <span>Save</span>
            </div>
          </div>
          <div className="relative group w-1/3">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="cursor-pointer w-full h-[350px] object-cover rounded-lg"
            />
            <div className="absolute top-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
              <FaSave />
              <span>Save</span>
            </div>
          </div>
        </div>
        <div className="relative group">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="cursor-pointer w-full h-[500px] object-cover"
          />
          <div className="absolute top-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
            <FaSave />
            <span>Save</span>
          </div>
        </div>
        <div className="bg-[#191919] px-20 py-16 w-full">
          <div className="flex gap-3 pb-3">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-white">
                {post?.author.email}
              </h2>
              <p className="text-gray-600 hover:text-blue-400">Flow</p>
            </div>
          </div>
          <div className="w-full relative">
            <Swiper
              modules={[Navigation]}
              loop
              spaceBetween={20}
              slidesPerView={4}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".btn-next",
                prevEl: ".btn-prev",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                0: {
                  slidesPerView: 1.5,
                  spaceBetween: 50,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="w-full">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={`btn-next absolute z-20 top-[39%] -right-6 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 bg-white hover:text-white hover:bg-[#585858] duration-300`}
            >
              <FaAngleRight />
            </button>
            <button
              className={`btn-prev absolute z-20 top-[39%] -left-6 text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 bg-white hover:text-white hover:bg-[#585858] duration-300`}
            >
              <FaAngleLeft />
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-6 px-[50px] py-[50px] border border-gray-200 gap-12">
          <Comment />
          <DetailPost />
        </div>
      </div>
      <div className="fixed top-[60%] right-2 transform -translate-y-1/2 flex flex-col items-center space-y-4 gap-7  p-2 ">
        {/* Các icon */}
        <Link to={`/`} className="flex flex-col items-center">
          <img
            src={post?.author?.avatar}
            alt=""
            className="p-2 rounded-full w-[60px] h-[60px]"
          />
          <h2 className="text-sm font-medium">Flow</h2>
        </Link>
        <Tooltip
          title="Letter"
          placement="left-start"
          className="cursor-pointer"
        >
          <Link to={`/`} className="flex flex-col items-center">
            <div className="bg-white text-black p-2 rounded-full border border-gray-200">
              <MdOutlineMail className="" size={25} />
            </div>
            <h2 className="text-sm font-medium">Hire</h2>
          </Link>
        </Tooltip>
        <Tooltip
          title="Share"
          placement="left-start"
          onClick={handleClickOpen}
          className="cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="bg-white text-black p-2 rounded-full border border-gray-200">
              <IoShareOutline className="" size={25} />
            </div>
            <h2 className="text-sm font-medium">Share</h2>
          </div>
        </Tooltip>
        <Tooltip title="Save" placement="left-start" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-white text-black p-2 rounded-full border border-gray-200">
              <CiSaveDown2 className="" size={25} />
            </div>
            <h2 className="text-sm font-medium">Save</h2>
          </div>
        </Tooltip>
        <div
          className="flex flex-col items-center"
          onClick={() => handleLike(id as string)}
        >
          <div className="bg-blue-400 text-white p-2 rounded-full border border-gray-200">
            <AiFillLike className="" size={25} />
          </div>
          <h2 className="text-sm font-medium">Like</h2>
        </div>
      </div>
      {open && <DialogCopy open={open} handleClose={handleClose} />}
    </div>
  );
};

export default ProductDetailPage;
