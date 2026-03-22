import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    id: "intelligence",
    eyebrow: "ER Labs",
    title: "Industrial Intelligence",
    description:
      "ER Labs turns live production data into operational visibility. We structure plant signals, production KPIs, and decision layers so engineering teams can see problems early and run tighter operations.",
    items: [
      "Real-time line dashboards and management views",
      "Mini-MES logic for traceability and production oversight",
      "Anomaly detection and escalation pathways",
      "KPI architecture for throughput, scrap, energy, and downtime",
    ],
    outcome: "Visibility, earlier intervention, and stronger production decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "extrusion",
    eyebrow: "Extrusion Engineering",
    title: "Extrusion & Compounding",
    description:
      "We design and optimize twin-screw compounding environments around material behavior, equipment constraints, and production targets. The focus is stable output, measurable throughput, and disciplined process windows.",
    items: [
      "Twin-screw line configuration and process architecture",
      "Feed strategy, barrel profile, venting, and pellet quality",
      "Throughput, torque, residence time, and SEC optimization",
      "Commissioning support for repeatable, scalable operation",
    ],
    outcome: "Higher throughput, tighter process control, and more reliable product quality.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22731c8a8d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "factory",
    eyebrow: "Factory Building",
    title: "Factory & Process Engineering",
    description:
      "Greenfield and brownfield factory planning should serve production, not just architecture. We shape layouts, utility logic, circulation, and line adjacencies around the actual operating rhythm of the plant.",
    items: [
      "Layout development for extrusion and compounding facilities",
      "Material flow, operator movement, and platform planning",
      "Infrastructure zoning for utilities, storage, and service access",
      "Production architecture that supports expansion and maintainability",
    ],
    outcome: "Factories with better flow, cleaner execution, and infrastructure that supports scale.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "automation",
    eyebrow: "Automation & Control",
    title: "Automation & Control Systems",
    description:
      "Control systems are the operational backbone of the plant. We define the PLC, HMI, integration, and logic structure needed to keep production behavior stable, traceable, and ready for continuous improvement.",
    items: [
      "PLC architecture and modular process logic",
      "HMI structure for operators, alarms, and diagnostics",
      "Machine integration across feeders, extrusion, and downstream equipment",
      "Signal strategy that enables smarter analytics and future AI layers",
    ],
    outcome: "Stable machine behavior, clearer operator control, and better system integration.",
    image: "https://images.unsplash.com/photo-1563770660941-10a6360761a1?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function ExpandableSections() {
  return (
    <section id="capabilities" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">Detailed Capabilities</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.8rem]">
            Engineering depth across the full production environment.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Each discipline below is designed to connect strategy, equipment, and plant execution into one coherent industrial system.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,22,35,0.96),rgba(8,14,24,0.92))] shadow-[0_28px_60px_rgba(0,0,0,0.22)] lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="order-2 flex flex-col justify-between p-8 sm:p-10 lg:order-none lg:p-12">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-industrial-accent">{section.eyebrow}</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-[2.3rem]">
                    {section.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    {section.description}
                  </p>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <ul className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm leading-6 text-slate-200 sm:text-base">
                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-industrial-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-[1.4rem] border border-industrial-accent/20 bg-[#0b1521] p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-industrial-accent">Operational Outcome</p>
                    <p className="mt-4 text-base leading-7 text-white/90">{section.outcome}</p>
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:text-industrial-accent"
                    >
                      Discuss application
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[18rem] lg:min-h-full">
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,19,0.15),rgba(6,11,19,0.48)_52%,rgba(6,11,19,0.64)_100%)] lg:bg-[linear-gradient(90deg,rgba(6,11,19,0.08),rgba(6,11,19,0.22)_28%,rgba(6,11,19,0.58)_100%)]" />
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
}
