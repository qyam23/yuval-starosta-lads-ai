import { motion } from "motion/react";

export default function FinalCTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-accent/5 z-0" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Let’s build your next <br />
            <span className="text-industrial-accent">intelligent factory</span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            One partner. Multiple capabilities. Real results. <br />
            Join the leaders in advanced manufacturing.
          </p>
          <button className="px-12 py-5 bg-industrial-accent text-industrial-dark font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(0,229,255,0.3)]">
            Discuss Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
