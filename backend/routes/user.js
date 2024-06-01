import { Router } from "express";
import authenticate from '../middlewares/authentication.js';
import * as userControllers from '../controllers/userController.js';

const router = Router();

router.get('/profile/:username', userControllers.profile);
router.patch('/update', authenticate, userControllers.updateProfile);
router.delete('/delete', authenticate, userControllers.deleteProfile);

export default router;