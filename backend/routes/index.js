import { Router } from "express";
import authRoutes from './auth.js';
import userRoutes from './user.js';
import postRoutes from './post.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

export default router;