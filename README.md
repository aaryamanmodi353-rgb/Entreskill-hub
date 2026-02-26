🚀 EntreSkill Hub
EntreSkill Hub is a full-stack AI-powered EdTech platform designed to bridge the gap between technical learning and entrepreneurial execution. Developed by Aaryaman Modi, the platform provides users with curated business ideas, structured execution roadmaps, and real-time AI mentorship to help them launch their own ventures.

🌟 Core Features
Intelligent Business Discovery: Explore a curated list of 12 scalable business models, from AI Automation Agencies to Smart Home Installation services.

AI-Driven Mentorship: Engage in real-time chat sessions where the AI adopts specific expert personas tailored to your chosen business path.

Founder Progression System: Earn XP and level up your profile as you progress from an "Ideator" to a "Founder" or "Expert Mentor".

Execution Roadmaps: Get step-by-step milestones for every business idea, complete with required skills and estimated entry capital.

Admin & Mentor Tools: Specialized consoles for experts to manage student requests and curate new roadmap materials.

🛠️ Technical Stack
Frontend: React.js with Vite, Tailwind CSS.

Backend: Node.js & Express.js.

Database: MongoDB Atlas.

AI Engine: Google Gemini API.

Deployment: Vercel (Frontend) and Render (Backend).

🏗️ System Architecture
The project utilizes a decoupled MERN architecture to ensure high performance and seamless scaling:

Client: A responsive Single Page Application (SPA) built with React.

API: A RESTful Node.js server managing authentication, logic, and AI prompts.

Security: Implementation of Bcrypt.js for password hashing and JWT for secure session management.

🚀 Getting Started
Prerequisites
Node.js (v18+)

MongoDB Atlas Account

Gemini API Key

Installation
Clone the Repository:

Bash
git clone https://github.com/aaryamanmodi353-rgb/Entreskill-hub.git
cd Entreskill-hub
Setup Backend:

Bash
cd server
npm install
Create a .env file in the server folder:

Code snippet
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
PORT=5000
Setup Frontend:

Bash
cd ../client
npm install
npm run dev
📈 Future Roadmap
[ ] Integration of real-time peer-to-peer video calls for Mentors.

[ ] Blockchain-based "Founder Certificates" for leveling up.

[ ] AI-generated personalized pitch decks based on session history.

👤 Author
Aaryaman Modi

Full-Stack Developer & AI Enthusiast.

Creator of projects like AI Personal Memory Assistant and Rent Mojo.
