#### 🚀 EntreSkill Hub
EntreSkill Hub is an AI-powered EdTech platform that bridges the gap between technical skills and business execution. It provides a comprehensive ecosystem for aspiring founders to explore ideas, follow structured roadmaps, and interact with specialized AI mentors.

## Project Overview
Developed by Aaryaman Modi, this platform uses the MERN stack to deliver a gamified, insightful experience for business development. The system integrates the Gemini API to simulate real-world expert consultations.

## Core Features
Idea Command Center: A curated collection of 12 scalable business models including AI Agencies, Smart Home Installation, and Cybersecurity Auditing.

AI Session Room: A real-time chat interface where AI personas like "Rohan Das" (AI Architect) or "Chef Priya" (Culinary Consultant) provide niche advice.

Structured Roadmaps: Detailed milestones for each venture, covering legal, financial, and operational steps.

Founder Progression: A leveling system where users earn XP and progress from "Ideator" to "Expert Mentor".

Mentor Console: A specialized dashboard for managing student support tickets and resolving business doubts.

## Technical Stack
Frontend: React.js with Vite and Tailwind CSS (Deployed on Vercel).

Backend: Node.js & Express.js (Deployed on Render).

Database: MongoDB Atlas (NoSQL).

AI Engine: Google Gemini API.

## Installation & Setup
Clone the Repo:
git clone https://github.com/aaryamanmodi353-rgb/Entreskill-hub.git

Backend Configuration:

Navigate to /server and run npm install.

Create a .env file with MONGO_URI, JWT_SECRET, and GEMINI_API_KEY.

Frontend Configuration:

Navigate to /client and run npm install.

Run the development server with npm run dev.

## Security Implementation
Bcrypt.js: Advanced password hashing using a pre('save') hook to ensure no plain-text passwords inhabit the database.

JWT Authentication: Secure, token-based session management for all protected routes.

CORS: Configured for secure cross-origin communication between Render and Vercel.

## Author
Aaryaman Modi

Full-Stack Developer and AI Enthusiast.
