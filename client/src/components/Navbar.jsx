import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-white/5 px-8 py-4 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            🚀
          </div>
          <span className="text-xl font-black text-white tracking-tighter">
            EntreSkill <span className="text-blue-500">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {userInfo ? (
            <>
              {/* --- NEW: Mentor Console Button (Only for Experts) --- */}
              {userInfo.title === 'Expert Mentor' && (
                <Link 
                  to="/mentor-console" 
                  className="flex items-center gap-2 text-[10px] font-black text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-full hover:bg-emerald-500 hover:text-white transition-all tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <span>🛡️</span> Mentor Console
                </Link>
              )}

              {/* Conditional Admin Link */}
              {userInfo.role === 'Admin' && (
                <Link 
                  to="/admin" 
                  className="text-[10px] font-black text-purple-400 border border-purple-500/20 bg-purple-500/5 px-4 py-2 rounded-full hover:bg-purple-500 hover:text-white transition-all tracking-[0.2em] uppercase"
                >
                  System Control
                </Link>
              )}

              <Link to="/resources" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                Resources
              </Link>
              
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black text-white transition-colors ${
                    userInfo.title === 'Expert Mentor' ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}>
                    {userInfo.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    {userInfo.name}
                  </span>
                </Link>
                <button 
                  onClick={logoutHandler}
                  className="text-[10px] font-black text-slate-500 hover:text-red-400 uppercase tracking-widest transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-blue-500 transition-all">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;