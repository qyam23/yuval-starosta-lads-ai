import { motion } from "motion/react";

const items = [
  "Industrial Engineering Expertise",
  "Extrusion & Compounding Specialists",
  "AI + Control Integration",
  "End-to-End Factory Systems"
];

export default function ValueStrip() {
  return (
    <section className="border-y border-industrial-border py-12 bg-industrial-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-1 h-8 bg-industrial-accent/30 group-hover:bg-industrial-accent transition-all duration-300" />
              <span className="text-sm font-medium uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
