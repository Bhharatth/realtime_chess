import { getAllusers } from '../controllers/userControllers';
import express from 'express';
const router = express.Router();

router.get("/getAllUsers", getAllusers);

export default router;