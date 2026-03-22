import { motion } from "motion/react";
import { Menu, X, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/FirebaseContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signIn, logout, loading } = useAuth();

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-[#07101b]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-industrial-accent/30 bg-white/[0.03]">
            <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-industrial-accent">
              <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M35 35 H65 V45 H45 V55 H65 V65 H35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[0.95rem] font-semibold leading-none tracking-[0.14em] text-white sm:text-base">
              YUVAL STAROSTA ENGINEERING
            </span>
            <span className="mt-1 truncate text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-[0.62rem]">
              A Division of Yuval Starosta Labs
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-7 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-300 md:flex">
          <a href="#domains" className="transition-colors hover:text-industrial-accent">Domains</a>
          <a href="#intelligence" className="transition-colors hover:text-industrial-accent">ER Labs</a>
          <a href="#expertise" className="transition-colors hover:text-industrial-accent">Expertise</a>

          <div className="ml-2 flex items-center gap-4 border-l border-white/10 pl-5">
            {!loading && (
              user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="h-6 w-6 rounded-full border border-industrial-accent/50" />
                    ) : (
                      <UserIcon size={16} className="text-industrial-accent" />
                    )}
                    <span className="max-w-[80px] truncate text-[10px] text-slate-400">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-white/60 transition-colors hover:text-industrial-accent"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="flex items-center gap-2 text-white/70 transition-colors hover:text-industrial-accent"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
              )
            )}
            <a
              href="#contact"
              className="rounded-sm border border-industrial-accent/70 px-5 py-2 text-industrial-accent transition-all duration-300 hover:bg-industrial-accent hover:text-industrial-dark"
            >
              Discuss Project
            </a>
          </div>
        </div>

        <button
          className="rounded-sm border border-white/10 bg-white/[0.03] p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/8 bg-[#07101b]/98 px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            <a href="#domains" onClick={() => setIsOpen(false)}>Domains</a>
            <a href="#intelligence" onClick={() => setIsOpen(false)}>ER Labs</a>
            <a href="#expertise" onClick={() => setIsOpen(false)}>Expertise</a>
          </div>

          <div className="mt-6 flex flex-col gap-6 border-t border-white/10 pt-6">
            {!loading && (
              user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL && <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full" />}
                    <span className="text-slate-400">{user.displayName || user.email}</span>
                  </div>
                  <button onClick={logout} className="flex items-center gap-2 text-industrial-accent">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={signIn} className="flex items-center gap-2 text-industrial-accent">
                  <LogIn size={18} /> Sign In
                </button>
              )
            )}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full border border-industrial-accent/70 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-industrial-accent"
            >
              Discuss Project
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
