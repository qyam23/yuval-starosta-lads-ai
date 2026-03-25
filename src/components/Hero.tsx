import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-[4.5rem] pt-28 sm:px-6 sm:pb-[5.5rem] sm:pt-36 lg:min-h-[100svh] lg:px-8 lg:pt-28">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.35))",
        }}
      />
      <div className="absolute inset-y-0 right-0 z-0 hidden w-[52%] lg:block">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,19,1)_0%,rgba(6,11,19,0.4)_20%,rgba(6,11,19,0.1)_40%,rgba(6,11,19,0.85)_100%)]" />
        <img
          src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1400&q=80"
          alt="Advanced industrial production environment"
          className="h-full w-full object-cover object-center opacity-75"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute left-1/2 top-[16%] z-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),rgba(7,16,27,0)_68%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid items-end gap-14 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-10"
        >
          <div className="max-w-3xl py-8 lg:py-[4.5rem]">
            <span className="mb-6 block text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-industrial-accent sm:text-xs">
              Precision Engineering for Advanced Manufacturing
            </span>

            <h1 className="max-w-4xl text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Engineering Industrial Systems That Perform
            </h1>

            <p className="mt-6 max-w-[34rem] text-[0.98rem] leading-7 text-slate-300 sm:mt-7 sm:max-w-[32rem] sm:text-lg sm:leading-8 lg:max-w-[30rem]">
              Extrusion engineering, factory systems, automation, and industrial intelligence built around real production environments.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#domains"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-industrial-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-industrial-dark transition-all duration-300 hover:bg-[#ebc96a]"
              >
                Explore What We Do
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-sm border border-white/15 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-industrial-accent/70 hover:text-industrial-accent"
              >
                Talk Through Your Project
              </a>
            </div>
          </div>

          <div className="relative lg:self-center">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.38)] backdrop-blur-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-industrial-accent/60 to-transparent" />
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[1.2rem] border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80"
                    alt="Industrial engineering control and plant environment"
                    className="h-[17rem] w-full object-cover object-center sm:h-[21rem]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {[
                    ["ER Labs", "Industrial intelligence and live production visibility"],
                    ["Extrusion", "Twin-screw compounding and process discipline"],
                    ["Factory", "Layout, infrastructure, and line architecture"],
                    ["Automation", "PLC, HMI, and integrated control logic"],
                  ].map(([label, text]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-[#0d1725]/88 p-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-industrial-accent">{label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
