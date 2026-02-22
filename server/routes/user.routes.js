import express from 'express';
import { 
  registerUser, 
  authUser, 
  updateUserProfile,
  getUsers // <--- 1. ADD THIS IMPORT
} from '../controllers/userController.js';

// 2. ADD 'admin' IMPORT here
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.route('/profile').put(protect, updateUserProfile);

// 3. ADD THIS ROUTE
// This connects the "Users" tab in your frontend to the controller
router.route('/').get(protect, admin, getUsers);

export default router;