import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  {
    id: "extrusion",
    title: "Extrusion & Compounding Systems",
    items: [
      "Twin-screw design",
      "Screw configuration",
      "Optimization",
      "Throughput & torque",
      "SEC optimization"
    ],
    outcome: "Higher throughput · Stable production · Lower energy"
  },
  {
    id: "factory",
    title: "Factory & Process Engineering",
    items: [
      "Layout design",
      "Workstations",
      "Flow optimization",
      "Line balancing"
    ],
    outcome: "Clarity · Control · Throughput"
  },
  {
    id: "automation",
    title: "Automation & Control Systems",
    items: [
      "PLC programming",
      "Architecture",
      "Integration"
    ],
    outcome: "Stable behavior · Full control"
  },
  {
    id: "intelligence",
    title: "Industrial Intelligence (ER Labs)",
    items: [
      "Real-time data",
      "Dashboards",
      "Anomaly detection",
      "Decision systems",
      "Mini-MES"
    ],
    outcome: "Visibility · Early detection · Better decisions"
  }
];

export default function ExpandableSections() {
  const [activeId, setActiveId] = useState<string | null>("extrusion");

  return (
    <section id="capabilities" className="py-32 px-6 bg-industrial-dark/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Core Capabilities</h2>
          <p className="text-slate-400 uppercase tracking-widest text-sm">Engineering Excellence</p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-industrial-border">
              <button
                onClick={() => setActiveId(activeId === section.id ? null : section.id)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <h3 className={`text-2xl font-bold transition-all duration-300 ${activeId === section.id ? 'text-industrial-accent' : 'text-white/80 group-hover:text-white'}`}>
                  {section.title}
                </h3>
                {activeId === section.id ? <ChevronUp className="text-industrial-accent" /> : <ChevronDown className="text-white/40" />}
              </button>
              
              <AnimatePresence>
                {activeId === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ul className="space-y-3">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-slate-300">
                            <div className="w-1.5 h-1.5 bg-industrial-accent rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-white/5 p-8 border-l-2 border-industrial-accent">
                        <span className="text-xs uppercase tracking-widest font-bold text-industrial-accent mb-4 block">Outcome</span>
                        <p className="text-xl font-medium leading-relaxed">
                          {section.outcome}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
