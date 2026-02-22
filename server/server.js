import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbs.js';
import roadmapRoutes from './routes/roadmap.routes.js';
import chatRoutes from './routes/chat.routes.js';
import progressRoutes from './routes/progress.routes.js'
import mentorRoutes from './routes/mentor.routes.js'


// Import Routes
import userRoutes from './routes/user.routes.js';
import businessIdeaRoutes from './routes/businessidea.routes.js'; // <--- 1. ADD THIS

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/ideas', businessIdeaRoutes); // <--- 2. ADD THIS
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('EntreSkill Hub API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});