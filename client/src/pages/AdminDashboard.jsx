import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ... (Keep SuccessModal and ErrorModal exactly as they are) ...
const SuccessModal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className="bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative overflow-hidden animate-fade-in-up">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">System Success</h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20 active:scale-95">Return to Console</button>
      </div>
    </div>
  </div>
);

const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className="bg-slate-900 border border-red-500/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative overflow-hidden animate-shake">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Deployment Failed</h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed break-words w-full">{message}</p>
        <button onClick={onClose} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-xl transition-all uppercase tracking-widest text-xs active:scale-95">Close & Retry</button>
      </div>
    </div>
  </div>
);

// ... (Keep data chart constant) ...
const data = [
  { name: 'Jan', users: 2, ideas: 1 },
  { name: 'Feb', users: 5, ideas: 2 },
  { name: 'Mar', users: 8, ideas: 4 },
  { name: 'Apr', users: 15, ideas: 6 },
  { name: 'May', users: 25, ideas: 12 },
  { name: 'Jun', users: 45, ideas: 18 },
  { name: 'Jul', users: 80, ideas: 25 },
];

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState('ideas');
  const [ideas, setIdeas] = useState([]); 
  const [users, setUsers] = useState([]); 
  const [modalStatus, setModalStatus] = useState({ type: null, message: '' });

  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mentorDetails, setMentorDetails] = useState({ expertise: '', bio: '', experienceYears: '' });

  const [ideaFormData, setIdeaFormData] = useState({ 
    title: '', estimatedCost: '', category: '', requiredSkills: '' 
  });
  const [selectedIdea, setSelectedIdea] = useState(''); 
  const [steps, setSteps] = useState([{ title: '', category: 'Legal', description: '' }]);

  // FETCH DATA
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const fetchData = async () => {
      try {
        const ideasRes = await axios.get('http://localhost:5000/api/ideas');
        setIdeas(ideasRes.data);
        if (activeTab === 'users' || activeTab === 'analytics') {
          const usersRes = await axios.get('http://localhost:5000/api/users', config);
          setUsers(usersRes.data);
        }
      } catch (err) { console.error("Fetch Error:", err); }
    };
    fetchData();
  }, [activeTab, modalStatus]); // Refresh data when modalStatus changes (after promotion)

  // PROMOTION HANDLER
  const handlePromote = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const payload = {
        userId: selectedUser._id,
        expertise: mentorDetails.expertise.split(',').map(s => s.trim()),
        bio: mentorDetails.bio,
        experienceYears: Number(mentorDetails.experienceYears)
      };
      
      await axios.post('http://localhost:5000/api/mentors/promote', payload, config);
      
      setModalStatus({ type: 'success', message: `${selectedUser.name} has been promoted to Expert Mentor!` });
      setShowPromoteModal(false);
      setMentorDetails({ expertise: '', bio: '', experienceYears: '' });
      
    } catch (err) {
      setModalStatus({ type: 'error', message: err.response?.data?.message || "Promotion failed" });
    }
  };

  // ... (Keep handleIdeaCuration, removeMilestone, addMilestone, handleStepChange, handleRoadmapSubmit exactly as they are) ...
  const handleIdeaCuration = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    const formattedData = { ...ideaFormData, requiredSkills: ideaFormData.requiredSkills.split(',').map(s => s.trim()) };
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.post('http://localhost:5000/api/ideas', formattedData, config);
      setModalStatus({ type: 'success', message: 'New Business Idea Deployed to Registry!' });
      setIdeaFormData({ title: '', estimatedCost: '', category: '', requiredSkills: '' });
    } catch (err) { setModalStatus({ type: 'error', message: err.response?.data?.message || "Idea Curation Failed" }); }
  };

  const removeMilestone = (indexToRemove) => {
    if (steps.length === 1) { setModalStatus({ type: 'error', message: "A roadmap must have at least one milestone." }); return; }
    setSteps(steps.filter((_, index) => index !== indexToRemove));
  };
  const addMilestone = () => setSteps([...steps, { title: '', category: 'Legal', description: '' }]);
  const handleStepChange = (index, field, value) => { const newSteps = [...steps]; newSteps[index][field] = value; setSteps(newSteps); };

  const handleRoadmapSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIdea) { setModalStatus({ type: 'error', message: "Please select a Business Idea from the dropdown first." }); return; }
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      const payload = { ideaId: selectedIdea, title: "Official Venture Roadmap", steps: steps };
      await axios.post('http://localhost:5000/api/roadmaps', payload, config);
      setModalStatus({ type: 'success', message: 'Structured Roadmap Successfully Deployed!' });
      setSteps([{ title: '', category: 'Legal', description: '' }]);
      setSelectedIdea('');
    } catch (err) { setModalStatus({ type: 'error', message: err.response?.data?.message || err.message }); }
  };


  return (
    <div className="min-h-screen bg-slate-950 pt-12 pb-24 px-10 relative">
      {modalStatus.type === 'success' && <SuccessModal message={modalStatus.message} onClose={() => setModalStatus({ type: null, message: '' })} />}
      {modalStatus.type === 'error' && <ErrorModal message={modalStatus.message} onClose={() => setModalStatus({ type: null, message: '' })} />}

      {/* PROMOTION MODAL */}
      {showPromoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <form onSubmit={handlePromote} className="bg-slate-900 border border-blue-500/30 p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
            <h3 className="text-2xl font-black text-white mb-2">Promote to <span className="text-blue-400">Mentor</span></h3>
            <p className="text-slate-500 text-[10px] mb-8 uppercase tracking-[0.2em] font-black">Subject: {selectedUser.name}</p>
            
            <div className="space-y-4 mb-8">
                <input className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" 
                    placeholder="Expertise (e.g. Marketing, Legal)" value={mentorDetails.expertise} onChange={(e) => setMentorDetails({...mentorDetails, expertise: e.target.value})} required />
                <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 transition-colors" 
                    placeholder="Years of Experience" value={mentorDetails.experienceYears} onChange={(e) => setMentorDetails({...mentorDetails, experienceYears: e.target.value})} required />
                <textarea className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none h-32 focus:border-blue-500 transition-colors" 
                    placeholder="Professional Biography" value={mentorDetails.bio} onChange={(e) => setMentorDetails({...mentorDetails, bio: e.target.value})} required />
            </div>

            <div className="flex gap-4">
                <button type="button" onClick={() => setShowPromoteModal(false)} className="flex-1 py-4 bg-white/5 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Confirm Promotion</button>
            </div>
            </form>
        </div>
      )}

      {/* DASHBOARD CONTENT */}
      <div className="w-full flex flex-col gap-10">
        <header className="flex justify-between items-end">
          <div>
            <h2 className="text-5xl font-extrabold text-white tracking-tight mb-2">System <span className="text-blue-400">Control</span></h2>
            <p className="text-slate-400 font-medium">Platform oversight and venture curation.</p>
          </div>
          <div className="flex gap-4">
            {['ideas', 'roadmaps', 'users', 'analytics'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          <main className="flex-1">
            {activeTab === 'ideas' && (
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Curate Business Ideas</h3>
                <form onSubmit={handleIdeaCuration} className="grid grid-cols-2 gap-6">
                  <input className="col-span-2 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none" placeholder="Idea Title" value={ideaFormData.title} onChange={(e) => setIdeaFormData({...ideaFormData, title: e.target.value})} />
                  <input className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none" placeholder="Capital (₹)" value={ideaFormData.estimatedCost} onChange={(e) => setIdeaFormData({...ideaFormData, estimatedCost: e.target.value})} />
                  <input className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none" placeholder="Category" value={ideaFormData.category} onChange={(e) => setIdeaFormData({...ideaFormData, category: e.target.value})} />
                  <input className="col-span-2 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none" placeholder="Required Skills (comma-separated)" value={ideaFormData.requiredSkills} onChange={(e) => setIdeaFormData({...ideaFormData, requiredSkills: e.target.value})} />
                  <button className="col-span-2 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black text-white transition-all uppercase tracking-widest shadow-lg shadow-blue-500/20">Deploy Registry Entry</button>
                </form>
              </div>
            )}
            
            {/* ROADMAPS TAB (Kept same) */}
            {activeTab === 'roadmaps' && (
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Venture Roadmap Curator</h3>
                <form onSubmit={handleRoadmapSubmit} className="space-y-8">
                  <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500 transition-colors" value={selectedIdea} onChange={(e) => setSelectedIdea(e.target.value)} required>
                    <option value="">Select Business Idea to Map...</option>
                    {ideas.map(i => <option key={i._id} value={i._id}>{i.title}</option>)}
                  </select>
                  <div className="space-y-4">
                    {steps.map((step, idx) => (
                      <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4 relative group">
                        <button type="button" onClick={() => removeMilestone(idx)} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-slate-500 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all duration-200 opacity-0 group-hover:opacity-100" title="Remove Milestone">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                        <div className="flex justify-between items-center pr-8"> 
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Milestone {idx + 1}</span>
                          <select className="bg-slate-950 text-[10px] text-white border border-white/10 rounded px-2" value={step.category} onChange={(e) => handleStepChange(idx, 'category', e.target.value)}>
                            <option>Legal</option><option>Financial</option><option>Marketing</option><option>Operations</option>
                          </select>
                        </div>
                        <input className="w-full bg-transparent border-b border-white/10 p-2 text-white font-bold outline-none" placeholder="Step Title" value={step.title} onChange={(e) => handleStepChange(idx, 'title', e.target.value)} />
                        <textarea className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-sm text-slate-400 outline-none" placeholder="Step Description" value={step.description} onChange={(e) => handleStepChange(idx, 'description', e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={addMilestone} className="flex-1 border border-white/10 py-4 rounded-xl font-black text-slate-400 hover:bg-white/5 transition-all text-xs uppercase tracking-widest">+ Add Step</button>
                    <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-black text-white transition-all text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20">Deploy Roadmap</button>
                  </div>
                </form>
              </div>
            )}

            {/* --- USER REGISTRY (FIXED) --- */}
            {activeTab === 'users' && (
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight">User Registry</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-xs border-b border-white/10">
                        <th className="p-4 font-black uppercase tracking-widest">Name</th>
                        <th className="p-4 font-black uppercase tracking-widest">Email</th>
                        <th className="p-4 font-black uppercase tracking-widest">Role</th>
                        <th className="p-4 font-black uppercase tracking-widest">Joined</th>
                        <th className="p-4 font-black uppercase tracking-widest text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-slate-300">
                      {users.map(user => {
                        // --- NEW LOGIC: Check title OR admin status ---
                        const isMentor = user.title === 'Expert Mentor';
                        const isAdmin = user.isAdmin;
                        
                        return (
                          <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-white flex items-center gap-2">
                                {user.name}
                                {isMentor && <span title="Verified Mentor">🛡️</span>}
                            </td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                              {/* --- ROLE BADGE LOGIC --- */}
                              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                                isAdmin ? 'bg-purple-500/20 text-purple-400' : 
                                isMentor ? 'bg-emerald-500/20 text-emerald-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {isAdmin ? 'Admin' : isMentor ? 'Mentor' : 'Founder'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-center">
                              {!isMentor && !isAdmin && (
                                <button 
                                    onClick={() => { setSelectedUser(user); setShowPromoteModal(true); }}
                                    className="px-4 py-1.5 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                                >
                                    Promote to Mentor
                                </button>
                              )}
                              {isMentor && (
                                <span className="text-xs text-emerald-500 font-bold">✓ Active</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Users', value: users.length, color: 'blue' },
                  { label: 'Active Ideas', value: ideas.length, color: 'emerald' },
                  { label: 'System Admins', value: users.filter(u => u.isAdmin).length, color: 'purple' }
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-white/[0.03] backdrop-blur-3xl border border-${stat.color}-500/30 p-8 rounded-[2rem] relative overflow-hidden group`}>
                     <div className={`absolute top-0 right-0 p-32 bg-${stat.color}-500/10 blur-[60px] rounded-full -mr-16 -mt-16 transition-all group-hover:bg-${stat.color}-500/20`}></div>
                     <h4 className={`text-${stat.color}-400 text-xs font-black uppercase tracking-widest mb-2`}>{stat.label}</h4>
                     <p className="text-5xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
                
                <div className="col-span-1 md:col-span-3 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] mt-4 h-96">
                    <h3 className="text-xl font-bold text-white mb-6 ml-4">Platform Growth</h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorIdeas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                        <Area type="monotone" dataKey="ideas" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIdeas)" />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;