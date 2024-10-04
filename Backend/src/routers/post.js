import express from 'express';
import { createPost, updatePost, deletePost, addComment, getAllPosts, getPostById } from '../controllers/post';

const router = express.Router();


router.get('/posts', getAllPosts);

router.get('/posts/:id', getPostById);

router.post('/posts', createPost); 

router.route('/posts/:id')
    .put(updatePost)   
    .delete(deletePost); 

router.post('/posts/:id/comments', addComment); 

export default router;
