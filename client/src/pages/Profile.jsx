import { useState, useEffect } from 'react';
import axios from 'axios';

// --- COMPONENT: Success Modal (Blue/Glass) ---
const SuccessModal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
    <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/20">
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Sync Complete</h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-4 bg-white text-slate-950 hover:bg-blue-500 hover:text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] active:scale-95 shadow-lg">Return to Console</button>
      </div>
    </div>
  </div>
);

// --- COMPONENT: Error Modal (Red/Glass) ---
const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
    <div className="bg-slate-900 border border-red-500/30 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative overflow-hidden animate-in fade-in duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Sync Failed</h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] active:scale-95">Retry Sync</button>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  
  // Modal States
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
      setName(userInfo.name);
      setSkills(userInfo.skills?.join(', ') || '');
    }
  }, []);

  const handleSave = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo?.token) {
        setShowError("Session expired. Please log in again.");
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const updatedSkills = skills.split(',').map(s => s.trim()).filter(s => s !== "");
      
      // --- UPDATE: Use Render URL instead of Localhost ---
      const { data } = await axios.put(
        'https://entreskill-hub.onrender.com/api/users/profile',
        { name, skills: updatedSkills },
        config
      );

      // Update Local Storage to sync XP/Level across the app
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setIsEditing(false);
      setShowSuccess(true);
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
      setShowError(err.response?.data?.message || 'Platform synchronization failed.');
    }
  };

  if (!user) return null;

  const isMentor = user.title === 'Expert Mentor';

  return (
    <div 
      className="min-h-screen bg-slate-950 bg-fixed bg-cover bg-center flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundImage: "linear-gradient(rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.9)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')" }}
    >
      {/* Modals */}
      {showSuccess && <SuccessModal message="Profile and Founder Status synchronized!" onClose={() => setShowSuccess(false)} />}
      {showError && <ErrorModal message={showError} onClose={() => setShowError(null)} />}

      <div className={`w-full max-w-2xl bg-white/[0.03] backdrop-blur-3xl border rounded-[2.5rem] shadow-2xl p-10 md:p-16 relative overflow-hidden transition-all duration-500 ${isMentor ? 'border-emerald-500/20' : 'border-white/10'}`}>
        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] ${isMentor ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`}></div>
        
        <div className="relative z-10">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className={`h-20 w-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl ${
                isMentor 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20' 
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20'
              }`}>
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight">My Profile</h2>
                <div className="flex items-center gap-2 mt-1">
                    <p className={`${isMentor ? 'text-emerald-400' : 'text-blue-400'} font-bold text-[10px] uppercase tracking-[0.2em]`}>
                        {isMentor ? 'Expert Identity' : 'Technical Identity'}
                    </p>
                    {isMentor && <span className="text-xs">🛡️</span>}
                </div>
              </div>
            </div>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-8 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 shadow-lg ${
                isEditing 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-white text-slate-950 hover:bg-blue-400 hover:text-white'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </header>

          <div className="space-y-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Full Name</label>
              {isEditing ? (
                <input 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              ) : (
                <p className="text-xl font-bold text-white tracking-tight px-1">{user.name}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Expertise Stack</label>
              {isEditing ? (
                <input 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                  placeholder="e.g. Python, Java, Management"
                  value={skills} 
                  onChange={(e) => setSkills(e.target.value)} 
                />
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {user.skills?.map(skill => (
                    <span key={skill} className={`border px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${
                        isMentor 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                    }`}>
                      {skill}
                    </span>
                  )) || <p className="text-slate-500 italic text-sm">No technical skills added yet.</p>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {isMentor ? 'Expertise Level' : 'Current Level'}
                </label>
                <p className="text-white font-black text-2xl">{user.level || 1}</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {isMentor ? 'System Role' : 'Founder Title'}
                </label>
                <p className={`${isMentor ? 'text-emerald-400' : 'text-blue-400'} font-bold`}>
                    {user.title || "Ideator"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;