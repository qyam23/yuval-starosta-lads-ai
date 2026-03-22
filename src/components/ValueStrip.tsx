import { motion } from "motion/react";

const items = [
  "Industrial Engineering Expertise",
  "Extrusion & Compounding Specialists",
  "AI + Control Integration",
  "End-to-End Factory Systems"
];

export default function ValueStrip() {
  return (
    <section className="border-y border-white/8 bg-[#07101b]/92 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex items-center gap-4"
            >
              <div className="h-8 w-1 bg-industrial-accent/30 transition-all duration-300 group-hover:bg-industrial-accent" />
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300 transition-colors group-hover:text-white">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
