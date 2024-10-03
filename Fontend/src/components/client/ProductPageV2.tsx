import React from 'react'

const Product = () => {
  return (
<div className="items mb-6 relative group">
  <div className="items-img bg-gray-200 h-48 rounded-lg overflow-hidden relative">
    <img src="./assets/images/image.png"  className="object-cover w-full h-full" />

    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="items-save bg-white text-gray-800 p-2 rounded-full shadow-md cursor-pointer flex items-center space-x-2 border border-gray-300 hover:bg-gray-100">
        <i className="fas fa-save text-lg" />
        <span className="font-medium">Save</span>
      </div>
    </div>

    <div className="absolute top-0 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <img src="./assets/images/label.png" alt="Label" className="w-12 h-12 object-contain" />
    </div>
  </div>

  <div className="flex justify-between items-center mt-2 relative">
    <div className="items-text relative">
      <div className="text-lg font-semibold">Image Title</div>
      <div className="text-gray-600 author-name cursor-pointer">Author Name</div>
      {/* Hover card */}
      <div className="author-card">
        <div className="image-gallery">
          <div className="flex">
            <img src="https://via.placeholder.com/100x60" alt="Image 1" className="w-1/3 h-auto rounded-lg" />
            <img src="https://via.placeholder.com/100x60" alt="Image 2" className="w-1/3 h-auto rounded-lg" />
            <img src="https://via.placeholder.com/100x60" alt="Image 3" className="w-1/3 h-auto rounded-lg" />
          </div>
          <img src="https://via.placeholder.com/60" alt="Avatar" className="avatar" />
        </div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">Vitalii Mamchur</h3>
          <p className="text-sm text-gray-500">Rivne, Ukraine</p>
        </div>
        <div className="flex justify-between mb-4 text-gray-600 text-sm">
          <div className="flex flex-col items-center">
            <strong>666</strong>
            <span>Appreciations</span>
          </div>
          <div className="flex flex-col items-center">
            <strong>199</strong>
            <span>Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <strong>5.4k</strong>
            <span>Project Views</span>
          </div>
        </div>
        <div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-full flex items-center justify-center mb-2">
            <i className="fas fa-plus mr-2" /> Follow
          </button>
          <button className="w-full bg-gray-100 text-blue-500 py-2 rounded-full flex items-center justify-center">
            <i className="fas fa-envelope mr-2" /> Hire
          </button>
        </div>
      </div>
    </div>
    <div className="flex space-x-4">
      <div className="items-like flex items-center space-x-1 text-gray-600">
        <i className="fas fa-heart" />
        <span>123</span>
      </div>
      <div className="items-view flex items-center space-x-1 text-gray-600">
        <i className="fas fa-eye" />
        <span>456</span>
      </div>
    </div>
  </div>
</div>

  )
}

export default Product