import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Profile from './pages/Profile';
import Admindashboard from './pages/AdminDashboard';
import Resources from './pages/Resources';
import SessionRoom from './pages/SessionRoom';
import MentorConsole from './pages/MentorConsole';
import Navbar from './components/Navbar';
import StudentAI from './components/StudentAI'; // --- 1. IMPORT ADDED ---

// Protected Route Component for Admin Access
const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  // Updated check: Verify isAdmin boolean OR role string (covers both database versions)
  if (!userInfo || (!userInfo.isAdmin && userInfo.role !== 'Admin')) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Navbar /> 
      {/* Main Content Area */}
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} /> 
          <Route path="/resources" element={<Resources />} />
          
          {/* Mentor Routes */}
          <Route path="/mentor-console" element={<MentorConsole />} />
          <Route path="/session/:id" element={<SessionRoom />} />
          
          {/* Authenticated User Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/roadmap/:ideaId" element={<Roadmap />} />

          {/* Secure Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admindashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {/* --- 2. COMPONENT ADDED HERE --- */}
      {/* This sits outside <main> so it floats on top of everything */}
      <StudentAI />

    </Router>
  );
}

export default App;