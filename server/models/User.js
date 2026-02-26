import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // --- FOUNDER / MENTOR FIELDS ---
    isAdmin: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    title: { 
      type: String, 
      default: 'Founder' 
    },
    xp: { 
      type: Number, 
      default: 0 
    },
    level: { 
      type: Number, 
      default: 1 
    },
    // -------------------------------

    role: { type: String, default: 'User' },
    skills: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

// --- 🔥 THIS WAS MISSING! ADD THIS BLOCK ---
// This runs BEFORE saving to the database. 
// It checks if the password changed, then encrypts it.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// -------------------------------------------

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;