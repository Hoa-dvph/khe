import React, { useState, useEffect } from "react";
import VectorArrowDown from "../../assets/images/Arrow down-circle.svg";
import VectorAvatar from "../../assets/images/avata.png"; // Check this path
import { Link } from "react-router-dom";
import CreatePost from "./CreateProject";
import { Modal, Box, Button, Typography, Avatar, Grid } from '@mui/material';
import axios from 'axios';

// Define the Post interface
interface Post {
  _id: string;
  title: string;
  content: string;
  images: string | string[]; // Updated to allow for both string and array
}

const Profile = () => {
  const user = localStorage.getItem("user");
  const dataUser = user && JSON.parse(user);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [openModal, setOpenModal] = useState(false);

  // Fetch posts by user ID when the component mounts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/user/${dataUser?._id}`);
        if (Array.isArray(response.data)) {
          setUserPosts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setUserPosts([]);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setUserPosts([]);
      }
    };

    if (dataUser?._id) {
      fetchUserPosts();
    }
  }, [dataUser?._id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="font-sans">
      <section className="bg-gradient-to-r from-gray-600 to-gray-900 h-80 flex flex-col justify-center items-center text-white relative shadow-lg">
        <div className="flex flex-col items-center">
          <Avatar src={VectorArrowDown} alt="Down Arrow" className="w-20 h-20" />
          <Typography variant="h5" className="mt-4 text-lg font-semibold">Add a Banner Image</Typography>
        </div>
      </section>

      <section className="flex justify-between max-w-7xl mx-auto p-8 space-x-12">
        <div className="w-1/4 flex flex-col items-center space-y-6">
          <Avatar src={dataUser?.imageUrl || VectorAvatar} alt="User Avatar" className="w-32 h-32 border-4 border-gray-300 shadow-lg" />
          <Typography variant="h4" className="text-center font-bold">{dataUser?.name}</Typography>
          <Link to={`edit/${dataUser?._id}`} className="w-full">
            <Button variant="contained" color="primary" className="w-full hover:bg-blue-700 transition duration-300">Edit Profile Info</Button>
          </Link>
          <Link to={`/profile/edit-password/${dataUser?._id}`} className="w-full">
            <Button variant="contained" color="secondary" className="w-full hover:bg-purple-700 transition duration-300">Edit Password</Button>
          </Link>

          <Button variant="outlined" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">Customize Profile <span className="bg-blue-500 text-white py-1 px-3 rounded-lg">Pro</span></Button>
          <div className="w-full bg-white p-6 border border-gray-300 rounded-lg shadow-lg text-center">
            <Typography variant="h6" className="font-semibold">Hire {dataUser?.name}</Typography>
            <Typography variant="body2" className="text-gray-500 mt-2">Looking For Opportunities?</Typography>
            <Link to={`edit/${dataUser?._id}`}>
              <Button variant="outlined" className="mt-4 w-full hover:bg-gray-200 transition duration-300">Edit Availability</Button>
            </Link>
          </div>

          <Button onClick={handleLogout} variant="contained" color="error" className="mt-4 w-full hover:bg-red-700 transition duration-300">Logout</Button>
        </div>

        <div className="w-3/4">
          <section className="mt-8">
            <Typography variant="h5" className="text-2xl font-bold">My Posts</Typography>
            <Grid container spacing={2} className="mt-4">
              {Array.isArray(userPosts) && userPosts.length > 0 ? (
                userPosts.map((post: Post) => (
                  <Grid item xs={12} sm={6} md={4} key={post._id}>
                    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                      <img src={Array.isArray(post.images) ? post.images[0] : post.images} alt={post.title} className="w-full h-32 object-cover rounded-md" />
                      <Typography variant="h6" className="text-blue-600 mt-2 font-semibold">{post.title}</Typography>
                      <Typography variant="body2" className="text-gray-700 mt-2">{post.content}</Typography>
                      <Link to={`/posts/${post._id}`} className="text-blue-500 hover:underline mt-4 block">View Post</Link>
                    </div>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <div className="border p-4 rounded-lg shadow-lg bg-white text-center">
                    <Typography variant="h6" className="text-gray-500">You have no posts yet.</Typography>
                    <Typography variant="body2" className="text-gray-400 mt-2">Start creating your first post!</Typography>
                  </div>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
                <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col justify-center items-center">
                  <Button 
                    onClick={() => setOpenModal(true)} 
                    variant="outlined" 
                    className="w-full h-32 flex flex-col justify-center items-center text-center hover:bg-gray-200 transition duration-300"
                  >
                    <div className="text-5xl font-bold text-blue-500 mb-2">+</div>
                    <Typography variant="h6">Create a Project</Typography>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </section>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="create-project-modal"
            aria-describedby="create-project-description"
          >
            <Box sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              p: 3, 
              borderRadius: 2, 
              boxShadow: 3, 
              bgcolor: '#f9f9f9', 
              marginTop: 5,
              overflowY: 'auto', // Allow scrolling
              maxHeight: '80vh' // Limit modal height
            }}>
              <CreatePost />
            </Box>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Profile;