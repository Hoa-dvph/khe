import React, { useEffect, useState } from "react";
import { FaSave, FaHeart, FaSearch, FaSort, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  title: string;
  images: string[];
  like_count: number;
  author: {
    name: string;
  };
  date: string;
  topic: string;
}

interface Filters {
  name: string;
  author: string;
  date: string;
  topic: string;
}

const ProductPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'like_count'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    name: '',
    author: '',
    date: '',
    topic: '',
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [posts, searchTerm, filters, sortBy, sortOrder]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    if (!Array.isArray(posts)) {
      console.error('posts is not an array:', posts);
      return;
    }

    let filtered = posts.filter((post) => {
      return (
        (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) &&
        (post.title?.toLowerCase().includes(filters.name.toLowerCase()) ?? false) &&
        (post.author?.name?.toLowerCase().includes(filters.author.toLowerCase()) ?? false) &&
        (filters.date ? post.date?.includes(filters.date) ?? false : true) &&
        (filters.topic ? post.topic === filters.topic : true)
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date || '').getTime() - new Date(b.date || '').getTime()
          : new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      } else {
        return sortOrder === 'asc'
          ? (a.like_count || 0) - (b.like_count || 0)
          : (b.like_count || 0) - (a.like_count || 0);
      }
    });

    setFilteredPosts(filtered);
  };

  const handleSort = (by: 'date' | 'like_count') => {
    if (by === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(by);
      setSortOrder('desc');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-2">
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 pl-10 border rounded w-full"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="p-2 bg-gray-200 text-gray-700 rounded ml-2 hover:bg-gray-300"
          >
            <FaFilter />
          </button>
          <button
            onClick={() => handleSort('date')}
            className="p-2 bg-blue-500 text-white rounded ml-2 hover:bg-blue-600"
          >
            <FaSort /> Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('like_count')}
            className="p-2 bg-blue-500 text-white rounded ml-2 hover:bg-blue-600"
          >
            <FaSort /> Likes {sortBy === 'like_count' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
        {isFilterVisible && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Filter by name"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filter by author"
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            />
            <select
              name="topic"
              value={filters.topic}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="">All Topics</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
              <option value="Art">Art</option>
              {/* Add more topics as needed */}
            </select>
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-red-500 text-xl font-semibold">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <Link to={`/product/${post._id}`} key={post._id} className="block">
              <div className="items mb-6 relative group">
                <div className="items-img bg-gray-200 h-48 rounded-lg overflow-hidden relative">
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
                      {post.author.name}
                    </div>
                  </div>
                  <div className="items-like flex items-center space-x-1 text-gray-600">
                    <FaHeart />
                    <span>{post.like_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;