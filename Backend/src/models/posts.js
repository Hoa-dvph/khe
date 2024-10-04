import mongoose from 'mongoose';

// Định nghĩa schema cho bình luận
const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, 
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Định nghĩa schema cho bài viết
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, 
        trim: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'hidden'], 
        default: 'draft',
    },
    views: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,  
        trim: true,
    },
    comments: [commentSchema], 
});

// Tạo model từ schema
const Post = mongoose.model('Post', postSchema);

export default Post;
