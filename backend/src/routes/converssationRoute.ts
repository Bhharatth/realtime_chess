import { createConversations, getUserConversations } from '../controllers/conversationControllers';
import express from 'express';
const router = express.Router();

router.post("/createCon", createConversations);
router.get("/getCon",getUserConversations);

export default router;