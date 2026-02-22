import { useState, useEffect } from 'react';
import axios from 'axios';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/mentors');
        setMentors(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch experts:", err);
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-24 px-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h2 className="text-5xl font-black text-white tracking-tight mb-4">Expert <span className="text-blue-400">Registry</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">Connect with industry veterans to accelerate your startup journey.</p>
        </header>

        {loading ? (
          <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map(mentor => (
              <div key={mentor._id} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-500 group">
                <div className="flex items-center gap-5 mb-8">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                    {mentor.user?.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{mentor.user?.name}</h3>
                    <p className="text-blue-300/60 text-[10px] font-black uppercase tracking-widest">{mentor.experienceYears}+ Years Exp</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.expertise.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-[10px] font-bold uppercase">{skill}</span>
                  ))}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-10 line-clamp-3">{mentor.bio}</p>

                <button className="w-full py-4 bg-white text-slate-950 hover:bg-blue-500 hover:text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] active:scale-95">Request Guidance</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;