import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // --- NEW FIELDS (These were missing!) ---
    isAdmin: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    title: { 
      type: String, 
      default: 'Founder' // This allows us to change it to 'Expert Mentor' later
    },
    xp: { 
      type: Number, 
      default: 0 
    },
    level: { 
      type: Number, 
      default: 1 
    },
    // ----------------------------------------

    role: { type: String, default: 'User' },
    skills: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;