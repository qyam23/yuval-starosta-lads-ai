import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import ExtrusionCompoundingVisual from "./ExtrusionCompoundingVisual";
import automationControlExact from "../assets/automation-control-exact.png";
import factoryProcessVisual from "../assets/factory-process-visual.png";
import industrialIntelligenceProcessVisual from "../assets/industrial-intelligence-process-visual.png";

function FactoryDevelopmentVisual({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="factory-development-visual relative h-full max-h-[34rem] w-full max-w-[42rem] overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#08111d]">
      <div className="factory-development-visual__draft-stage" aria-hidden="true">
        <svg viewBox="0 0 640 560" className="factory-development-cad h-full w-full" preserveAspectRatio="xMidYMid meet">
          <rect x="88" y="88" width="392" height="250" rx="2" className="factory-development-cad__outline" />
          <path d="M88 88 L42 170 L42 486 L178 486 L178 452 L223 452 L223 486 L480 486" className="factory-development-cad__site" />
          <path d="M480 88 L524 88 L524 498" className="factory-development-cad__road" />
          <path d="M480 338 L480 486 L280 486" className="factory-development-cad__outline" />
          <path d="M88 122 H480" className="factory-development-cad__gridline factory-development-cad__gridline--a" />
          <path d="M88 206 H480" className="factory-development-cad__gridline factory-development-cad__gridline--b" />
          <path d="M88 286 H480" className="factory-development-cad__gridline factory-development-cad__gridline--c" />
          <path d="M128 88 V338" className="factory-development-cad__gridline factory-development-cad__gridline--d" />
          <path d="M232 88 V338" className="factory-development-cad__gridline factory-development-cad__gridline--e" />
          <path d="M372 88 V338" className="factory-development-cad__gridline factory-development-cad__gridline--f" />
          <rect x="136" y="164" width="118" height="100" className="factory-development-cad__zone" />
          <rect x="382" y="168" width="74" height="86" className="factory-development-cad__zone" />
          <rect x="152" y="320" width="180" height="48" className="factory-development-cad__zone factory-development-cad__zone--accent" />
          <rect x="392" y="312" width="64" height="64" className="factory-development-cad__zone" />
          <path d="M282 338 V418" className="factory-development-cad__service" />
          <path d="M304 338 V424" className="factory-development-cad__service" />
          <path d="M326 338 V430" className="factory-development-cad__service" />
          <circle cx="228" cy="278" r="9" className="factory-development-cad__marker" />
          <circle cx="330" cy="198" r="8" className="factory-development-cad__marker" />
          <circle cx="368" cy="198" r="8" className="factory-development-cad__marker" />
        </svg>
      </div>

      <div className="factory-development-visual__frame-stage" aria-hidden="true">
        <svg viewBox="0 0 640 560" className="factory-development-frame h-full w-full" preserveAspectRatio="xMidYMid meet">
          <path d="M112 116 H474 V328 H112 Z" className="factory-development-frame__beam" />
          <path d="M144 328 H472 L430 374 H182 Z" className="factory-development-frame__beam factory-development-frame__beam--floor" />
          <path d="M144 168 V328" className="factory-development-frame__column factory-development-frame__column--1" />
          <path d="M240 132 V328" className="factory-development-frame__column factory-development-frame__column--2" />
          <path d="M360 132 V328" className="factory-development-frame__column factory-development-frame__column--3" />
          <path d="M438 132 V328" className="factory-development-frame__column factory-development-frame__column--4" />
          <path d="M188 184 H302" className="factory-development-frame__brace factory-development-frame__brace--1" />
          <path d="M188 228 H302" className="factory-development-frame__brace factory-development-frame__brace--2" />
          <path d="M396 188 H454" className="factory-development-frame__brace factory-development-frame__brace--3" />
          <path d="M396 226 H454" className="factory-development-frame__brace factory-development-frame__brace--4" />
          <path d="M146 328 L98 370" className="factory-development-frame__trace factory-development-frame__trace--1" />
          <path d="M454 328 L482 348" className="factory-development-frame__trace factory-development-frame__trace--2" />
          <circle cx="144" cy="328" r="5" className="factory-development-frame__node factory-development-frame__node--1" />
          <circle cx="240" cy="328" r="5" className="factory-development-frame__node factory-development-frame__node--2" />
          <circle cx="360" cy="328" r="5" className="factory-development-frame__node factory-development-frame__node--3" />
          <circle cx="438" cy="328" r="5" className="factory-development-frame__node factory-development-frame__node--4" />
        </svg>
      </div>

      <div className="factory-development-visual__final-stage">
        <img
          src={image}
          alt={alt}
          className="factory-development-visual__image h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="factory-development-visual__final-sheen" aria-hidden="true" />
      </div>
    </div>
  );
}

