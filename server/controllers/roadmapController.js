import mongoose from 'mongoose'; // <--- Required for ObjectId validation
import Roadmap from '../models/Roadmap.js';
import BusinessIdea from '../models/Businessidea.js'; 

/**
 * @desc    Create or Update a roadmap
 * @route   POST /api/roadmaps
 * @access  Private/Admin
 */
export const createRoadmap = async (req, res) => {
  try {
    const { ideaId, title, steps } = req.body;

    // 1. Validation: Check if the ID format is valid before querying
    if (!mongoose.Types.ObjectId.isValid(ideaId)) {
      return res.status(400).json({ message: 'Invalid Business Idea ID format.' });
    }

    // 2. Verify Idea Exists
    const ideaExists = await BusinessIdea.findById(ideaId);
    if (!ideaExists) {
      return res.status(404).json({ message: 'Business Idea not found' });
    }

    // 3. Upsert (Create or Update)
    const roadmap = await Roadmap.findOneAndUpdate(
      { ideaId: ideaId }, 
      { 
        ideaId, 
        title: title || `Roadmap for ${ideaExists.title}`, 
        steps 
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json(roadmap); 
  } catch (error) {
    console.error("Create Roadmap Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get roadmap by Idea ID
 * @route   GET /api/roadmaps/:ideaId
 * @access  Public
 */
export const getRoadmapByIdeaId = async (req, res) => {
  try {
    const { ideaId } = req.params;
    console.log("Fetching Roadmap for:", ideaId);

    // 1. CRITICAL FIX: Stop the crash if ID is "financial-basics" or "undefined"
    if (!mongoose.Types.ObjectId.isValid(ideaId)) {
      console.log("Invalid ID detected, returning 400");
      return res.status(400).json({ message: 'Invalid Roadmap ID. Please use a valid Business Idea ID.' });
    }

    // 2. Search Database
    const roadmap = await Roadmap.findOne({ ideaId: ideaId });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not mapped yet' });
    }

    res.json(roadmap); 
  } catch (error) {
    console.error("Get Roadmap Error:", error);
    res.status(500).json({ message: error.message });
  }
};