
import express from 'express';
import { createComment, deleteComment, getComment } from '../controllers/comment.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = express.Router();
router.get('/comment/:id', getComment);
router.post('/comment', checkAuth, createComment);
router.delete('/comment/:id', deleteComment);
export default router;