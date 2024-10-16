import { StatusCodes } from 'http-status-codes';
import Post from '../models/posts.js';
import User from '../models/user.js';
// Lấy tất cả bài viết 
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một bài viết theo ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // Lấy bài viết theo ID

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post); // Trả về bài viết
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
// like status 
export const likeStatus = async (req, res) => {
    try {
        const { user } = req.body
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.like.includes(user)) {
            post.like = post.like.filter(userId => userId !== user);
            post.like_count -= 1;
        } else {
            post.like.push(user);
            post.like_count += 1;
        }

        await post.save();

        res.status(200).json({
            message: "Success",
            like_count: post.like_count,
            like: post.like,
            post: post
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//sort post

export const sortPosts = async (req, res) => {
    try {
        const { title, sortCreateAt, sortLikes } = req.body;
        let filter = {}
        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        let sort = {}
        if (sortCreateAt) {
            sort.createdAt = sortCreateAt === "createAtNew" ? -1 : 1
        }
        if (sortLikes) {
            sort.like_count = sortLikes === "mostLike" ? -1 : 1
        }
        const posts = await Post.find(filter).sort(sort).populate("author");
        res.status(StatusCodes.OK).json({ message: "Lấy thành công ", posts });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
