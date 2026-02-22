import mongoose from 'mongoose';

const userProgressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Roadmap'
  },
  // We will store an array of the step indices that are completed (e.g., [0, 2] means step 1 and 3 are done)
  completedSteps: [{
    type: Number 
  }],
  // Track if the whole roadmap is finished
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;