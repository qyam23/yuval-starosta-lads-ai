import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Built on real factory experience",
  "Engineering + AI combined",
  "Not generic consulting",
  "Focused on measurable results"
];

export default function Differentiation() {
  return (
    <section id="expertise" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight tracking-tighter">
              Why Partner with <br />
              <span className="text-industrial-accent">Yuval Starosta Labs?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              We bridge the gap between traditional industrial engineering and modern intelligence. Our approach is rooted in physics, validated by data, and driven by results.
            </p>
            
            <div className="space-y-6">
              {points.map((point, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="text-industrial-accent" size={24} />
                  <span className="text-lg font-medium tracking-tight">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square glass-card overflow-hidden p-4">
              <img 
                src="https://picsum.photos/seed/engineering-lab/1000/1000" 
                alt="Engineering Lab"
                className="w-full h-full object-cover grayscale opacity-50"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-industrial-accent/20 z-[-1]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-industrial-accent/20 z-[-1]" />
          </div>
        </div>
      </div>
    </section>
  );
}