const sections = [
  {
    id: "intelligence",
    eyebrow: "ER Labs",
    title: "Industrial Intelligence",
    description:
      "ER Labs is a lightweight industrial intelligence layer that turns raw production signals into structured operational visibility, anomaly detection, and decision support directly on the factory floor.",
    items: [
      "Data Acquisition: PLCs, CSV logs, historians, and legacy production sources without heavy infrastructure changes",
      "Signal Conditioning: temperature, pressure, load, rate, and throughput cleaned and aligned into usable operational data",
      "Real-Time Visibility: live dashboards for machine states, feeder behavior, process flow, and line stability",
      "KPI Logic: utilization, efficiency, stability, imbalance, and downtime patterns derived from raw production data",
      "Anomaly Detection: abnormal behavior identified through process baselines, machine patterns, and operating deviations",
      "Root Cause Signal Analysis: variables influencing abnormal behavior or process drift highlighted for engineering review",
      "Decision Support: operational patterns and deviations translated into practical guidance for production teams",
    ],
    outcome: "Structured plant visibility, faster anomaly recognition, and stronger operational decisions directly on the line.",
    image: industrialIntelligenceProcessVisual,
  },
  {
    id: "extrusion",
    eyebrow: "Extrusion Engineering",
    title: "Extrusion & Compounding Systems",
    description:
      "Engineering of complete twin-screw extrusion and compounding processes, from material behavior and screw configuration strategy to line stability, troubleshooting, scale-up, and full plant integration.",
    items: [
      "Process Design: raw feeding to stable pellet production, with thermal profile, residence time, throughput, and repeatability controlled",
      "Material Behavior: fillers, pigments, additives, recycled polymers, dispersion limits, viscosity behavior, and formulation constraints",
      "Twin-Screw Screw Configuration Design: co-rotating layouts for conveying, melting, mixing, devolatilization, pressure build-up, and die stability",
      "Line & Peripheral Equipment Engineering: feeders, dosing, vacuum, cooling, pelletizing, conveying, dryers, and downstream integration",
      "Optimization & Troubleshooting: instability, poor dispersion, overheating, venting issues, pressure fluctuation, output loss, and stabilization",
      "Factory Integration: layout, utilities, equipment interfaces, workflow, and implementation logic within the full plant environment",
      "Typical Projects: new line concepts, optimization, material transition support, troubleshooting, equipment specification, and pre-investment review",
    ],
    outcome: "Technically grounded extrusion delivery, from concept design and process definition to stable operation, troubleshooting, and plant-level implementation.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22731c8a8d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "factory",
    eyebrow: "Factory Building",
    title: "Factory & Process Engineering",
    description:
      "Factory planning is not an architectural exercise. It is the physical translation of process logic into space, flow, and control.",
    descriptionSecondary:
      "We design factories from the inside out, starting from material behavior, operator actions, and machine interaction, and only then shaping the structure around it.",
    items: [
      "Process-Driven Layout Design: layouts built from actual feeding, processing, handling, and packaging sequences",
      "Material Flow Engineering: raw intake, internal transfer, buffering, gravity paths, and finished goods handling logic",
      "Operator Movement & Workstation Logic: reach zones, operator paths, and station task sequences mapped and optimized",
      "Multi-Level Factory Structuring: platforms, mezzanines, and vertical separation between feeding, extrusion, and downstream stages",
      "Utility & Infrastructure Zoning: power, compressed air, cooling, dust collection, vacuum, and service access organized by plant logic",
      "Digital Factory Modeling & Simulation: 3D layout, machine placement, and flow validation before execution",
      "Scalability & Future Expansion Planning: expansion logic prepared for added lines, utility growth, and future capacity",
    ],
    outcome: "Process-led factory planning with stronger flow, clearer operator logic, coordinated utilities, and expansion-ready execution.",
    image: factoryProcessVisual,
  },
  {
    id: "automation",
    eyebrow: "Automation & Control",
    title: "Automation & Control Systems",
    description:
      "Control systems are the operational backbone of the plant. We define the PLC, HMI, integration, and logic structure needed to keep production behavior stable, traceable, and ready for continuous improvement.",
    items: [
      "PLC Architecture & Process Structuring: Modular PLC logic aligned with real process stages for clear structure and maintainability.",
      "Deterministic Control & Stability Engineering: Control loops, interlocks, and sequencing designed for stable and predictable process behavior.",
      "HMI as an Operational Interface: Operator-focused HMI structure built around states, alarms, trends, and diagnostics.",
      "Multi-Machine Integration & Line Synchronization: Coordinated control across feeders, extrusion, and downstream equipment as one system.",
      "Signal Strategy & Data Integrity: Structured signal definition ensuring reliable data for monitoring, KPIs, and future analytics.",
      "Fault Logic, Alarms & Root Cause Visibility: Alarm and fault logic built to reflect real process failures and enable fast diagnosis.",
      "Control-Ready Infrastructure for Future Intelligence: Systems prepared for seamless integration with analytics and industrial intelligence layers.",
    ],
    outcome: "Stable machine behavior, clearer operator control, and better system integration.",
    image: automationControlExact,
  },
];

