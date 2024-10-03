import { FaAngleLeft, FaAngleRight, FaFacebook, FaInstagram, FaSave, FaTwitter } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { IoShareOutline } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
const ProductDetailPage = () => {
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ];
  return (
    <div className="px-[100px] relative mt-20 mb-4">
      <div className="flex flex-col">
        <div className="flex gap-3">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col">
            <h2 className="text-base font-medium">Riot client</h2>
            <p className="text-gray-600 hover:text-blue-400">Flow</p>
          </div>
        </div>
        <div className="relative group pt-5">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="cursor-pointer w-full h-[500px] object-cover"
          />
          <div className="absolute top-9 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex bg-[#383838] p-1 items-center gap-1 px-2 cursor-pointer">
            <FaSave />
            <span>Save</span>
          </div>
        </div>
        <div className="bg-[#000622] px-52 py-24">
          <h2 className="text-white text-2xl font-medium">Description</h2>
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
            src="https://picsum.photos/200"
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
              <h2 className="text-base font-medium text-white">Riot client</h2>
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
      </div>
      <div className="fixed top-[60%] right-2 transform -translate-y-1/2 flex flex-col items-center space-y-4 gap-7  p-2 ">
        {/* Các icon */}
        <Link to={`/`} className="flex flex-col items-center">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="p-2 rounded-full w-[60px] h-[60px]"
          />
          <h2 className="text-sm font-medium">Flow</h2>
        </Link>
        <Link to={`/`} className="flex flex-col items-center">
          <div className="bg-black text-white p-2 rounded-full">
            <MdOutlineMail className="" size={25} />
          </div>
          <h2 className="text-sm font-medium">Hire</h2>
        </Link>
        <Link to={`/`} className="flex flex-col items-center">
          <div className="bg-black text-white p-2 rounded-full">
            <IoShareOutline className="" size={25} />
          </div>
          <h2 className="text-sm font-medium">Share</h2>
        </Link>
        <Link to={`/`} className="flex flex-col items-center">
          <div className="bg-black text-white p-2 rounded-full">
            <FaSave className="" size={25} />
          </div>
          <h2 className="text-sm font-medium">Save</h2>
        </Link>
        <Link to={`/`} className="flex flex-col items-center">
          <div className="bg-black text-white p-2 rounded-full">
            <AiFillLike className="" size={25} />
          </div>
          <h2 className="text-sm font-medium">Like</h2>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
