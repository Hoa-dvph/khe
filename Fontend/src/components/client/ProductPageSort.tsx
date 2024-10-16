import React from "react";
import { IPostSort, Post } from "@/types/post";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
interface Props {
  post: Post;
}
const ProductPageSort = ({ post }: Props) => {
  return (
    <div>
      <Link to={`/product/${post._id}`} key={post._id}>
        <div className="items mb-6 relative group">
          <div className="items-img bg-gray-200 h-56 rounded-lg overflow-hidden relative">
            <img
              src={post.images[0] || "./assets/images/image.png"}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="items-save bg-white text-gray-800 p-2 rounded-full shadow-md cursor-pointer flex items-center space-x-2 border border-gray-300 hover:bg-gray-100">
                <FaSave className="text-lg" />
                <span className="font-medium">Save</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="items-text">
              <div className="text-lg font-semibold">{post.title}</div>
              <div className="text-gray-600 author-name cursor-pointer">
                {post.author.email}
              </div>
            </div>
            <div className="items-like flex items-center space-x-1 text-gray-600">
              <FaHeart />
              <span>{post.like_count}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductPageSort;
