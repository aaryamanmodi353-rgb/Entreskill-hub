import express from 'express';
import { toggleStepCompletion, getRoadmapProgress } from '../controllers/progressController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

// All progress routes are protected (User must be logged in)
router.route('/toggle').post(protect, toggleStepCompletion);
router.route('/:roadmapId').get(protect, getRoadmapProgress);

export default router;