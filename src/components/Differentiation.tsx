import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Built around real factory execution, not generic advisory slides",
  "Extrusion, automation, and intelligence designed as one operating system",
  "Engineering decisions grounded in measurable production behavior",
  "Structured for advanced manufacturing teams that need credible delivery",
];

export default function Differentiation() {
  return (
    <section id="expertise" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">Why Yuval Starosta Engineering</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Serious engineering capability for production environments that cannot afford vague thinking.
            </h2>
            <p className="mb-12 mt-6 max-w-2xl text-base leading-8 text-slate-400">
              Yuval Starosta Engineering combines industrial design discipline with modern control and intelligence layers, giving manufacturing teams one partner that can think from line mechanics through plant systems and live data.
            </p>

            <div className="space-y-6">
              {points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="mt-1 text-industrial-accent" size={22} />
                  <span className="text-base font-medium leading-7 tracking-tight text-slate-100 sm:text-lg">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[0.92] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a131f] p-4 shadow-[0_28px_60px_rgba(0,0,0,0.22)]">
              <img
                src="https://images.unsplash.com/photo-1581092919535-7146ff1a5903?auto=format&fit=crop&w=1400&q=80"
                alt="Industrial engineering environment"
                className="h-full w-full rounded-[1.5rem] object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -right-6 -top-6 h-32 w-32 border border-industrial-accent/20" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 border border-industrial-accent/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
