import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SessionRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMentorMode, setIsMentorMode] = useState(false);
  
  // --- CONTEXT DATABASE (To give the AI context) ---
  const ideaDatabase = {
    "1": "AI Automation Agency",
    "2": "Smart Home Installation",
    "3": "Digital Marketing",
    "4": "App Development Agency",
    "5": "Cloud Kitchen",
    "6": "Graphic Design Freelancing",
    "7": "Tech Repair Shop",
    "8": "Online Tutoring",
    "9": "E-Commerce Reselling",
    "10": "Event Planning",
    "11": "Book Shop",
    "12": "Cybersecurity Audit"
  };

  const ideaTitle = ideaDatabase[id] || "Business Startup";

  // --- MENTOR PERSONAS (For Student View) ---
  const mentorDatabase = {
    "1": { name: "Rohan Das", role: "AI Systems Architect" },
    "2": { name: "Suresh Tech", role: "IoT Specialist" },
    "3": { name: "Sarah Lee", role: "Growth Hacker" },
    "4": { name: "Amit Verma", role: "Full Stack Lead" },
    "5": { name: "Chef Priya", role: "Culinary Consultant" },
    "6": { name: "Arjun K.", role: "Creative Director" },
    "7": { name: "Vikram Singh", role: "Hardware Engineer" },
    "8": { name: "Anjali Mehta", role: "EdTech Strategist" },
    "9": { name: "Rajiv Jain", role: "E-com Specialist" },
    "10": { name: "Kavita Roy", role: "Event Manager" },
    "11": { name: "Mr. Nair", role: "Retail Veteran" },
    "12": { name: "Cyber Sam", role: "Security Analyst" }
  };

  const assignedMentor = mentorDatabase[id] || { name: "Expert Mentor", role: "Business Guide" };

  // --- STATE ---
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // --- INITIALIZATION ---
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    // CHECK ROLE: Are you the Mentor or the Student?
    const isMentor = userInfo?.title === 'Expert Mentor' || userInfo?.isAdmin;
    setIsMentorMode(isMentor);

    // SET INITIAL MESSAGES BASED ON ROLE
    if (isMentor) {
        // SCENARIO A: You are the MENTOR. A Student asks YOU for help.
        setMessages([
            { sender: 'System', text: `Connected to student waiting room: ${ideaTitle}`, time: 'Now' },
            { sender: 'Student', text: `Hi! I am trying to start my ${ideaTitle} business, but I am stuck on the pricing model. Can you help me?`, time: 'Now' }
        ]);
    } else {
        // SCENARIO B: You are the STUDENT. The Mentor welcomes YOU.
        setMessages([
            { sender: 'System', text: `Secure line established with ${assignedMentor.name}.`, time: 'Now' },
            { sender: assignedMentor.name, text: `Hello! I am ${assignedMentor.name}. I see you're interested in ${ideaTitle}. How can I guide you today?`, time: 'Now' }
        ]);
    }
  }, [id, ideaTitle, assignedMentor.name]);

  // Auto-scroll
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  // --- HANDLE SEND ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageToSend = newMessage;
    setNewMessage('');
    
    // 1. Show YOUR message (You are either Mentor or Student)
    setMessages(prev => [...prev, { sender: 'You', text: messageToSend, time: timestamp }]);
    setIsTyping(true);

    try {
        let promptContext = "";

        // --- DYNAMIC AI PROMPT SWITCHING ---
        if (isMentorMode) {
            // AI Acts as STUDENT
            promptContext = `
                Roleplay: You are a beginner student starting a ${ideaTitle} business.
                I am your Mentor giving you advice.
                My advice to you was: "${messageToSend}".
                Reply to me with a follow-up question or a "Thank you" if the advice was helpful. 
                Keep it short and realistic.
            `;
        } else {
            // AI Acts as MENTOR
            promptContext = `
                Roleplay: You are ${assignedMentor.name}, a ${assignedMentor.role} expert in ${ideaTitle}.
                I am a student asking: "${messageToSend}".
                Give me specific, professional advice. Keep it encouraging.
            `;
        }

        // --- UPDATE: Use Render URL instead of Localhost ---
        const { data } = await axios.post('https://entreskill-hub.onrender.com/api/chat', { 
            message: promptContext 
        });

        // 2. Show AI Reply (The "Opponent")
        const opponentName = isMentorMode ? "Student" : assignedMentor.name;
        
        setMessages(prev => [...prev, { 
            sender: opponentName, 
            text: data.reply, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);

    } catch (error) {
        setMessages(prev => [...prev, { sender: 'System', text: "Connection error. Please try again.", time: timestamp }]);
    } finally {
        setIsTyping(false);
    }
  };

  // --- NEW: RESOLVE SESSION HANDLER ---
  const handleResolveSession = () => {
    if (isMentorMode) {
        // 1. Get current list from local storage
        const storedReqs = JSON.parse(localStorage.getItem('mentorRequests') || "[]");
        
        // 2. Mark THIS session as resolved
        const updatedReqs = storedReqs.map(req => 
            req.id === id ? { ...req, status: 'Resolved' } : req
        );

        // 3. Save back to storage
        localStorage.setItem('mentorRequests', JSON.stringify(updatedReqs));
        
        // 4. Go back to console
        navigate('/mentor-console');
    } else {
        // Normal exit for students
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 flex flex-col items-center relative">
      
      {/* HEADER */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 z-10">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                    {isMentorMode ? "Incoming Request" : "Live Support"}
                </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white">
                {isMentorMode 
                    ? <span>Student: <span className="text-blue-400">Rahul (Aspiring Founder)</span></span>
                    : <span>Session with: <span className="text-blue-400">{assignedMentor.name}</span></span>
                }
            </h2>
            <p className="text-slate-500 text-xs">Topic: {ideaTitle}</p>
        </div>

        <button 
            onClick={() => setShowExitModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:border-red-500/50 hover:text-red-400"
        >
            {isMentorMode ? "Close Ticket" : "End Session"}
        </button>
      </div>

      {/* CHAT CONTAINER */}
      <div className="w-full max-w-4xl flex-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl mb-8 relative z-0">
        
        {/* Messages Area */}
        <div className="flex-1 p-8 overflow-y-auto space-y-6">
            {messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                        msg.sender === 'You' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10' 
                        : msg.sender === 'System' 
                            ? 'bg-transparent text-slate-500 text-center text-xs w-full italic pb-2'
                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                    }`}>
                        {msg.text}
                    </div>
                    {msg.sender !== 'System' && (
                        <span className="text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-wider">{msg.sender} • {msg.time}</span>
                    )}
                </div>
            ))}
            
            {/* TYPING INDICATOR */}
            {isTyping && (
                <div className="flex flex-col items-start animate-pulse">
                     <div className="bg-slate-800/50 text-slate-400 px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-white/5">
                        <span className="font-bold text-blue-400">
                            {isMentorMode ? "Student" : assignedMentor.name}
                        </span> is writing...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <form 
            onSubmit={handleSend} 
            className="p-4 bg-slate-900 border-t border-white/5 flex gap-4 relative z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]"
        >
            <input 
                autoFocus
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={isMentorMode ? "Type your expert advice..." : `Ask ${assignedMentor.name} a question...`} 
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-6 h-14 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 relative z-50"
            />
            <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-500 text-white h-14 w-14 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/20 active:scale-95 relative z-50"
            >
                ➤
            </button>
        </form>
      </div>

      {/* EXIT MODAL */}
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
                onClick={() => setShowExitModal(false)}
            ></div>
            <div className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold text-white text-center mb-2">
                    {isMentorMode ? "Close Ticket?" : "End Session?"}
                </h3>
                <p className="text-slate-400 text-center text-sm mb-8">
                    {isMentorMode 
                        ? "This will mark the student's doubt as resolved."
                        : "Your chat history will be cleared."}
                </p>
                <div className="flex gap-4">
                    <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-300 hover:bg-white/5">Cancel</button>
                    {/* UPDATED BUTTON ONCLICK HANDLER */}
                    <button onClick={handleResolveSession} className="flex-1 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white">
                        {isMentorMode ? "Mark Resolved" : "End Session"}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default SessionRoom;