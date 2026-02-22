import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Roadmap = () => {
  const { ideaId } = useParams();
  const [roadmap, setRoadmap] = useState(null);

  // --- DATABASE OF ROADMAPS & MENTORS ---
  const roadmapData = {
    "1": {
      title: "AI Automation Agency",
      description: "Build a high-margin agency automating workflows for businesses using Zapier, Make, and Python.",
      mentor: { name: "Rohan Das", role: "AI Systems Architect", expertise: "Python & Automation", img: "👨‍💻" },
      steps: [
        { title: "Skill Acquisition", desc: "Master Zapier, Make.com, and basic Python scripting for APIs." },
        { title: "Niche Selection", desc: "Choose a target (e.g., Real Estate agents) to solve specific problems." },
        { title: "Build 'The Hook'", desc: "Create a free automated tool as a lead magnet." },
        { title: "Cold Outreach", desc: "Send 50 personalized DMs daily offering the free tool." }
      ]
    },
    "2": {
      title: "Smart Home Installer",
      description: "Become the go-to expert for installing Alexa, CCTV, and Smart Lighting in your city.",
      mentor: { name: "Suresh Tech", role: "IoT Specialist", expertise: "Hardware & Networking", img: "🔌" },
      steps: [
        { title: "Technical Training", desc: "Learn to configure Alexa, Google Home, and Sonoff switches." },
        { title: "Vendor Partners", desc: "Connect with local hardware shops for wholesale rates." },
        { title: "Service Menu", desc: "Create packages: 'Basic Security' (₹5k), 'Full Automation' (₹25k)." },
        { title: "Launch", desc: "Offer free installation for 3 influential homes to get referrals." }
      ]
    },
    "3": {
      title: "Digital Marketing Consultant",
      description: "Help local businesses grow their revenue through targeted Ads and SEO.",
      mentor: { name: "Sarah Lee", role: "Growth Hacker", expertise: "Ads & SEO Strategy", img: "📈" },
      steps: [
        { title: "Portfolio Building", desc: "Run ads for a friend's business to show results." },
        { title: "Certification", desc: "Complete Google Ads and Meta Blueprint free certifications." },
        { title: "Free Audit Strategy", desc: "Offer 'Free Marketing Audits' to local gyms and cafes." },
        { title: "Client Onboarding", desc: "Sign your first client for ₹15k/month." }
      ]
    },
    "4": {
      title: "Custom App Development",
      description: "A premium service building specialized software for funded startups.",
      mentor: { name: "Amit Verma", role: "Full Stack Lead", expertise: "MERN & React Native", img: "💻" },
      steps: [
        { title: "Niche Down", desc: "Don't be a generalist. Be 'The React Native Expert for Fintech'." },
        { title: "GitHub Portfolio", desc: "Build 3 complex clones (e.g., Uber, Swiggy) to prove expertise." },
        { title: "Upwork Profile", desc: "Optimize freelance profiles with your niche case studies." },
        { title: "Agency Website", desc: "Launch a professional site showcasing your Process." }
      ]
    },
    "5": {
      title: "Cloud Kitchen / Tiffin",
      description: "Low-investment food business focusing on delivery-only meals.",
      mentor: { name: "Chef Priya", role: "Culinary Consultant", expertise: "Food Costing & Menu", img: "🍳" },
      steps: [
        { title: "Legal & Safety", desc: "Get FSSAI Registration and Fire Safety clearance." },
        { title: "Menu Engineering", desc: "Create a focused menu with high profit margins." },
        { title: "Aggregator Listing", desc: "Partner with Zomato/Swiggy and set up professional photos." },
        { title: "Packaging", desc: "Design spill-proof, branded packaging." }
      ]
    },
    "6": {
      title: "Freelance Graphic Designer",
      description: "Visual branding services for content creators and brands.",
      mentor: { name: "Arjun K.", role: "Creative Director", expertise: "Branding & UI/UX", img: "🎨" },
      steps: [
        { title: "Tool Mastery", desc: "Go beyond Canva. Master Photoshop and Illustrator." },
        { title: "Behance Profile", desc: "Upload 5 high-quality case studies (Logo, Social Kit)." },
        { title: "Social Presence", desc: "Post 'Redesigns' of famous brands on Instagram." },
        { title: "Cold DM", desc: "Message YouTubers offering to upgrade their thumbnails." }
      ]
    },
    "7": {
      title: "Tech Repair Shop",
      description: "Local repair service for laptops, mobiles, and consoles.",
      mentor: { name: "Vikram Singh", role: "Hardware Engineer", expertise: "Chip-level Repair", img: "🛠️" },
      steps: [
        { title: "Workspace Setup", desc: "Rent a small kiosk or set up a home lab." },
        { title: "Part Sourcing", desc: "Find reliable suppliers for screens, batteries, and chips." },
        { title: "Google Maps", desc: "Get 20 reviews to rank on 'Repair near me'." },
        { title: "Walk-in Launch", desc: "Print flyers offering 'Free Screen Guard with every repair'." }
      ]
    },
    "8": {
      title: "Online Tutoring Platform",
      description: "Teach specialized skills or academics to a global audience.",
      mentor: { name: "Anjali Mehta", role: "EdTech Strategist", expertise: "Curriculum Design", img: "📚" },
      steps: [
        { title: "Curriculum Design", desc: "Create a 4-week structured course structure." },
        { title: "Tech Stack", desc: "Setup Zoom Pro, Pen Tablet, and OBS for high-quality streaming." },
        { title: "Demo Class", desc: "Run a free webinar to collect emails and demonstrate value." },
        { title: "First Cohort", desc: "Launch a paid batch with 5 students at a beta price." }
      ]
    },
    "9": {
      title: "E-Commerce Reselling",
      description: "Source unique products and sell via Shopify or Instagram.",
      mentor: { name: "Rajiv Jain", role: "E-com Specialist", expertise: "Sourcing & Logistics", img: "🛒" },
      steps: [
        { title: "Trend Spotting", desc: "Use Google Trends to find rising products." },
        { title: "Sourcing", desc: "Order samples from IndiaMART to check quality." },
        { title: "Store Setup", desc: "Build a Shopify store or a professional Instagram Shop." },
        { title: "Ads Launch", desc: "Run Facebook Ads targeting broad audiences." }
      ]
    },
    "10": {
      title: "Event Planner",
      description: "Organize memorable experiences for weddings or corporate teams.",
      mentor: { name: "Kavita Roy", role: "Event Manager", expertise: "Logistics & Decor", img: "🎉" },
      steps: [
        { title: "Vendor Network", desc: "Build a database of reliable decorators and caterers." },
        { title: "Portfolio Shoot", desc: "Organize a free mock event just to get professional photos." },
        { title: "Social Proof", desc: "Post 'Behind the Scenes' Reels showing your skills." },
        { title: "Packages", desc: "Create 'Birthday Package' (₹10k) and 'Corporate Retreat' (₹50k)." }
      ]
    },
    "11": {
      title: "Book Shop & Library",
      description: "A community-focused reading space and bookstore.",
      mentor: { name: "Mr. Nair", role: "Retail Veteran", expertise: "Inventory & Community", img: "📖" },
      steps: [
        { title: "Curation", desc: "Select a niche (e.g., 'Rare Comics') rather than general books." },
        { title: "Location", desc: "Find a quiet spot with low rent, or start online-first." },
        { title: "Membership Model", desc: "Launch a 'Lending Library' subscription for recurring revenue." },
        { title: "Events", desc: "Host weekly book clubs to bring footfall to the store." }
      ]
    },
    "12": {
      title: "Cybersecurity Auditor",
      description: "Protect small businesses from data breaches and hacks.",
      mentor: { name: "Cyber Sam", role: "Security Analyst", expertise: "Pen-Testing & Compliance", img: "🔐" },
      steps: [
        { title: "Certifications", desc: "Get CEH (Certified Ethical Hacker) or CompTIA Security+." },
        { title: "Audit Toolkit", desc: "Set up tools like Burp Suite and Nmap." },
        { title: "LinkedIn Outreach", desc: "Target CTOs of small fintechs offering a 'Preliminary Scan'." },
        { title: "Reporting", desc: "Create a professional 'Risk Assessment Report' template." }
      ]
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = roadmapData[ideaId] || roadmapData["1"]; // Default to 1 if not found
    setRoadmap(data);
  }, [ideaId]);

  if (!roadmap) return <div className="text-white p-20 text-center">Loading Roadmap...</div>;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 pb-12 relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT: ROADMAP CONTENT */}
            <div className="lg:col-span-2">
                <Link to="/" className="text-slate-500 hover:text-white flex items-center gap-2 mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
                    ← Back to Ideas
                </Link>

                <header className="mb-12">
                    <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2 block">
                        Execution Roadmap
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        {roadmap.title}
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed border-l-4 border-blue-500 pl-6">
                        {roadmap.description}
                    </p>
                </header>

                <div className="space-y-8 relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-800 hidden md:block"></div>

                    {roadmap.steps.map((step, index) => (
                        <div key={index} className="relative md:pl-16 group">
                            {/* Number Bubble */}
                            <div className="hidden md:flex absolute left-0 top-0 h-9 w-9 bg-slate-900 border border-slate-700 rounded-full items-center justify-center text-slate-500 font-bold text-sm z-10 group-hover:border-blue-500 group-hover:text-white transition-colors shadow-xl">
                                {index + 1}
                            </div>

                            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: MENTOR CARD (Sticky) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 p-8 rounded-3xl shadow-2xl text-center relative overflow-hidden group">
                    
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>

                    <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 block">
                            Recommended Mentor
                        </span>
                        
                        <div className="h-24 w-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-white/10 shadow-lg">
                            {roadmap.mentor.img}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-1">{roadmap.mentor.name}</h3>
                        <p className="text-slate-400 text-sm mb-6">{roadmap.mentor.role}</p>

                        <div className="bg-white/5 rounded-xl p-4 mb-8 text-left">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Specialization</p>
                            <p className="text-white text-sm font-medium">{roadmap.mentor.expertise}</p>
                        </div>

                        <Link 
                            to={`/session/${ideaId}`} 
                            className="w-full block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            Request Guidance
                        </Link>
                        
                        <p className="text-[10px] text-slate-500 mt-4">
                            Typically replies within 2 hours
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Roadmap;