import { useState, useEffect } from 'react';

const ResourcesHub = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // 1. Initialize with your existing data + state
  const [resources, setResources] = useState([
    { 
      id: 1,
      title: "Business Registration 101", 
      type: "Article", 
      duration: "5 min read",
      url: "https://www.startupindia.gov.in/content/sih/en/startup-scheme.html",
      addedBy: "Admin"
    },
    { 
      id: 2,
      title: "Finding Your First Customer", 
      type: "Video", 
      duration: "12 min",
      url: "https://www.youtube.com", 
      addedBy: "Mentor Rohit"
    },
    { 
      id: 3,
      title: "Basic Financial Management", 
      type: "Checklist", 
      duration: "8 items",
      url: "https://www.investopedia.com/articles/basics/06/invest1000.asp",
      addedBy: "Expert Sarah"
    }
  ]);

  const [newRes, setNewRes] = useState({ title: '', type: 'Article', duration: '', url: '' });

  // 2. Check User Role on Load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(user);
  }, []);

  // 3. Handle Adding New Resource
  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newRes.title || !newRes.url) return;

    const resource = {
        id: resources.length + 1,
        ...newRes,
        addedBy: userInfo.name || "Mentor"
    };
    
    setResources([resource, ...resources]); // Add to top
    setShowForm(false);
    setNewRes({ title: '', type: 'Article', duration: '', url: '' }); // Reset
  };

  return (
    <div className="w-full mt-10">
      
      {/* --- CONTROLS: Only Visible to Mentors/Admins --- */}
      {userInfo && (userInfo.title === 'Expert Mentor' || userInfo.isAdmin) && (
        <div className="flex justify-end mb-8">
            <button 
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
                {showForm ? 'Cancel Upload' : '+ Upload New Material'}
            </button>
        </div>
      )}

      {/* --- UPLOAD FORM (Conditional) --- */}
      {showForm && (
          <div className="bg-slate-900/80 border border-blue-500/30 p-8 rounded-[2rem] mb-12 animate-in slide-in-from-top-4 fade-in backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-6">📤 Add Resource</h3>
              <form onSubmit={handleAddResource} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                      <input 
                          required
                          type="text" 
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                          placeholder="Resource Title"
                          value={newRes.title}
                          onChange={(e) => setNewRes({...newRes, title: e.target.value})}
                      />
                  </div>
                  <div>
                      <input 
                          required
                          type="url" 
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                          placeholder="Link URL (https://...)"
                          value={newRes.url}
                          onChange={(e) => setNewRes({...newRes, url: e.target.value})}
                      />
                  </div>
                  <div className="flex gap-4">
                      <select 
                          className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                          value={newRes.type}
                          onChange={(e) => setNewRes({...newRes, type: e.target.value})}
                      >
                          <option>Article</option>
                          <option>Video</option>
                          <option>Checklist</option>
                          <option>PDF</option>
                      </select>
                      <input 
                          type="text" 
                          className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                          placeholder="Duration (e.g. 10 min)"
                          value={newRes.duration}
                          onChange={(e) => setNewRes({...newRes, duration: e.target.value})}
                      />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                      <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-xl transition-colors">
                          Publish to Hub
                      </button>
                  </div>
              </form>
          </div>
      )}

      {/* --- GRID (Using Your Design) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <div key={index} className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group flex flex-col justify-between h-full min-h-[250px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                  {item.type}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {item.duration}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                {item.title}
              </h4>
              {item.addedBy && (
                  <p className="text-xs text-slate-600 mb-8">Added by {item.addedBy}</p>
              )}
            </div>
            
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-black text-slate-500 group-hover:text-white transition-colors uppercase tracking-widest text-left flex items-center gap-2"
            >
              Access Material <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesHub;