import BusinessIdea from '../models/Businessidea.js';

// @desc    Create a new business idea
// @route   POST /api/ideas
// @access  Public (We will restrict this to Admins later)
export const createBusinessIdea = async (req, res) => {
  try {
    const { title, description, requiredSkills, category, estimatedCost, difficulty } = req.body;

    const idea = new BusinessIdea({
      title,
      description,
      requiredSkills,
      category,
      estimatedCost,
      difficulty,
    });

    const createdIdea = await idea.save();
    res.status(201).json(createdIdea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all business ideas
// @route   GET /api/ideas
// @access  Public
export const getBusinessIdeas = async (req, res) => {
  try {
    const ideas = await BusinessIdea.find({});
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recommended ideas based on skills
// @route   GET /api/ideas/recommendations?skills=Tailoring,Stitching
// @access  Public
export const getRecommendedIdeas = async (req, res) => {
  try {
    const skillsQuery = req.query.skills;
    
    if (!skillsQuery) {
      return res.status(400).json({ message: 'Please provide skills to get recommendations' });
    }

    // Convert the comma-separated string from the URL into an array
    const userSkills = skillsQuery.split(',').map((skill) => skill.trim());

    // Find business ideas where the requiredSkills array contains AT LEAST ONE of the user's skills
    const recommendedIdeas = await BusinessIdea.find({
      requiredSkills: { $in: userSkills },
    });

    res.json(recommendedIdeas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};