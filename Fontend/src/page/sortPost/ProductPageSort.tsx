import React from "react";
import { IPostSort, Post } from "@/types/post";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import InforUserHome from "./InforUserHome";
import { FaFolderOpen } from "react-icons/fa";

interface Props {
  post: Post;
}

const ProductPageSort = ({ post }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div key={post._id}>
      <div className="items mb-6 relative group">
        <div className="items-img bg-gray-200 h-56 rounded-sm overflow-hidden relative">
          <Link to={`/product/${post._id}`}>
            <img
              src={post.images[0] || "./assets/images/image.png"}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
            <div className="items-save bg-black text-white opacity-40 px-2 py-1 rounded-full shadow-md cursor-pointer flex items-center space-x-2 border border-gray-300 hover:opacity-70">
              <FaFolderOpen size={15} />
              <span className="font-medium text-sm">Save</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="items-text">
            <Link to={`/product/${post._id}`}>
              <div className="text-base font-semibold">{post.title}</div>
            </Link>
            <div
              className="text-gray-600 author-name cursor-pointer text-sm"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {post.author ? post.author.email : "Unknown Author"} {/* Updated line */}
            </div>
          </div>
          <div className="items-like flex items-center space-x-1 text-gray-600">
            <FaHeart />
            <span>{post.like_count}</span>
          </div>
        </div>
      </div>
      {showTooltip && (
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="absolute"
        >
          <InforUserHome user={post.author} />
        </div>
      )}
    </div>
  );
};

export default ProductPageSort;