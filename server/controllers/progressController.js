import UserProgress from '../models/Userprogress.js';
import User from '../models/User.js';
import Roadmap from '../models/Roadmap.js';

// @desc    Toggle a step's completion status
// @route   POST /api/progress/toggle
// @access  Private
export const toggleStepCompletion = async (req, res) => {
  const { roadmapId, stepIndex } = req.body;
  const userId = req.user._id;

  try {
    // 1. Find or Create the Progress Document for this User + Roadmap
    let progress = await UserProgress.findOne({ user: userId, roadmap: roadmapId });

    if (!progress) {
      progress = await UserProgress.create({
        user: userId,
        roadmap: roadmapId,
        completedSteps: []
      });
    }

    // 2. Toggle the Step Index
    const index = progress.completedSteps.indexOf(stepIndex);
    let message = "";
    let xpAwarded = 0;

    if (index > -1) {
      // UNCHECK: Remove step from array
      progress.completedSteps.splice(index, 1);
      message = "Step unchecked";
      // Optional: Deduct XP if you want, or just leave it.
    } else {
      // CHECK: Add step to array
      progress.completedSteps.push(stepIndex);
      message = "Step completed!";
      xpAwarded = 500; // Reward!
    }

    await progress.save();

    // 3. GAMIFICATION: Update User XP if they completed a step
    if (xpAwarded > 0) {
      const user = await User.findById(userId);
      user.xp += xpAwarded;
      // Simple Level Up Logic: Every 1000 XP is a new level
      user.level = Math.floor(user.xp / 1000) + 1;
      await user.save();
    }

    res.status(200).json({ 
      success: true, 
      completedSteps: progress.completedSteps, 
      message,
      newXP: xpAwarded > 0 ? 500 : 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's progress for a specific roadmap
// @route   GET /api/progress/:roadmapId
// @access  Private
export const getRoadmapProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ 
      user: req.user._id, 
      roadmap: req.params.roadmapId 
    });

    res.json({ 
      completedSteps: progress ? progress.completedSteps : [] 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};