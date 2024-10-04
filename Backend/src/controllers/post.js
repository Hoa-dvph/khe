import Post from '../models/posts.js';

// Tạo bài viết mới
export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body); 
        await newPost.save(); 
        res.status(201).json(newPost); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật bài viết 
export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true, 
        });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa bài viết 
export const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id); // Xóa bài viết theo ID
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// bình luận vào bài viết
export const addComment = async (req, res) => {
    const { name, avatar, message } = req.body;

    try {
        const post = await Post.findById(req.params.id); 

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = { name, avatar, message }; 
        post.comments.push(newComment); 

        await post.save(); 
        res.status(201).json(post); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
