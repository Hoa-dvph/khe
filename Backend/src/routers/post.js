import express from 'express';
import { createPost, updatePost, deletePost, addComment } from '../controllers/post';

const router = express.Router();

router.post('/posts', createPost); 

router.route('/posts/:id')
    .put(updatePost)   
    .delete(deletePost); 

router.post('/posts/:id/comments', addComment); 

export default router;
