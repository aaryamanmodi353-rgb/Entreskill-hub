import express from 'express';
import { getMentors, registerMentor, promoteToMentor, getCurrentMentor } from '../controllers/mentorController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public: View all mentors (Expert Registry)
router.route('/').get(getMentors);

// Private: User registers themselves as a mentor
router.route('/').post(protect, registerMentor);

// Admin Only: Promote a specific user to mentor status
// This matches the call from your Admin Dashboard
router.route('/promote').post(protect, admin, promoteToMentor);

router.route('/me').get(protect, getCurrentMentor);

export default router;