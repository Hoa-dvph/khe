import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { PhotoIcon } from '@heroicons/react/24/outline';

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: '',
    status: 'draft',
    topic: '',
    author: '',
  });
  const [topics, setTopics] = useState<{ _id: string; name: string }[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userString && token) {
      try {
        const user = JSON.parse(userString);
        if (user && user._id) {
          setPost(prevPost => ({ ...prevPost, author: user._id }));
          
          // Fetch topics
          const fetchTopics = async () => {
            try {
              const response = await axios.get('http://localhost:3000/api/topic', {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              if (response.data && response.data.topics) {
                setTopics(response.data.topics);
              }
            } catch (error) {
              console.error('Error fetching topics:', error);
              alert('Error fetching topics. Please try again.');
            }
          };

          fetchTopics();
        } else {
          console.error('User object or _id not found in parsed user data');
          alert('User information is incomplete. Please log in again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        alert('Error retrieving user data. Please log in again.');
        navigate('/login');
      }
    } else {
      console.error('User data or token not found in localStorage');
      alert('User not logged in. Please log in to add a post.');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Create preview URLs for the new images
      const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
      setSelectedImages(prevUrls => [...prevUrls, ...newImageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setSelectedImages(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const uploadImagesToCloudinary = async () => {
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    const uploadPromises = imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'upload');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dncncfc2a/image/upload',
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    uploadedUrls.push(...results.filter((url): url is string => url !== null));

    setIsUploading(false);
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      let uploadedImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        uploadedImageUrls = await uploadImagesToCloudinary();
      }
      
      const response = await axios.post('http://localhost:3000/api/posts', {
        ...post,
        tags: post.tags.split(',').map(tag => tag.trim()),
        images: uploadedImageUrls,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        alert('Post added successfully!');
        navigate('/posts');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please check your information and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 px-8">
          <h1 className="text-4xl font-extrabold text-white text-center tracking-wide">Create New Post</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="Enter post title"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700">Topic</label>
              <select
                id="topic"
                name="topic"
                value={post.topic}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Write your post content here..."
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={post.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                placeholder="Enter tags, separated by commas"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={post.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <label htmlFor="imageFiles" className="block text-sm font-semibold text-gray-700">Upload Images</label>
            <div className="flex items-center flex-wrap gap-4">
              <label htmlFor="imageFiles" className="cursor-pointer">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-200 transition duration-200 ease-in-out border-2 border-dashed border-gray-300">
                  <PhotoIcon className="w-10 h-10 mb-2" />
                  <span className="text-sm">Add Image</span>
                </div>
              </label>
              <input
                type="file"
                id="imageFiles"
                name="imageFiles"
                onChange={handleImageFileChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              {selectedImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Selected ${index + 1}`} className="w-32 h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isUploading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 text-lg"
            >
              {isUploading ? 'Uploading...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddPost;