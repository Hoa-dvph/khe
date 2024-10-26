import React from "react";
import VectorArrowDown from "../../assets/images/Arrow down-circle.svg";
import VectorAvatar from "../../assets/images/avata.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = localStorage.getItem("user");
  const dataUser = user && JSON.parse(user);
  console.log("🚀 ~ Profile ~ dataUser:", dataUser);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="font-sans">
      <section className="bg-gradient-to-r from-gray-600 to-gray-900 h-80 flex flex-col justify-center items-center text-white relative">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-2 border-white rounded-full flex justify-center items-center hover:bg-white hover:text-black transition duration-300">
            <img src={VectorArrowDown} alt="Down Arrow" className="w-8 h-8" />
          </div>
          <p className="mt-4 text-2xl font-semibold">Add a Banner Image</p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="flex justify-between max-w-7xl mx-auto p-8 space-x-12">
        {/* Profile Left */}
        <div className="w-1/4 flex flex-col items-center space-y-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={VectorAvatar}
              alt="Bằng Đỗ"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold">{dataUser?.name}</h2>
          <Link to={`edit/${dataUser?._id}`} className="w-full">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">
              Edit Profile Info
            </button>
          </Link>
          <Link
            to={`/profile/edit-password/${dataUser?._id}`}
            className="w-full"
          >
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300">
              Edit Password
            </button>
          </Link>

          <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg flex justify-between items-center shadow hover:bg-gray-200 transition duration-300">
            Customize Profile{" "}
            <span className="bg-blue-500 text-white py-1 px-3 rounded-lg">
              Pro
            </span>
          </button>
          <div className="w-full bg-white p-6 border border-gray-300 rounded-lg shadow-lg text-center">
            <p className="font-semibold text-lg">Hire {dataUser?.name}</p>
            <p className="text-sm text-gray-500 mt-2">
              Looking For Opportunities?
            </p>
            <Link to={`edit/${dataUser?._id}`}>
              <button className="mt-4 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
                Edit Availability
              </button>
            </Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Profile Right */}
        <div className="w-3/4">
          {/* Navigation */}
          <nav className="flex space-x-6 border-b border-gray-300 pb-4 mr-10">
            <a href="#" className="hover:text-blue-500 text-lg ">
              Work
            </a>
            <a href="#" className="hover:text-blue-500 text-lg ">
              Services
            </a>
            <a href="#" className="hover:text-blue-500 text-lg ">
              Adobe Stock
            </a>
            <a href="#" className="hover:text-blue-500 text-lg ">
              Livestreams
            </a>
            <a href="#" className="hover:text-blue-500 text-lg ">
              Moodboards
            </a>
            <a href="#" className="hover:text-blue-500 text-lg ">
              Appreciation
            </a>
            <a href="#" className="hover:text-blue-500 text-lg ">
              Your Stats
            </a>
          </nav>

          {/* Drafts */}
          <div className="mt-6 text-xl font-semibold">Drafts</div>

          {/* Create Project Section */}
          <div className="mt-8 flex justify-center">
            <div className="w-96 h-72 border border-gray-300 bg-gray-50 flex flex-col justify-center items-center text-center rounded-lg shadow-lg p-8">
              <div className="text-5xl font-bold text-blue-500 mb-4">+</div>
              <p className="text-2xl font-semibold">Create a Project</p>
              <p className="mt-2 text-sm text-gray-500">
                Get feedback, views, and appreciations. Public projects can be
                featured by our curators.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
