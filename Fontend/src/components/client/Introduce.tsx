import React from "react";
import Anh1 from "@/assets/anh2.png"
import Anh2 from "@/assets/anh3.png";
const Introduce = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="w-full py-10 px-32 flex gap-5 items-center justify-center">
        <div className="flex flex-col gap-3 w-[60%]">
          <h5 className="font-medium text-[#a3a3a3]">GIỚI THIỆU</h5>
          <h3 className="text-3xl font-bold text-[#514d4d] tracking-normal pb-3">
            Trang tin tức trực quan & sáng tạo - Đem đến trải nghiệm hiện đại
            cho độc giả!
          </h3>
          <p className="text-sm font-medium text-[#a3a3a3] tracking-[2px] leading-5">
            Chào mừng bạn đến với dự án Website Tin Tức Trực Quan, nơi chúng tôi
            tập trung vào việc xây dựng một nền tảng tin tức hiện đại với trải
            nghiệm người dùng là trọng tâm. Với thiết kế tối giản và tinh tế,
            website này không chỉ làm nổi bật nội dung mà còn đem đến trải
            nghiệm đọc thoải mái, dễ dàng điều hướng. Người dùng có thể tùy
            chỉnh giao diện đọc, sử dụng công cụ tìm kiếm thông minh và tiếp cận
            nhanh với các tin nổi bật ngay từ trang chủ. Dự án này là một phần
            của tầm nhìn nhằm cung cấp thông tin chính xác, nhanh chóng và dễ
            tiếp cận cho độc giả trên mọi thiết bị. Khám phá dự án và trải
            nghiệm một trang tin tức thực sự sáng tạo trên Behance!
          </p>
          <p className="text-sm font-medium text-[#a3a3a3] tracking-[2px]">
            Trang web tin tức của chúng tôi được thiết kế với tiêu chí đơn giản,
            tinh tế và hiện đại, giúp độc giả dễ dàng theo dõi các tin tức quan
            trọng trong cuộc sống. Với giao diện thân thiện và trải nghiệm đọc
            trực quan, chúng tôi không chỉ đem đến nội dung tin tức chất lượng
            mà còn tạo ra môi trường đọc hấp dẫn.
          </p>
        </div>
        <div className="w-[40%]">
          <img src={Anh2} alt="" />
        </div>
      </div>
      <div className="w-full py-10 px-32 flex gap-5 items-center justify-center">
        <div className="w-[40%]">
          <img src={Anh1} alt="" />
        </div>
        <div className="flex flex-col gap-3 w-[60%]">
          <h3 className="text-3xl font-bold text-[#514d4d] tracking-normal pb-3">
            Nền Tảng Tin Tức Hiện Đại - Cập Nhật Nhanh, Trải Nghiệm Mượt Mà
          </h3>
          <p className="text-sm font-medium text-[#a3a3a3] tracking-[2px] leading-5">
            Website của chúng tôi không chỉ chú trọng đến việc cập nhật thông
            tin nhanh chóng mà còn đặt người dùng làm trọng tâm trong trải
            nghiệm. Giao diện được tối ưu hóa với các tùy chọn điều chỉnh font
            chữ và chế độ sáng/tối để người đọc dễ dàng cá nhân hóa trải nghiệm
            của mình. Ngoài ra, công cụ tìm kiếm thông minh và tính năng tin tức
            nổi bật (Breaking News) giúp độc giả không bỏ lỡ những diễn biến
            quan trọng. Tính năng chia sẻ dễ dàng qua mạng xã hội và hệ thống
            phân loại chuyên mục khoa học tạo nên một nền tảng tin tức nơi người
            dùng có thể kết nối và chia sẻ thông tin cùng nhau, tạo ra cộng đồng
            đọc tin tức sôi động và thú vị.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
