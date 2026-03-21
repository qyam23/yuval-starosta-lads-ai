import { motion } from "motion/react";
import { Factory, Cpu, Settings, Database } from "lucide-react";

const domains = [
  {
    title: "Extrusion & Compounding Systems",
    icon: <Settings className="text-industrial-accent" size={32} />,
    image: "https://picsum.photos/seed/industrial-machinery/800/600"
  },
  {
    title: "Factory & Process Engineering",
    icon: <Factory className="text-industrial-accent" size={32} />,
    image: "https://picsum.photos/seed/modern-architecture/800/600"
  },
  {
    title: "Automation & Control Systems",
    icon: <Cpu className="text-industrial-accent" size={32} />,
    image: "https://picsum.photos/seed/engineering-gear/800/600"
  },
  {
    title: "Industrial Intelligence (ER Labs)",
    icon: <Database className="text-industrial-accent" size={32} />,
    image: "https://picsum.photos/seed/industrial-network/800/600"
  }
];

export default function DomainGrid() {
  return (
    <section id="domains" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Operating Domains</h2>
          <div className="w-20 h-1 bg-industrial-accent" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card group relative overflow-hidden p-8 flex flex-col justify-between h-[400px]"
            >
              <div className="relative z-10">
                <div className="mb-6">{domain.icon}</div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-industrial-accent transition-colors">
                  {domain.title}
                </h3>
              </div>
              
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <img 
                  src={domain.image} 
                  alt={domain.title}
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="relative z-10 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                  Learn More <div className="w-8 h-[1px] bg-industrial-accent" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
