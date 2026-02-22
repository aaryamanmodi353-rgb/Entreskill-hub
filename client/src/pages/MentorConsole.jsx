import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MentorConsole = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'resolved'

  // --- 1. MOCK DATA GENERATOR ---
  const initialRequests = [
    { id: "1", student: "Rahul Verma", topic: "AI Automation Agency", query: "How do I price my automation services for real estate agents?", status: "Pending", time: "10 mins ago", type: "Business" },
    { id: "2", student: "Sneha G.", topic: "Smart Home Installation", query: "I need help sourcing Sonoff switches in bulk. Which vendor is best?", status: "Pending", time: "25 mins ago", type: "Technical" },
    { id: "4", student: "Amit K.", topic: "App Development", query: "My React Native build is failing on Android Studio. Error code 503.", status: "Pending", time: "1 hour ago", type: "Code" },
    { id: "3", student: "Priya S.", topic: "Digital Marketing", query: "Facebook Ads manager account got restricted. How to appeal?", status: "Pending", time: "2 hours ago", type: "Marketing" },
  ];

  // --- 2. LOAD & SYNC WITH LOCAL STORAGE ---
  useEffect(() => {
    // Check if we already have data
    const existingData = localStorage.getItem('mentorRequests');
    
    if (existingData) {
      setRequests(JSON.parse(existingData));
    } else {
      // First login: "Pop up" new doubts
      localStorage.setItem('mentorRequests', JSON.stringify(initialRequests));
      setRequests(initialRequests);
    }
  }, []);

  // Filter lists
  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const resolvedRequests = requests.filter(r => r.status === 'Resolved');

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
            <div>
                <h1 className="text-4xl font-extrabold text-white mb-2">Mentor <span className="text-emerald-400">Console</span></h1>
                <p className="text-slate-400">Manage incoming doubts and track your impact.</p>
            </div>
            
            {/* TABS */}
            <div className="bg-slate-900 p-1 rounded-xl flex gap-2 border border-white/10">
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pending' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Active Doubts ({pendingRequests.length})
                </button>
                <button 
                    onClick={() => setActiveTab('resolved')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'resolved' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Resolved ({resolvedRequests.length})
                </button>
            </div>
        </div>

        {/* REQUESTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {(activeTab === 'pending' ? pendingRequests : resolvedRequests).map((req) => (
                <div key={req.id} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                        {req.status === 'Pending' ? (
                            <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        ) : (
                            <span className="text-emerald-400 text-xl">✓</span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                            {req.type}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 ml-3 uppercase tracking-widest">
                            {req.time}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{req.student}</h3>
                    <p className="text-xs text-slate-400 mb-4 uppercase font-bold tracking-wider">{req.topic}</p>
                    
                    <div className="bg-slate-900/50 p-4 rounded-xl mb-6 border border-white/5 min-h-[80px]">
                        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                            "{req.query}"
                        </p>
                    </div>

                    {/* ACTION BUTTON */}
                    {activeTab === 'pending' ? (
                        <Link 
                            to={`/session/${req.id}`}
                            className="w-full block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            Accept Session
                        </Link>
                    ) : (
                        <button disabled className="w-full bg-slate-800 text-slate-500 font-bold py-3 rounded-xl cursor-not-allowed">
                            Session Closed
                        </button>
                    )}
                </div>
            ))}

            {/* Empty State */}
            {activeTab === 'pending' && pendingRequests.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                    <p className="text-slate-500 text-lg">🎉 All caught up! No active doubts.</p>
                    <button 
                        onClick={() => {
                            localStorage.removeItem('mentorRequests'); 
                            window.location.reload();
                        }}
                        className="mt-4 text-blue-400 text-sm font-bold hover:underline"
                    >
                        (Demo: Reset New Doubts)
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MentorConsole;