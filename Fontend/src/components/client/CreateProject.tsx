import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Tooltip, Snackbar, Divider, MenuItem, Select, InputLabel, FormControl, Grid, Card, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GifIcon from '@mui/icons-material/Gif';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const CreatePost = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('draft');
    const [topic, setTopic] = useState(''); // Add state for topic
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [isUploading, setIsUploading] = useState(false); // State for uploading status
    const [imageFiles, setImageFiles] = useState<File[]>([]); // State for image files
    const [topics, setTopics] = useState<{ _id: string; name: string }[]>([]); // Thêm state cho topics
    const [author, setAuthor] = useState(''); // Add state for author
    const [modalOpen, setModalOpen] = useState(false); // Add state for modal visibility
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userString && token) {
            try {
                const user = JSON.parse(userString);
                if (user && user._id) {
                    setAuthor(user._id); // Set author ID from user data
                    setUserName(user.name); // Set user name
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

    useEffect(() => {
        // Fetch topics
        const fetchTopics = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/topic', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data && response.data.topics) {
                    setTopics(response.data.topics); // Cập nhật state với danh sách chủ đề
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
                alert('Error fetching topics. Please try again.');
            }
        };

        fetchTopics(); // Gọi hàm fetchTopics
    }, []); // Chỉ chạy một lần khi component mount

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
        setImageFiles(prevFiles => [...prevFiles, ...files]); // Store the actual files

        // Upload images to Cloudinary
        await uploadImagesToCloudinary(files);
    };

    const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => { // Change return type to Promise<string[]>
        setIsUploading(true);
        const uploadedUrls: string[] = [];

        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'upload'); // Ensure you have the correct upload preset

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dncncfc2a/image/upload',
                    formData
                );
                return response.data.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                setErrorMessage('Error uploading image. Please try again.'); // Set error message
                return null;
            }
        });

        const results = await Promise.all(uploadPromises);
        uploadedUrls.push(...results.filter((url): url is string => url !== null));

        setIsUploading(false);
        console.log('Uploaded image URLs:', uploadedUrls); // You can store these URLs as needed
        return uploadedUrls; // Return the uploaded URLs
    };

    const handlePost = async () => {
        if (!title || !content) {
            setErrorMessage('Title and content are required.'); // Basic validation
            return;
        }

        const token = localStorage.getItem('token');
        let uploadedImageUrls: string[] = [];
        if (imageFiles.length > 0) {
            uploadedImageUrls = await uploadImagesToCloudinary(imageFiles); // Upload images
        }

        try {
            const response = await axios.post('http://localhost:3000/api/posts', {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()),
                status,
                topic, // Include topic in the post data
                images: uploadedImageUrls,
                author, // Include author in the post data
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                alert('Post added successfully!');
                setModalOpen(false); // Close the modal after successful post
                setSnackbarOpen(true); // Open the Snackbar
            }
        } catch (error) {
            console.error('Error adding post:', error);
            setErrorMessage('Failed to add post. Please check your information and try again.'); // Set error message
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setImageFiles(imageFiles.filter((_, i) => i !== index)); // Remove from image files
    };

    // Function to refresh the list (you may need to implement this based on your logic)
    const refreshList = () => {
        // Logic to refresh the list of posts or topics
        // For example, you might want to call fetchTopics or fetchPosts here
    };

    return (
        <Card sx={{ maxWidth: 800, mx: 'auto', p: 3, borderRadius: 2, boxShadow: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                Tạo bài viết
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom sx={{ textAlign: 'center' }}>
                {userName || 'Người dùng chưa đăng nhập'} {/* Fallback text if no name is found */}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={3}> {/* Increased spacing for better layout */}
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        placeholder="Tiêu đề bài viết" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        sx={{ mb: 2, bgcolor: '#f5f5f5', borderRadius: 1 }} // Light background and rounded corners
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField 
                        multiline 
                        rows={4} 
                        variant="outlined" 
                        fullWidth 
                        placeholder="Bạn đang nghĩ gì thế?" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        sx={{ mb: 2, bgcolor: '#f5f5f5', borderRadius: 1 }} // Light background and rounded corners
                    />
                </Grid>
                
                {/* Image Grid */}
                <Grid item xs={12}>
                    <Box sx={{ border: '1px dashed #ccc', borderRadius: 1, p: 2, bgcolor: '#fafafa' }}>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Thêm hình ảnh
                        </Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}> {/* Increased gap */}
                            {images.map((image, index) => (
                                <div key={index} style={{ position: 'relative', width: '30%', transition: 'transform 0.2s' }}>
                                    <img 
                                        src={image} 
                                        alt={`Uploaded ${index}`} 
                                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} // Enhanced shadow
                                    />
                                    <Button 
                                        onClick={() => handleRemoveImage(index)} 
                                        variant="contained" 
                                        color="secondary" 
                                        sx={{ position: 'absolute', top: 5, right: 5, bgcolor: '#ff4081', '&:hover': { bgcolor: '#f50057' } }} // Custom color
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="topic-label">Chủ đề</InputLabel>
                        <Select
                            labelId="topic-label"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)} // Cập nhật state topic
                            variant="outlined"
                            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }} // Light background and rounded corners
                        >
                            {topics.map((topic) => (
                                <MenuItem key={topic._id} value={topic._id}>
                                    {topic.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="status-label">Trạng thái</InputLabel>
                        <Select
                            labelId="status-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            variant="outlined"
                            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }} // Light background and rounded corners
                        >
                            <MenuItem value="draft">Nháp</MenuItem>
                            <MenuItem value="published">Xuất bản</MenuItem>
                            <MenuItem value="hidden">Ẩn</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        placeholder="Nhập thẻ (cách nhau bằng dấu phẩy)" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)} 
                        sx={{ mb: 2, bgcolor: '#f5f5f5', borderRadius: 1 }} // Light background and rounded corners
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Box display="flex" alignItems="center">
                            <Tooltip title="Thêm hình ảnh">
                                <div>
                                    <input 
                                        accept="image/*" 
                                        style={{ display: 'none' }} 
                                        id="upload-image" 
                                        type="file" 
                                        multiple 
                                        onChange={handleImageChange} 
                                    />
                                    <label htmlFor="upload-image">
                                        <IconButton component="span">
                                            <AddPhotoAlternateIcon color="primary" />
                                        </IconButton>
                                    </label>
                                </div>
                            </Tooltip>
                            <Tooltip title="Thêm GIF">
                                <IconButton>
                                    <GifIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handlePost} 
                            sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' }, borderRadius: 1 }} // Rounded corners
                        >
                            Đăng
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {isUploading && (
                <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {errorMessage && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errorMessage}
                </Typography>
            )}

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={() => {
                    setSnackbarOpen(false);
                    setModalOpen(false); // Close the modal
                    refreshList(); // Refresh the list
                }} 
                message="Bài viết đã được đăng!" 
            />
        </Card>
    );
};

export default CreatePost;