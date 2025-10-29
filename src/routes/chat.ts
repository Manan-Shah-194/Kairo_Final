import { Router } from 'express';
import { createChatSession, sendMessage } from '../controllers/chatController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Protected routes - require authentication
router.post('/session', authMiddleware, createChatSession);
router.post('/:sessionId/message', authMiddleware, sendMessage);

export default router;
