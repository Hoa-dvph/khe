
import express from 'express';
import { createComment, deleteComment, getComment } from '../controllers/comment';

const router = express.Router();
router.get('/comment/:id', getComment);
router.create('/comment', createComment);
router.delete('/comment/:id', deleteComment);
export default router;