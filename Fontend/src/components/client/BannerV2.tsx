import { useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import bn1 from "@/assets/bner1.png";
import bn2 from "@/assets/bner2.png";
import bn3 from "@/assets/bner3.png";
import bn4 from "@/assets/bner4.png";
import bn5 from "@/assets/bner5.png";
import bn6 from "@/assets/bner6.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const BannerV2 = () => {
  const images = [bn1, bn2, bn3, bn4, bn5, bn6];
  return (
    <Swiper
      className="w-full lg:h-[560px] h-[360px]"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      effect="slide"
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      // onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => console.log(swiper)}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} className="w-full h-full object-cover" alt="" />
        </SwiperSlide>
      ))}
      <button className="swiper-button-next after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300 ">
        <GrLinkNext size={15} />
      </button>
      <button className="swiper-button-prev after:hidden text-black w-[50px] h-[50px] border flex justify-center items-center rounded-full p-3 hover:text-white hover:bg-[#585858] duration-300">
        <GrLinkPrevious size={15} />
      </button>
    </Swiper>
  );
};

export default BannerV2;
