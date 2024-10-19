import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { XCircleIcon, PhotoIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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
        navigate('/admin/posts');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please check your information and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin/posts')}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Posts
        </button>
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-10 px-8">
            <h1 className="text-4xl font-extrabold text-white text-center">Create New Post</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={post.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                required
                rows={8}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={post.tags}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  value={post.topic}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedImages.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img src={imageUrl} alt={`Selected ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-200 transform group-hover:scale-105" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-200 group">
                  <input
                    type="file"
                    onChange={handleImageFileChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <PhotoIcon className="w-10 h-10 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                  <span className="mt-2 text-sm text-gray-500 group-hover:text-indigo-500 transition-colors duration-200">Add Images</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
              >
                {isUploading ? 'Uploading...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;