import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    // 1. Initialize with DEFAULT DATA (The 12 Ideas)
    const defaultIdeas = [
        {
          _id: "1",
          title: "AI Automation Agency",
          category: "Developer",
          difficulty: "Advanced",
          description: "Build automated workflows for small businesses using tools like Zapier and Python scripts.",
          requiredSkills: ["Python", "API Integration", "Sales"],
          estimatedCost: "₹5,000 - ₹20,000"
        },
        {
          _id: "2",
          title: "Smart Home Installer",
          category: "Technician",
          difficulty: "Intermediate",
          description: "Setup and configure smart devices (Alexa, CCTV, smart bulbs) for residential clients.",
          requiredSkills: ["Networking", "IoT", "Electrical"],
          estimatedCost: "₹15,000 - ₹50,000"
        },
        {
          _id: "3",
          title: "Digital Marketing Consultant",
          category: "Marketer",
          difficulty: "Intermediate",
          description: "Manage social media ads and SEO for local brands to help them grow.",
          requiredSkills: ["SEO", "Content Writing", "Analytics"],
          estimatedCost: "₹0 - ₹10,000"
        },
        {
          _id: "4",
          title: "Custom App Development",
          category: "Full Stack Dev",
          difficulty: "Expert",
          description: "Build custom web and mobile applications for startups and enterprises.",
          requiredSkills: ["React", "Node.js", "MongoDB"],
          estimatedCost: "₹0 - ₹50,000"
        },
        {
          _id: "5",
          title: "Cloud Kitchen / Tiffin Service",
          category: "Chef",
          difficulty: "Beginner",
          description: "Prepare healthy home-cooked meals and deliver them to office goers.",
          requiredSkills: ["Cooking", "Logistics", "Management"],
          estimatedCost: "₹30,000 - ₹100,000"
        },
        {
          _id: "6",
          title: "Freelance Graphic Designer",
          category: "Designer",
          difficulty: "Intermediate",
          description: "Create logos, branding kits, and social media posts for companies.",
          requiredSkills: ["Photoshop", "Canva", "Creativity"],
          estimatedCost: "₹0 - ₹20,000"
        },
        {
          _id: "7",
          title: "Tech Repair Shop",
          category: "Technician",
          difficulty: "Intermediate",
          description: "Repair smartphones, laptops, and gaming consoles for local customers.",
          requiredSkills: ["Hardware Repair", "Electronics", "Sourcing"],
          estimatedCost: "₹50,000 - ₹150,000"
        },
        {
          _id: "8",
          title: "Online Tutoring Platform",
          category: "Educator",
          difficulty: "Beginner",
          description: "Teach coding, math, or languages to students via Zoom or Google Meet.",
          requiredSkills: ["Teaching", "Communication", "Subject Expert"],
          estimatedCost: "₹0 - ₹5,000"
        },
        {
          _id: "9",
          title: "E-Commerce Reselling",
          category: "Merchant",
          difficulty: "Beginner",
          description: "Source unique products and sell them on Amazon, Flipkart, or Instagram.",
          requiredSkills: ["Product Sourcing", "Digital Marketing", "Sales"],
          estimatedCost: "₹20,000 - ₹80,000"
        },
        {
          _id: "10",
          title: "Event Planner",
          category: "Organizer",
          difficulty: "Intermediate",
          description: "Plan and organize birthdays, weddings, or corporate workshops.",
          requiredSkills: ["Management", "Networking", "Negotiation"],
          estimatedCost: "₹10,000 - ₹50,000"
        },
        {
          _id: "11",
          title: "Book Shop & Library",
          category: "Librarian",
          difficulty: "Beginner",
          description: "Start a niche bookstore with a reading area and lending library service.",
          requiredSkills: ["Librarian", "Management", "Community"],
          estimatedCost: "₹50,000 - ₹200,000"
        },
        {
          _id: "12",
          title: "Cybersecurity Auditor",
          category: "Security Analyst",
          difficulty: "Expert",
          description: "Audit small business websites for vulnerabilities and fix security loopholes.",
          requiredSkills: ["Ethical Hacking", "Networking", "Linux"],
          estimatedCost: "₹5,000 - ₹25,000"
        }
    ];

    const [ideas, setIdeas] = useState(defaultIdeas);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) setUser(userInfo);

        const fetchIdeas = async () => {
            try {
                // Fetch from your Live Render Backend
                const response = await axios.get('https://entreskill-hub.onrender.com/api/ideas');
                
                const data = Array.isArray(response.data) ? response.data : response.data.data || [];
                
                // --- THE FIX IS HERE ---
                // Only use DB data if you have MORE than 5 ideas. 
                // Otherwise, keep the 12 default ones for a better look.
                if (data.length > 5) {
                    setIdeas(data); 
                } else {
                    console.log("Database has too few items. Keeping default 12 ideas for display.");
                }
                
            } catch (error) {
                console.log('Using default ideas (Backend offline or error)');
            }
        };
        fetchIdeas();
    }, []);

    const filteredIdeas = ideas.filter(idea => 
        idea.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="min-h-screen bg-slate-950 bg-fixed bg-cover bg-center pt-12 pb-24 px-6"
            style={{
                backgroundImage: "linear-gradient(rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 0.8)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')"
            }}
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10">
                
                {/* LEFT SIDEBAR */}
                <aside className="lg:w-80 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
                    
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Quick Search</h4>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Find ideas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <span className="absolute right-4 top-3.5 opacity-30 text-white">🔍</span>
                        </div>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl group relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                        
                        {/* Founder Status */}
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Founder Status</h4>
                            {user?.title === 'Expert Mentor' && (
                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <span>🛡️</span> Expert
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg ${
                                user?.title === 'Expert Mentor' 
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20' 
                                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                            }`}>
                                {user?.level || 1}
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg leading-tight">{user?.title || "Ideator"}</p>
                                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-0.5">Level Progression</p>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                <span>XP: {user?.xp || 0}</span>
                                <span>Next: {((user?.level || 1) * 500)}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                <div 
                                    className={`h-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.3)] ${
                                        user?.title === 'Expert Mentor' 
                                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500' 
                                        : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                                    }`}
                                    style={{ width: `${((user?.xp % 500) / 500) * 100 || 10}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Your Dashboard</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-medium">Technical Skills</span>
                                <span className="text-xs font-bold text-blue-400">{user?.skills?.length || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-medium">Recommended</span>
                                <span className="text-xs font-bold text-emerald-400">
                                    {ideas.filter(i => i.requiredSkills.some(s => user?.skills?.includes(s))).length} Ideas
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1">
                    <header className="mb-12 text-left">
                        <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
                            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Business Ideas</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                            Intelligent opportunities generated for **{user?.name}** based on your technical stack.
                        </p>
                    </header>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {filteredIdeas.map((idea) => {
                                const matchCount = idea.requiredSkills.filter(skill =>
                                    user?.skills?.includes(skill)
                                ).length;

                                return (
                                    <div key={idea._id} className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 shadow-2xl overflow-hidden flex flex-col">
                                        <div className="p-8 flex-grow">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                                                    💡
                                                </div>
                                                {matchCount > 0 && (
                                                    <div className="bg-green-500/10 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full border border-green-500/20 tracking-widest uppercase">
                                                        Match Detected
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{idea.title}</h3>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                                {idea.category} • {idea.difficulty}
                                            </p>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-8">{idea.description}</p>

                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Required Expertise</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {idea.requiredSkills.map((skill, index) => (
                                                        <span key={index} className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all duration-300 ${user?.skills?.includes(skill)
                                                            ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                                            : 'bg-slate-900 border-slate-800 text-slate-500'
                                                        }`}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 pt-0 mt-auto">
                                            <div className="flex items-end justify-between pt-6 border-t border-white/5">
                                                <div className="flex flex-col">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Entry Capital</p>
                                                    <span className="text-lg font-bold text-emerald-400 leading-none">{idea.estimatedCost}</span>
                                                </div>
                                                <Link
                                                    to={`/roadmap/${idea._id}`}
                                                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                                                >
                                                    Analyze Roadmap
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;