import { motion } from "motion/react";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 sm:px-8 sm:py-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_36%),linear-gradient(180deg,rgba(10,17,29,0.85),rgba(5,9,16,1))]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-industrial-accent">Get in Touch</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            Build the next production system with engineering that is designed to perform.
          </h2>
          <p className="mx-auto mb-12 mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            From extrusion lines to factory infrastructure, automation architecture, and industrial intelligence, the work stays grounded in real manufacturing constraints.
          </p>
          <a
            href="mailto:info@starosta-labs.com"
            className="inline-flex rounded-sm bg-industrial-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-industrial-dark transition-all duration-300 hover:bg-white"
          >
            Talk Through Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
