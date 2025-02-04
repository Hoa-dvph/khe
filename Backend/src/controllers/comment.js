import Comment from "../models/comment.js";
import Post from "../models/posts.js";
import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
export const createComment = async (req, res) => {
    try {
        const { post, message } = req.body
        const user = req.user
        const postCheck = await Post.findById(post)
        if (!postCheck) return res.status(400).json({ message: "Post not found" })
        const newComment = await Comment.create({ ...req.body, author: user._id });
        const populatedComment = await Comment.findById(newComment._id).populate('author');
        res.status(StatusCodes.CREATED).json({ message: "Comment created successfully", data: populatedComment });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const getComment = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("author");
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found.' });
        }
        const comments = await Comment.find({ post: post }).populate("author");
        return res.status(StatusCodes.OK).json({ message: "Lấy thành công", comments: comments });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found.' });
        }
        return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}