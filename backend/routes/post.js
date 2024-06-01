import { Router } from "express";
import authenticate from '../middlewares/authentication.js';
import * as postController from '../controllers/postController.js';

const router = Router();

router.post('/createPost', authenticate, postController.createPost);
router.get('/viewPost/:id', postController.viewPost);
router.get('/all', postController.allPosts);
router.get('/myPosts', postController.myPosts);
router.put('/editPost', authenticate, postController.editPost);
router.delete('/deletePost/:postId', authenticate, postController.deletePost);

export default router;