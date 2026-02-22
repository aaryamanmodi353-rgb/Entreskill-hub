import express from 'express';
import { createRoadmap, getRoadmapByIdeaId } from '../controllers/roadmapController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected Route: Only Admins can create a roadmap
router.post('/', protect, admin, createRoadmap);

// Public Route: Anyone can fetch the roadmap for an idea
router.get('/:ideaId', getRoadmapByIdeaId);

export default router;