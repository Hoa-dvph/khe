import React from "react";
import CheckLogin from "@/components/client/CheckLogin";
import ProductPage from "@/components/client/ProductPage";
import Banner from "@/components/client/Banner";
import ProductHomeSort from "@/page/sortPost/ProductHomeSort";
import BannerV2 from "@/components/client/BannerV2";
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Banner />
      <div className="flex-grow">
        <ProductPage />
      </div> */}
      <div className="w-full pt-7">
        <BannerV2 />
      </div>
      <div className="pt-[20px] px-7">
        <ProductHomeSort />
      </div>
      <CheckLogin />
    </div>
  );
};

export default HomePage;
