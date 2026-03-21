import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: `linear-gradient(var(--color-industrial-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-industrial-border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-industrial-accent/5 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-industrial-accent uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
            Precision Engineering Lab
          </span>
          
          <h1 className="text-7xl md:text-9xl font-bold leading-[0.85] mb-10 tracking-tighter text-white">
            Engineering <br />
            <span className="text-industrial-accent italic">the Continuous</span> <br />
            Process.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-light">
            Advanced polymer compounding, twin-screw extrusion, and greenfield manufacturing infrastructure. Bridging material science with industrial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="group relative px-10 py-5 bg-industrial-accent text-industrial-dark font-bold uppercase tracking-widest overflow-hidden transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Initiate Technical Discussion <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-10 py-5 border border-white/20 hover:border-industrial-accent text-white font-bold uppercase tracking-widest transition-all duration-300">
              View Impact Studies
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
