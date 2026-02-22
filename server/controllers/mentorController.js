import Mentor from '../models/Mentor.js';
import User from '../models/User.js'; // Essential for updating the user badge

// @desc    Get all available mentors with their user details
export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({ isAvailable: true }).populate('user', 'name email');
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a user as a mentor (Self-registration)
export const registerMentor = async (req, res) => {
  const { expertise, bio, experienceYears } = req.body;
  try {
    const mentorExists = await Mentor.findOne({ user: req.user._id });
    if (mentorExists) return res.status(400).json({ message: 'Mentor profile already exists.' });

    const mentor = await Mentor.create({ user: req.user._id, expertise, bio, experienceYears });
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Admin: Promote a specific user to mentor status
// @route   POST /api/mentors/promote
export const promoteToMentor = async (req, res) => {
  const { userId, expertise, bio, experienceYears } = req.body;

  try {
    // 1. Fetch the User first to ensure they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found in registry.' });
    }

    // 2. Check if Mentor profile already exists
    const mentorExists = await Mentor.findOne({ user: userId });

    if (mentorExists) {
      // --- FIX: IDEMPOTENT UPDATE ---
      // If they are already a mentor, don't error out. 
      // Instead, FORCE the title update to ensure the badge appears.
      console.log(`Syncing title for existing mentor: ${user.name}`);
      
      user.title = 'Expert Mentor'; // Force the title
      await user.save();            // Save the user updates
      
      return res.status(200).json({ message: 'User title synchronized to Expert Mentor.' });
    }

    // 3. If not, create the mentor document
    // This physically creates the "mentors" collection if it doesn't exist
    const mentor = await Mentor.create({
      user: userId,
      expertise,
      bio,
      experienceYears
    });

    // 4. Update the user's role/title in the User collection
    user.title = 'Expert Mentor';
    await user.save();

    res.status(201).json(mentor);
  } catch (error) {
    console.error("Promotion Error:", error);
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get the current logged-in mentor's profile
// @route   GET /api/mentors/me
export const getCurrentMentor = async (req, res) => {
  try {
    // Find the mentor profile linked to this user ID
    const mentor = await Mentor.findOne({ user: req.user._id });
    
    if (mentor) {
      res.json(mentor);
    } else {
      res.status(404).json({ message: 'Mentor profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};