import type { ReactElement } from "react";
import { motion } from "motion/react";
import { Factory, Cpu, Settings, Database, ArrowUpRight } from "lucide-react";
import factoryBuildingMasterplan from "../assets/factory-building-masterplan.png";

type DomainId = "intelligence" | "extrusion" | "factory" | "automation";

const domains: {
  id: DomainId;
  title: string;
  descriptor: string;
  icon: ReactElement;
  image: string;
  alt: string;
  position?: string;
}[] = [
  {
    id: "intelligence",
    title: "ER Labs",
    descriptor: "Real-time industrial intelligence",
    icon: <Database className="text-industrial-accent" size={28} />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    alt: "Operational dashboard and industrial KPI screens",
    position: "center",
  },
  {
    id: "extrusion",
    title: "Extrusion Engineering",
    descriptor: "Twin-screw compounding and process optimization",
    icon: <Settings className="text-industrial-accent" size={28} />,
    image: "https://images.unsplash.com/photo-1581092918484-8313bda71a0a?auto=format&fit=crop&w=1400&q=80",
    alt: "Industrial process equipment and extrusion engineering environment",
    position: "center",
  },
  {
    id: "factory",
    title: "Factory Building",
    descriptor: "Layout, flow, and production infrastructure",
    icon: <Factory className="text-industrial-accent" size={28} />,
    image: factoryBuildingMasterplan,
    alt: "Factory masterplan and plant layout environment",
    position: "center",
  },
  {
    id: "automation",
    title: "Automation & Control",
    descriptor: "PLC, integration, and process logic",
    icon: <Cpu className="text-industrial-accent" size={28} />,
    image: "https://images.unsplash.com/photo-1563770660941-10a6360761a1?auto=format&fit=crop&w=1400&q=80",
    alt: "Industrial control and automation environment with technician",
    position: "center",
  },
];

export default function DomainGrid() {
  return (
    <section id="domains" className="px-6 pb-20 pt-6 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">Core Domains</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.8rem]">
            Four integrated disciplines built for advanced production systems.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Use the homepage like an engineering map. Each domain anchors a detailed section below with the underlying delivery scope.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
          {domains.map((domain, idx) => (
            <motion.a
              key={domain.id}
              href={`#${domain.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative flex aspect-[0.96] min-h-[15.5rem] flex-col justify-end overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0d1725]/70 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.32)] transition-all duration-300 hover:border-industrial-accent/55 hover:shadow-[0_28px_60px_rgba(0,0,0,0.4)] sm:min-h-[17rem] sm:p-5"
            >
              <img
                src={domain.image}
                alt={domain.alt}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ objectPosition: domain.position ?? "center" }}
              />
              <div
                className={`absolute inset-0 ${
                  domain.id === "factory"
                    ? "bg-[radial-gradient(circle_at_76%_18%,rgba(212,175,55,0.18),transparent_22%),radial-gradient(circle_at_18%_24%,rgba(77,138,221,0.14),transparent_28%),linear-gradient(180deg,rgba(6,11,19,0.08)_0%,rgba(6,11,19,0.12)_30%,rgba(6,11,19,0.4)_58%,rgba(6,11,19,0.82)_100%)]"
                    : "bg-[radial-gradient(circle_at_top_left,rgba(72,137,221,0.14),transparent_28%),linear-gradient(180deg,rgba(7,12,20,0.1)_0%,rgba(7,12,20,0.16)_30%,rgba(7,12,20,0.48)_62%,rgba(7,12,20,0.84)_100%)]"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(180deg,rgba(8,12,18,0)_0%,rgba(8,12,18,0.2)_18%,rgba(8,12,18,0.88)_100%)]" />
              <div
                className="absolute inset-0 opacity-16"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex justify-between">
                  <div className="rounded-full border border-white/10 bg-[#09111d]/78 p-2.5 shadow-[0_0_24px_rgba(25,63,104,0.16)]">
                    {domain.icon}
                  </div>
                  <ArrowUpRight size={18} className="text-white/65 transition-colors group-hover:text-industrial-accent" />
                </div>
                <div className="pt-12 text-left">
                  <h3 className="max-w-[12rem] text-lg font-semibold leading-tight text-white sm:text-xl">
                    {domain.title}
                  </h3>
                  <p className="mt-3 max-w-[15rem] text-xs leading-5 text-slate-100 sm:text-sm sm:leading-6">
                    {domain.descriptor}
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-5 bottom-5 h-px bg-gradient-to-r from-industrial-accent/0 via-industrial-accent/70 to-industrial-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