export default function ExpandableSections() {
  return (
    <section id="capabilities" className="px-4 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">What We Do</p>
          <h2 className="mt-4 text-[2.1rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.8rem]">
            Engineering depth across the full production environment.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
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
                  {"descriptionSecondary" in section && section.descriptionSecondary ? (
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                      {section.descriptionSecondary}
                    </p>
                  ) : null}
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
                      Explore This Application
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[18rem] lg:min-h-full">
                {section.id === "extrusion" ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 lg:p-8">
                    <div
                      className="relative w-full max-w-[44rem] overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#08111d]"
                      style={{ aspectRatio: "1.18 / 1", maxHeight: "min(42rem, calc(100% - 1rem))" }}
                    >
                      <ExtrusionCompoundingVisual />
                    </div>
                  </div>
                ) : section.id === "intelligence" ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 lg:p-8">
                    <div
                      className="relative flex h-full max-h-[32rem] w-full max-w-[40rem] items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#08111d]"
                      style={{ aspectRatio: "1.08 / 1" }}
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="industrial-intelligence-visual h-full w-full object-contain object-center p-3 sm:p-4"
                        referrerPolicy="no-referrer"
                      />
                      <div className="industrial-intelligence-overlay" aria-hidden="true">
                        <div className="industrial-intelligence-overlay__metrics">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="industrial-intelligence-overlay__chart">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="industrial-intelligence-overlay__bars">
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="industrial-intelligence-overlay__scan" />
                        <div className="industrial-intelligence-overlay__pulse" />
                      </div>
                    </div>
                  </div>
                ) : section.id === "factory" ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 lg:p-8">
                    <FactoryDevelopmentVisual image={section.image} alt={section.title} />
                  </div>
                ) : section.id === "automation" ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 lg:p-8">
                    <div
                      className="automation-system-visual relative h-full max-h-[34rem] w-full max-w-[42rem] overflow-hidden rounded-[1.4rem] border border-white/8 bg-[#08111d]"
                      style={{ aspectRatio: "1.14 / 1" }}
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="automation-system-visual__image h-full w-full object-contain object-center p-2 sm:p-3"
                        referrerPolicy="no-referrer"
                      />
                      <div className="automation-system-overlay" aria-hidden="true">
                        <svg viewBox="0 0 100 100" className="automation-system-overlay__svg" preserveAspectRatio="none">
                          <path d="M10 58 C14 58, 16 60, 20 60 L38 60 C42 60, 44 62, 44 66 L44 76 C44 80, 46 82, 50 82 L84 82" className="automation-system-overlay__flow automation-system-overlay__flow--a" pathLength="100" />
                          <path d="M14 42 C19 42, 22 42, 24 42 L24 25 C24 21, 26 19, 30 19 L78 19 C84 19, 88 22, 88 28 L88 44" className="automation-system-overlay__flow automation-system-overlay__flow--b" pathLength="100" />
                          <path d="M48 56 C53 56, 57 55, 61 55 L65 55 C69 55, 71 53, 71 49 L71 44 C71 40, 73 38, 77 38 L84 38" className="automation-system-overlay__flow automation-system-overlay__flow--c" pathLength="100" />
                          <path d="M50 57 C54 57, 57 57, 61 57" className="automation-system-overlay__flow automation-system-overlay__flow--d" pathLength="100" />
                        </svg>
                        <span className="automation-system-overlay__particle automation-system-overlay__particle--1" />
                        <span className="automation-system-overlay__particle automation-system-overlay__particle--2" />
                        <span className="automation-system-overlay__particle automation-system-overlay__particle--3" />
                        <span className="automation-system-overlay__particle automation-system-overlay__particle--4" />
                        <span className="automation-system-overlay__particle automation-system-overlay__particle--5" />
                        <span className="automation-system-overlay__particle automation-system-overlay__particle--6" />
                        <span className="automation-system-overlay__pulse automation-system-overlay__pulse--a" />
                        <span className="automation-system-overlay__pulse automation-system-overlay__pulse--b" />
                        <div className="automation-system-overlay__screen">
                          <span className="automation-system-overlay__screen-indicator automation-system-overlay__screen-indicator--1" />
                          <span className="automation-system-overlay__screen-indicator automation-system-overlay__screen-indicator--2" />
                          <span className="automation-system-overlay__screen-indicator automation-system-overlay__screen-indicator--3" />
                          <span className="automation-system-overlay__screen-indicator automation-system-overlay__screen-indicator--4" />
                          <i className="automation-system-overlay__screen-wave automation-system-overlay__screen-wave--1" />
                          <i className="automation-system-overlay__screen-wave automation-system-overlay__screen-wave--2" />
                        </div>
                        <div className="automation-system-overlay__plc">
                          <span className="automation-system-overlay__plc-light automation-system-overlay__plc-light--1" />
                          <span className="automation-system-overlay__plc-light automation-system-overlay__plc-light--2" />
                          <span className="automation-system-overlay__plc-light automation-system-overlay__plc-light--3" />
                          <span className="automation-system-overlay__plc-light automation-system-overlay__plc-light--4" />
                        </div>
                        <span className="automation-system-overlay__ambient automation-system-overlay__ambient--1" />
                        <span className="automation-system-overlay__ambient automation-system-overlay__ambient--2" />
                        <span className="automation-system-overlay__ambient automation-system-overlay__ambient--3" />
                        <div className="automation-system-overlay__sheen" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
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
