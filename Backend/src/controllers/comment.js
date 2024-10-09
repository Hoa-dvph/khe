import Comment from "../models/comment";
import Post from "../models/posts";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";
export const createComment = async (req, res) => {
    try {
        const { user, post, message } = req.body
        const userCheck = await User.findById(user)
        if (!userCheck) return res.status(400).json({ message: "User not found" })
        const postCheck = await Post.findById(post)
        if (!postCheck) return res.status(400).json({ message: "Post not found" })
        const newComment = await Comment.create(req.body)
        res.status(StatusCodes.CREATED).json({ message: "Comment created successfully", data: newComment })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const getComment = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Post.findById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found.' });
        }
        const comments = await Comment.find({ post: productId });
        return res.status(StatusCodes.OK).json(comments);
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