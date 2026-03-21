import { motion } from "motion/react";
import { Menu, X, FlaskConical, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/FirebaseContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signIn, logout, loading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-industrial-dark/80 backdrop-blur-md border-b border-industrial-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-industrial-accent fill-current">
              <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M35 35 H65 V45 H45 V55 H65 V65 H35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tighter leading-none">
              YUVAL STAROSTA <span className="text-industrial-accent">LABS</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">Engineering before algorithms</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <a href="#capabilities" className="hover:text-industrial-accent transition-colors">Capabilities</a>
          <a href="#domains" className="hover:text-industrial-accent transition-colors">Domains</a>
          <a href="#expertise" className="hover:text-industrial-accent transition-colors">Expertise</a>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full border border-industrial-accent/50" />
                    ) : (
                      <UserIcon size={16} className="text-industrial-accent" />
                    )}
                    <span className="text-[10px] text-slate-400 max-w-[80px] truncate">{user.displayName || user.email}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="text-white/60 hover:text-industrial-accent transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={signIn}
                  className="flex items-center gap-2 text-white/80 hover:text-industrial-accent transition-colors"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
              )
            )}
            <button className="px-5 py-2 border border-industrial-accent text-industrial-accent hover:bg-industrial-accent hover:text-industrial-dark transition-all duration-300 rounded-sm">
              Discuss Project
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-industrial-dark border-b border-industrial-border px-6 py-8 flex flex-col gap-6 uppercase text-sm tracking-widest"
        >
          <a href="#capabilities" onClick={() => setIsOpen(false)}>Capabilities</a>
          <a href="#domains" onClick={() => setIsOpen(false)}>Domains</a>
          <a href="#expertise" onClick={() => setIsOpen(false)}>Expertise</a>
          
          <div className="pt-6 border-t border-white/10 flex flex-col gap-6">
            {!loading && (
              user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL && <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />}
                    <span className="text-slate-400">{user.displayName || user.email}</span>
                  </div>
                  <button onClick={logout} className="text-industrial-accent flex items-center gap-2">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={signIn} className="text-industrial-accent flex items-center gap-2">
                  <LogIn size={18} /> Sign In
                </button>
              )
            )}
            <button className="w-full py-3 border border-industrial-accent text-industrial-accent">
              Discuss Project
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

