import mongoose from 'mongoose';

const businessIdeaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., 'Handicrafts', 'Food Services', 'Digital'
    },
    estimatedCost: {
      type: String, // Stored as a string to allow ranges like "₹5,000 - ₹15,000"
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
  },
  {
    timestamps: true,
  }
);

const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema);
export default BusinessIdea;