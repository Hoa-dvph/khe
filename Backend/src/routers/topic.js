
import express from 'express';
import { createTopic, deleteTopic, getAllTopics, getIdTopic, updateTopic } from '../controllers/topic.js';
import { checkAdmin, checkAuth } from '../middleware/checkAuth.js';

const router = express.Router();
router.get('/topic/:id', checkAuth, checkAdmin, getIdTopic);
router.post('/topic', checkAuth, checkAdmin, createTopic);
router.get('/topic', getAllTopics);
router.put('/topic', checkAuth, checkAdmin, updateTopic);
router.delete('/topic/:id', checkAuth, checkAdmin, deleteTopic)


export default router;