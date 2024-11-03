import express from 'express';
import { createPost, updatePost, deletePost, addComment, getAllPosts, getPostById, sortPosts, likeStatus, getPostsByUserId } from '../controllers/post.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = express.Router();


router.get('/posts', getAllPosts);

router.get('/posts/:id', getPostById);

router.post('/posts', createPost);

router.route('/posts/:id')
    .put(updatePost)
    .delete(deletePost);

router.post('/posts/:id/comments', addComment);
router.post('/posts/sortPorts', sortPosts)
router.post(`/like/:id`, checkAuth, likeStatus)
router.get('/posts/user/:userId', getPostsByUserId);
export default router;
