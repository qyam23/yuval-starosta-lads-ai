import { motion } from "motion/react";
import { Menu, X, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/FirebaseContext";
import LogoMark from "./LogoMark";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signIn, logout, loading } = useAuth();

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-[#07101b]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.02]">
            <LogoMark className="h-14 w-14" />
          </div>
          <div className="flex min-w-0 items-center">
            <span className="truncate text-[0.95rem] font-semibold leading-none tracking-[0.14em] text-white sm:text-base">
              YUVAL STAROSTA ENGINEERING
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-7 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-300 md:flex">
          <a href="#domains" className="transition-colors hover:text-industrial-accent">What We Do</a>
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
              Start a Project
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
            <a href="#domains" onClick={() => setIsOpen(false)}>What We Do</a>
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
              Start a Project
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
