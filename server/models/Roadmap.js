import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Validation', 'Setup', 'Legal', 'Marketing', 'Operations', 'Financial'],
    required: true,
  },
});

const roadmapSchema = new mongoose.Schema(
  {
    // Changed to 'ideaId' to match your curator's state
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'BusinessIdea',
    },
    title: { type: String, required: true },
    steps: [stepSchema],
  },
  { timestamps: true }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;