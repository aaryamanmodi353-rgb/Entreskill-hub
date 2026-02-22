import express from 'express';
import {
  createBusinessIdea,
  getBusinessIdeas,
  getRecommendedIdeas,
} from '../controllers/businessideaController.js';

// 1. Import the security middlewares
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 2. Public Routes: Anyone can view business ideas and get recommendations
router.get('/recommendations', getRecommendedIdeas);
router.get('/', getBusinessIdeas);

// 3. Protected Route: ONLY logged-in users who are 'Admins' can create new ideas
router.post('/', protect, admin, createBusinessIdea);

export default router;