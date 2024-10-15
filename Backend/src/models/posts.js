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
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    avatar: {
        type: String, 
        trim: true,

    },
    tags: [{
        type: String,
        trim: true,
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'hidden'],
        default: 'draft',
    },
    images: [{
        type: String,
        trim: true,
    }],
    like_count: {
        type: Number,
        default: 0,
    },
    like: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true,
    versionKey: false,
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
});

// Tạo model từ schema
const Post = mongoose.model('Post', postSchema);

export default Post;