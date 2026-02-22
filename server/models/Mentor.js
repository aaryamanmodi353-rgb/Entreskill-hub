import mongoose from 'mongoose';


const mentorSchema = new mongoose.Schema(
  {
    // This links the Mentor profile to their core User account
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expertise: {
      type: [String], // e.g., ['Business Registration', 'Digital Marketing']
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    mentees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;